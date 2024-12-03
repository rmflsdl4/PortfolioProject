import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain import hub
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from transformers import AutoTokenizer, AutoModelForCausalLM

VECTOR_STORE_PATH = "./vectorstore"
EMBEDDINGS = HuggingFaceEmbeddings(
    model_name="BAAI/bge-m3",
    model_kwargs={"device": "cuda"}, 
    encode_kwargs={"normalize_embeddings": True},
)


def create_vectorstore():
    os.chdir("./gu")  # PDF 파일이 존재하는 폴더 지정

    # PDF 파일 로드
    loader = []
    file_names = [f for f in os.listdir() if f.endswith(".pdf")] 
    idx = 0
    for file_name in file_names:
        try:
            print(f"Loading: {file_name}")
            pdf_loader = PyMuPDFLoader(file_name)
            loader.extend(pdf_loader.load())
            for idx in range(len(loader)):
                loader[idx].page_content = loader[idx].page_content.replace("\\n", "\n")
        except Exception as e:
            print(f"Error loading {file_name}: {e}")

    # 문서를 문장으로 분리
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=50,
    )

    docs = text_splitter.split_documents(loader)

    vectorstore = FAISS.from_documents(docs, EMBEDDINGS)
    vectorstore.save_local(VECTOR_STORE_PATH)
    return vectorstore

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)



def huggingface_llm(input_data):
    model_name = "./finetuned_model"  # Hugging Face에 저장한 모델 경로
    model = AutoModelForCausalLM.from_pretrained(model_name).to("cuda")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    inputs = tokenizer(input_data, return_tensors="pt")
    outputs = model.generate(inputs['input_ids'])
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

def main():
    if not os.path.exists(VECTOR_STORE_PATH):
        vectorstore = create_vectorstore()
    else:
        vectorstore = FAISS.load_local(
            VECTOR_STORE_PATH, EMBEDDINGS, allow_dangerous_deserialization=True
        )

    os.chdir("..")


    
    # 프롬프트 로드
    prompt = hub.pull("rlm/rag-prompt")

    # Ollama 모델 로드
    llm = ChatOllama(model="llama3.1:8b")

    retriever = vectorstore.as_retriever()
    
    # RAG 체인 구성
    rag_chain = (
        RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
        | prompt
        | llm
        | StrOutputParser()
    )
    rag_chain_with_source = RunnableParallel(
        {"context": retriever, "question": RunnablePassthrough()}
    ).assign(answer=rag_chain)

    # 모델 테스트
    query = "휴학은 어떻게 해?"
    response = rag_chain_with_source.invoke(query)

    print("Answer:\n", response["answer"] + "\n")
    print("Sources:")
    sources = [doc.metadata for doc in response["context"]]
    for source in sources:
        print(source)

if __name__ == "__main__":
    main()