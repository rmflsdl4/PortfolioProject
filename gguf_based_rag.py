import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain import hub
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
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
#     template = """You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question in Markdown format. Keep the answer concise, with a maximum of three sentences. If you don't know the answer, just say that you don't know.
# Question: {question} 
# Context: {context} 
# Answer:"""
    template = """너는 광주대학교 학생들을 도와주는 유능한 지능형 AI 조수야. 학생의 질문에 친절하게 답해줘. 
# 답변 규칙:
 1. 모든 답변은 Markdown(마크업 언어)로 간결하게 3문장 이내로 답변해야 한다.
 2. '# Context'에서 질문에 대한 내용이 없을 경우 답할 수 없으므로 '이해하지 못 했어요.'라고 무조건 답변해야 한다.
 3. 답변 시 '안녕하세요. GU봇 입니다.'로 시작해야 한다.


# 질문:
{question} 

# Context:
{context} 

# 답변:
"""
    prompt = ChatPromptTemplate.from_template(template)

    llm = ChatOllama(model="llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M:latest")

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 1})

    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    # 모델 테스트
    query = "ROTC 지원하려면 어떻게 해야 해?"
    response = rag_chain.invoke(query)

    print(response)

if __name__ == "__main__":
    main()
