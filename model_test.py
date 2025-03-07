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

MODEL_PATH = "./llama3-8b-bllossom-gu-bot_v2"
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
    template = """
    <|begin_of_text|><|start_header_id|>system<|end_header_id|>
    You are a Gwangju University response expert who kindly answers student questions by following specific steps.
    These steps must be followed in order without exception.
    
    Step 1:
    Determine whether you can answer the student's question based on the provided context.
    
    Step 2:
    If you determine that you cannot answer the question, end the response.
    
    Step 3:
    If you determine that you can answer the question, provide an answer strictly based on the context provided by the student.
    
    Step 4:
    When generating the answer, refer to the following example and maintain the same format:
    Question:
    마이크로디그리가 뭔가요?
    Context:
    마이크로디그리란?
    * 영어로는 Micro Degree로 표현되며 MD는 약칭입니다.
    * 세분화된 전문분야의 실무형 교육과 융복합 교육을 위하여 운영하는 소단위의 학위과정을 말합니다.
    
    마이크로디그리 관련규정
    * 학칙시행세칙 제50조의2
    
    마이크로디그리 구성 및 이수
    * 마이크로디그리는 2개 이상의 학부(과) 전공 교과목 또는 1개 이상의 학부(과) 전공 교과목과 교양 교과목으로 구성하여야 합니다.
    * 마이크로디그리는 최소 9~15학점을 이수하여야 합니다.
    * 마이크로디그리 별로 이수해야 할 학점이 다릅니다.
    
    마이크로디그리 신청절차
    * 별도의 신청절차 없이 해당 마이크로디그리를 구성하는 교과목을 이수할 경우 인정됩니다.
    
    마이크로디그리 담당 부서 및 연락처
    * 교육혁신처: 062-670-2180, 2177
    Answer:
    마이크로디그리란 다음과 같습니다.
    * 영어로는 Micro Degree로 표현되며 MD는 약칭입니다.
    * 세분화된 전문분야의 실무형 교육과 융복합 교육을 위하여 운영하는 소단위의 학위과정을 말합니다.
    
    Step 5:
    Self-check if you have followed Steps 1 through 4 in order, and once confirmed, output the response. You must answer in Korean only.
    <|eot_id|>
    <|start_header_id|>user<|end_header_id|>
    Question: {question}
    Context: {context}
    Answer:
    <|eot_id|>
    <|start_header_id|>assistant<|end_header_id|>
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
        docs_with_scores = vectorstore.similarity_search_with_score(question, k=1)
        for doc, score in docs_with_scores:
            if score > 0.4 and score < 1.0:
                con_data += doc.page_content
            print(f"Similarity Score: {score}")
    
        # RAG 체인을 스트리밍 방식으로 호출
        response = rag_chain.invoke({"context": con_data, "question": question})

        delimiter = "<|start_header_id|>assistant<|end_header_id|>"
        if delimiter in response:
            result = response.split(delimiter, 1)[1]
            print(result.strip())

        print()
        
if __name__ == "__main__":
    main()
