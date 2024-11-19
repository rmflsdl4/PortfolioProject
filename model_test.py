from transformers import AutoTokenizer, AutoModelForCausalLM, TextStreamer
import torch
import sys
import io

sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8')

# 모델과 토크나이저 로드
model_name = "./finetuned_model"
model = AutoModelForCausalLM.from_pretrained(model_name).to("cuda")
tokenizer = AutoTokenizer.from_pretrained(model_name)

# 프롬프트 텍스트
llama_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}"""

# 무한 루프를 사용하여 질문을 입력받고 모델로 응답을 생성
while True:
    print("질문 입력:")
    question = sys.stdin.readline().strip()

    if question == "":
        print("테스트 종료")
        break

    # 모델에 입력할 텍스트 준비
    inputs = tokenizer(
        [
            llama_prompt.format(
                question,  # 사용자 질문
                "",  # 빈 입력 (필요에 따라 수정)
                ""   # 빈 응답 (필요에 따라 수정)
            )
        ], return_tensors="pt").to("cuda")

    # 모델로 텍스트 생성 (응답)
    text_streamer = TextStreamer(tokenizer)
    _ = model.generate(**inputs, streamer=text_streamer, max_new_tokens=128)

    print()
