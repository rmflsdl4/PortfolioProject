import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain import hub
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from langchain.llms import HuggingFacePipeline
from langchain_core.prompts import ChatPromptTemplate

MODEL_PATH = "./finetuned_model"
CACHE_DIR = "./cache_model"

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


# 허깅페이스 파이프라인 생성
def create_huggingface_llm():
    if os.path.exists(CACHE_DIR):  # 이미 캐시된 모델이 있으면 로드
        print("Loading model from cache...")
        model = AutoModelForCausalLM.from_pretrained(CACHE_DIR)
        tokenizer = AutoTokenizer.from_pretrained(CACHE_DIR)
    else:
        print("Loading model from scratch...")
        model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)
        tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
        model.save_pretrained(CACHE_DIR)  # 모델을 캐시 디렉토리에 저장
        tokenizer.save_pretrained(CACHE_DIR)  # 토크나이저를 캐시 디렉토리에 저장

    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        device=0,  # GPU를 사용할 경우 0, CPU는 -1
        stop_sequence=["<|eot_id|>", "<|end_of_text|>"],  # 종료 신호
        max_new_tokens=512,
        do_sample=True,
        temperature=0.7,
        top_p=0.95,
        top_k=40,
        repetition_penalty=1.2
    )
    
    # LangChain LLM으로 래핑
    llm = HuggingFacePipeline(pipeline=pipe)
    return llm

def main():
    if not os.path.exists(VECTOR_STORE_PATH):
        vectorstore = create_vectorstore()
    else:
        vectorstore = FAISS.load_local(
            VECTOR_STORE_PATH, EMBEDDINGS, allow_dangerous_deserialization=True
        )
    # 문서 로드 후 상위 폴더로 이동
    os.chdir("..")

    
    # 프롬프트 로드
    #prompt = hub.pull("rlm/rag-prompt")
    template = """Answer the question based only on the following context:
    {context}
    Question: {question}
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    # Ollama 모델 로드
    #llm = ChatOllama(model="llama3.1:8b")
    llm = create_huggingface_llm()
    
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 1})
    
    # RAG 체인 구성
    rag_chain = (
        #RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    #rag_chain_with_source = RunnableParallel(
    #    {"context": retriever, "question": RunnablePassthrough()}
    #).assign(answer=rag_chain)

    # 모델 테스트
    query = "휴학 신청절차 알려줘"
    response = rag_chain.invoke(query)

    print("----------------Answer----------------\n", response + "\n")
    print("Sources:")
    #sources = [doc.metadata for doc in response["context"]]
    #for source in sources:
     #   print(source)

if __name__ == "__main__":
    main()