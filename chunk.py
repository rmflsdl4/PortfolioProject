from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyMuPDFLoader
import os

os.chdir("/content/gu")  # PDF 파일이 존재하는 폴더 지정

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

loader_page = 2
docs = text_splitter.split_documents(loader)
#print(f"========== {loader[loader_page].metadata['source']} ==========")
#print(loader[loader_page].page_content)
print("나눠진 청크 개수: ", len(docs))
for idx in range(len(docs)):
  print(f"========== {docs[idx].metadata['source']} {idx+1} Page==========")
  print(docs[idx].page_content)
  print("\n\n")