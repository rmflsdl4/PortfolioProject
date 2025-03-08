![header](https://capsule-render.vercel.app/api?type=venom&color=074e2e&height=200&section=header&text=GU%20Bot&fontSize=45&fontColor=ffffff)

# 📋 Based Model
[🦙 meta-llama/Llama-3.1-8B](https://huggingface.co/meta-llama/Llama-3.1-8B)

# 📢 GU Bot
[Finetuned Model Link](https://huggingface.co/eawrsdftghuy/llama3.1-gu-bot-v2)

# 💡 Tips
### ✔️ 서버에 모델 다운로드 받기
![image](https://github.com/user-attachments/assets/553ae41a-0b18-478e-8c4b-1a085e7ddef9)  

    wget https://huggingface.co/Bllossom/llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M/resolve/main/llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M.gguf?download=true
* 파일 이름이 llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M.gguf?download=true 이런식으로 나올 수 있으니 llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M.gguf 로 변경할 것
---

### ✔️ 모델 실행을 위한 Modelfile 만들기
    FROM llama-3.2-Korean-Bllossom-3B-gguf-Q4_K_M.gguf

    TEMPLATE """{{- if .System }}
    <s>{{ .System }}</s>
    {{- end }}
    <s>Human:
    {{ .Prompt }}</s>
    <s>Assistant:
    """
    
    SYSTEM """A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions."""
    
    PARAMETER temperature 0
    PARAMETER num_predict 3000
    PARAMETER num_ctx 4096
    PARAMETER stop <s>
    PARAMETER stop </s>
###
    ollama create llama3-ko -f Modelfile
---

### ✔️ 만들어진 모델 사용하기
    from langchain_community.chat_models import ChatOllama

    model = ChatOllama(model="llama3-ko")
---

### ✔️ ollama를 사용하기 위한 순서
    curl -fsSL https://ollama.com/install.sh | sh
###
    ollama pull llama3
###
    ollama serve &
    
