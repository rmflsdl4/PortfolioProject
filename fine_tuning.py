# CSV Setting
import pandas as pd
from datasets import Dataset
from huggingface_hub import login
#from langchain import hub
#login(token="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")

# CSV file read
csv_path = "gu_datasets_no_context.csv"  # CSV 파일 경로
data = pd.read_csv(csv_path)

# Hugging Face Dataset으로 변환
dataset = Dataset.from_pandas(data)

# Base Model Setting
from unsloth import FastLanguageModel
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

model_name = "meta-llama/Llama-3.1-8B"  # Base 모델 경로
max_seq_length = 512
dtype = None
load_in_4bit = True

# Base 모델 및 Tokenizer 로드
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name=model_name,
    max_seq_length=max_seq_length,
    dtype=dtype,
    load_in_4bit=load_in_4bit,
)


# LoRA 어댑터 설정 (fine-tuning용)
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=3407,
    use_rslora=False,
    loftq_config=None,
)


# Prompt Template 설정
llama_prompt = """You must be a good AI assistant that provides information about Gwangju University and answer questions in a question-and-answer format. You must answer as kindly as possible in Korean, and if you don't understand something, you must say, 'I didn't understand well'.
Question: {instruction} 
Context: {input} 
Answer: {output}<|eot_id|><|end_of_text|>
"""
#llama_prompt = hub.pull("rlm/rag-prompt")
EOS_TOKEN = tokenizer.eos_token  # EOS 토큰

# Prompt 생성 함수
def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    inputs = inputs = [""] * len(examples["instruction"])#examples["input"]
    outputs = examples["output"]
    texts = []
    for instruction, input_text, output_text in zip(instructions, inputs, outputs):
        text = llama_prompt.format(
            instruction=instruction,
            input=input_text,
            output=output_text
        ) + EOS_TOKEN
        texts.append(text)
    return {"text": texts}


# Dataset 변환
dataset = dataset.map(formatting_prompts_func, batched=True)


# 모델 훈련 세팅
from trl import SFTTrainer
from transformers import TrainingArguments
from unsloth import is_bfloat16_supported

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=max_seq_length,
    dataset_num_proc=2,
    packing=False,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=5,
        max_steps=60,
        learning_rate=2e-4,
        fp16=not is_bfloat16_supported(),
        bf16=is_bfloat16_supported(),
        logging_steps=1,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        output_dir="outputs",
    ),
)

# 모델 훈련
trainer_stats = trainer.train()
print(trainer_stats)

# 모델 저장
model.save_pretrained("./finetuned_model")
tokenizer.save_pretrained("./finetuned_model")