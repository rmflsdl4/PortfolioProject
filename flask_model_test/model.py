import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from langchain.llms import HuggingFacePipeline
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import torch
import sys
from func_stopwatch import stopwatch

MODEL_PATH = "./llama3-8b-bllossom-gu-bot_v2"
CACHE_DIR = "./cache_model"
VECTOR_STORE_PATH = "./vectorstore"
device = "cuda" if torch.cuda.is_available() else "cpu"

class Model:
    @stopwatch
    def load_embeddings_model(self):
        print("Loading Embedding Model", end = '')
        EMBEDDINGS = HuggingFaceEmbeddings(
            model_name="BAAI/bge-m3",
            model_kwargs={
                "device": device,  
            }, 
            encode_kwargs={
                "normalize_embeddings": True,
                "batch_size": 8,
            },
        )
        return EMBEDDINGS
    @stopwatch
    def pdf_load(self):
        os.chdir("./gu")  # PDF 파일이 존재하는 폴더 지정

        # PDF 파일 로드
        loader = []
        file_names = [f for f in os.listdir() if f.endswith(".pdf")] 

        total_files = len(file_names)

        for idx, file_name in enumerate(file_names, start=1):
            try:
                print(f"Loading PDF ({idx}/{total_files})", end = "\r", flush=True)
                pdf_loader = PyMuPDFLoader(file_name)
                loader.extend(pdf_loader.load())
                for idx in range(len(loader)):
                    loader[idx].page_content = loader[idx].page_content.replace("\\n", "\n")
            except Exception as e:
                print(f"Error loading {file_name}: {e}")
        os.chdir("..")

        return loader
    @stopwatch
    def create_vectorstore(self):
        print("Creating Vector Store", end = '')
        if not os.path.exists(VECTOR_STORE_PATH):
            # 문서를 문장으로 분리
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size = 1000,
                chunk_overlap = 50,
            )

            loader = self.pdf_load()

            docs = text_splitter.split_documents(loader)
            
            vectorstore = FAISS.from_documents(docs, self.embeddings_model)
            vectorstore.save_local(VECTOR_STORE_PATH)

            return vectorstore
        else:
            vectorstore = FAISS.load_local(
                VECTOR_STORE_PATH, self.embeddings_model, allow_dangerous_deserialization = True
            )
    @stopwatch
    def load_llm(self):
        print("Loading LLM", end = '')
        if os.path.exists(CACHE_DIR):  # 이미 캐시된 모델이 있으면 로드
            model = AutoModelForCausalLM.from_pretrained(
                CACHE_DIR,
                torch_dtype=torch.float16,  # FP16으로 메모리 절감
                device_map="auto",  # 자동 메모리 분배
                low_cpu_mem_usage=True  # 로드 시 CPU 메모리 최적화
            )
            tokenizer = AutoTokenizer.from_pretrained(CACHE_DIR)
        else:
            model = AutoModelForCausalLM.from_pretrained(
                MODEL_PATH,
                torch_dtype=torch.float16,
                device_map="auto",
                low_cpu_mem_usage=True
            )
            tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
            model.save_pretrained(CACHE_DIR)
            tokenizer.save_pretrained(CACHE_DIR)

        pipe = pipeline(
            "text-generation",
            model = model,
            tokenizer = tokenizer,
            device = 0,  # GPU를 사용할 경우 0, CPU는 -1
            stop_sequence = ["<|eot_id|>", "<|end_of_text|>"],  # 종료 신호
            max_new_tokens = 512,
            do_sample = True,
            temperature = 0.1,
            top_p = 0.95,
            top_k = 10,
            repetition_penalty = 1.2,
            return_full_text = False
        )
        
        # LangChain LLM으로 래핑
        llm = HuggingFacePipeline(pipeline=pipe)
        return llm   
    @stopwatch
    def load_prompt(self):
        print("Loading Prompt => ", end = '')
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
        
        return prompt
    def get_similar_documents(self, question):
        context = ""

        docs_with_scores = self.vectorstore.similarity_search_with_score(question, k=1)
        for doc, score in docs_with_scores:
            if score > 0.4 and score < 1.0:
                context += doc.page_content
            print(f"Similarity Score: {score}")
        
        return context
    def ask(self, question):
        rag_chain = (
            self.prompt
            | self.llm
            | StrOutputParser()
        )
        context = self.get_similar_documents(question)
        
        response = rag_chain.invoke({"context": context, "question": question})

        delimiter = "<|start_header_id|>assistant<|end_header_id|>"
        if delimiter in response:
            result = response.split(delimiter, 1)[1]
            return result.strip()
        
        return "응답을 생성할 수 없습니다."
        
    def __init__(self):
        try:
            self.embeddings_model = self.load_embeddings_model()
            self.vectorstore = self.create_vectorstore()
            self.prompt = self.load_prompt()
            self.llm = self.load_llm()
            print("QA 모델 테스트 가능")
            
        except Exception as e:
            print(f"에러 발생: {e}")
    

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)