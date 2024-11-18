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

# PDF 파일명 로드 (추후에 복수의 파일로 파일 로드 할 수 있게 for 내의 try 수정)
os.chdir("./대학생활") #PDF가 존재하는 폴더 지정

file_names = os.listdir()
for file_name in file_names:
    try:
        print(file_name)
    except:
        print("에러 발생")
        
# PyMuPDFLoader 을 이용해 PDF 파일 로드
loader = PyMuPDFLoader("gw.pdf")
pages = loader.load()


# 문서를 문장으로 분리
## 청크 크기 500, 각 청크의 50자씩 겹치도록 청크를 나눈다
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
)
docs = text_splitter.split_documents(pages)

# 문장을 임베딩으로 변환하고 벡터 저장소에 저장
embeddings = HuggingFaceEmbeddings(
    model_name='BAAI/bge-m3',
    #model_kwargs={'device':'cpu'},
    model_kwargs={'device':'cuda'},
    encode_kwargs={'normalize_embeddings':True},
)
# 벡터 저장소 생성
vectorstore = Chroma.from_documents(docs, embeddings)


# 벡터 저장소 경로 설정
## 현재 경로에 'vectorstore' 경로 생성
vectorstore_path = 'vectorstore'
os.makedirs(vectorstore_path, exist_ok=True)

# 벡터 저장소 생성 및 저장
vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=vectorstore_path)
# 벡터스토어 데이터를 디스크에 저장
vectorstore.persist()
print("Vectorstore created and persisted")

# Ollama 를 이용해 로컬에서 LLM 실행
## llama3-ko-instruct 모델 다운로드는 Ollama 사용법 참조
model = ChatOllama(model="llama3-ko", temperature=0)
retriever = vectorstore.as_retriever(search_kwargs={'k': 3})
# Prompt 템플릿 생성
template = '''모든 대답은 한국어(Korean)으로 대답해야 해. 너가 가지고있는 지식은 모두 배제하고, 주어진 내용만을 바탕으로 답변해야해. 만약 사용자의 질문이 주어진 내용과 관련이 없다면, 제가 가지고 있는 정보로는 답변할 수 없습니다. 라고만 반드시 말해야해.:
{context}

Question: {question}
'''

prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return '\n\n'.join([d.page_content for d in docs])


rag_chain = (
    {'context': retriever | format_docs, 'question': RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)

# Chain 실행
query = "광주대학교 이익훈 교수님에 대해 알려줘"
answer = rag_chain.invoke(query)

print("Query:", query)
print(retriever.get_relevant_documents(query))
print("Answer:", answer)
