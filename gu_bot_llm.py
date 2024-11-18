from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import os
import warnings
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain_community.chat_models import ChatOllama

warnings.filterwarnings("ignore")

# PDF 파일이 있는 폴더로 이동
os.chdir("./gu")  # PDF 파일이 존재하는 폴더 지정

# PDF 파일 로드
loader = []
file_names = [f for f in os.listdir() if f.endswith(".pdf")]  # 폴더 내의 모든 PDF 파일 읽기
for file_name in file_names:
    try:
        print(f"Loading: {file_name}")
        pdf_loader = PyMuPDFLoader(file_name)
        loader.extend(pdf_loader.load())  # 모든 페이지를 loader에 추가
    except Exception as e:
        print(f"Error loading {file_name}: {e}")

# 문서를 문장으로 분리
## 청크 크기 500, 각 청크의 50자씩 겹치도록 청크를 나눈다
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
)
docs = text_splitter.split_documents(loader)

# 문장을 임베딩으로 변환하고 벡터 저장소에 저장
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-m3",
    model_kwargs={"device": "cuda"}, 
    encode_kwargs={"normalize_embeddings": True},
)

# 벡터 저장소 생성 및 저장
vectorstore_path = "vectorstore"
os.makedirs(vectorstore_path, exist_ok=True)
vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=vectorstore_path)
vectorstore.persist()  # 벡터 저장소 저장
print("Vectorstore created and persisted")

# Ollama 를 이용해 로컬에서 LLM 실행
model = ChatOllama(model="llama3-ko", temperature=0)
retriever = vectorstore.as_retriever(
    search_type='similarity_score_threshold',
    search_kwargs={'score_threshold': 0.6}
)

# Prompt 템플릿 생성
template = """어진 내용만을 바탕으로 답변해야 해. 만약 사용자의 질문이 주어진 내용과 관련이 없다면, '제가 가지고 있는 정보로는 답변할 수 없습니다.'라고만 답변해야 해.
Context: {context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return "\n\n".join([d.page_content for d in docs])

# Chain 설정
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)

# Chain 실행
#query = "일반 휴학 신청절차에 대해 알려줘"
query = "자퇴 신청절차에 대해 알려줘"

retrieved_docs = retriever.get_relevant_documents(query)
if not retrieved_docs:
    answer = "제가 가지고 있는 정보로는 답변할 수 없습니다."
else:
    # 검색된 문서가 있을 경우에만 Chain 실행
    answer = rag_chain.invoke(query)

print(retrieved_docs)
print("Query:", query)
print("Answer:", answer)
