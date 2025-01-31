import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain import hub
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM, TextStreamer
from langchain.llms import HuggingFacePipeline
from langchain_core.prompts import ChatPromptTemplate
import torch
import sys
import io
from langchain_upstage import UpstageEmbeddings

MODEL_PATH = "./llama3-8b-bllossom-gu-bot"
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
        temperature=0.1,
        top_p=0.95,
        top_k=10,
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

    ### 프롬프트 버전 1 - 링크나 전화번호 같은 정보는 잘 가져오지 못하며 모르는 정보에 대해 할루시네이션 발생
    
#     template = """너는 광주대학교 학생들을 도와주는 유능한 지능형 AI 조수야. 학생의 질문에 친절하게 답해줘. 
# # 답변 규칙:
#  1. 모든 답변은 Markdown(마크업 언어)로 간결하게 3문장 이내로 답변해야 한다.
#  2. '# Context'에 내용이 있어도 질문에 대한 내용이 없을 경우 답할 수 없으므로 '이해하지 못 했어요.'라고 무조건 답변해야 한다.
#  3. 답변 시 '안녕하세요. GU봇 입니다.'로 시작해야 한다.
#  4. 질문을 추가적으로 생성하지 않는다.


# # 질문:
# {question} 

# # Context:
# {context}

# # 답변:
# """


    ### 프롬프트 버전 2 - 사이트 주소와 주어진 정보를 간략하게 요약, 답변 불가 질문에 대해서 할루시네이션 발생
    
    template = """You are an assistant for question-answering tasks. 
    Use the following pieces of retrieved context to answer the question. 
    If you don't know the answer, just say that you don't know. 
    Please write your answer in a markdown format with the main points.
    Answer in Korean.

    Your answer **must** start with: "안녕하세요. **GU Bot**입니다."  

    Make sure to only use information from the provided context. 
    If the answer is not in the provided context, say **"답변할 수 없습니다!"** and do not generate any additional information.
    
    # Example Format:

    # task1 (Answer if the information is found in the context):
    안녕하세요. **GU Bot**입니다.
    (brief summary of the answer based on the context)
        
    # task2 (Answer if the information is not found in the context):
    답변할 수 없습니다!
    
    # Question:
    {question} 

    # Context:
    {context}
    
    # Answer:
    """

    
    
    prompt = ChatPromptTemplate.from_template(template)
    
    llm = create_huggingface_llm()
    
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 1})
    

    rag_chain = (
        prompt
        | llm
        | StrOutputParser()
    )
    
    while True:
        con_data = ""
        print("질문 입력:")
        question = sys.stdin.readline().strip()
    
        if question == "":
            print("테스트 종료")
            break
    
        # 관련 문서 가져오기
        retrieved_docs = retriever.get_relevant_documents(question)
        for doc in retrieved_docs:
            con_data += doc.page_content
    
        # RAG 체인을 스트리밍 방식으로 호출
        response = rag_chain.invoke({"context": con_data, "question": question})

        delimiter = "Answer:"
        if delimiter in response:
            result = response.split(delimiter, 1)[1]
            print(result.strip())

        print()
        
        docs_with_scores = vectorstore.similarity_search_with_score(question, k=1)
        for doc, score in docs_with_scores:
            print(f"Similarity Score: {score}")


if __name__ == "__main__":
    main()
