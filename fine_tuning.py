# CSV Setting
import pandas as pd
from datasets import Dataset

# CSV file read
csv_path = "gu_datasets.csv"
data = pd.read_csv(csv_path)

# Hugging Face Dataset으로 변환
dataset = Dataset.from_pandas(data)

print(dataset[0])


# Base Model Setting
from unsloth import FastLanguageModel
import torch

model_name = "beomi/Llama-3-KoEn-8B-Instruct-preview"
max_seq_length = 2048
dtype = None
load_in_4bit = True

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = model_name,
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)


# lora adapter 사용 (fine tuning 가속)
model = FastLanguageModel.get_peft_model(
    model,
    r = 16,
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
    use_gradient_checkpointing = "unsloth",
    random_state = 3407,
    use_rslora = False,
    loftq_config = None,
)


llama_prompt = """아래는 작업을 설명하는 지침과 추가적인 맥락을 제공하는 입력이 주어집니다. 주어진 원문에 없는 내용은 답변으로 절대 제공하지 않습니다.

### instruction:
{}

### input:
"주어진 원문은 광주대학교에 대한 정보입니다."

### 응답:
{}
"""




EOS_TOKEN = tokenizer.eos_token 
def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    inputs = examples["input"]
    outputs = examples["output"]
    texts = []
    for instruction, input, output in zip(instructions, inputs, outputs):
        text = llama_prompt.format(instruction, input, output) + EOS_TOKEN
        texts.append(text)
    return {"text" : texts, }
pass

dataset = dataset.map(formatting_prompts_func, batched = True)


# 모델 훈련 세팅
from trl import SFTTrainer
from transformers import TrainingArguments
from unsloth import is_bfloat16_supported

trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = max_seq_length,
    dataset_num_proc = 2,
    packing = False,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 5,
        max_steps = 60,
        learning_rate = 2e-4,
        fp16 = not is_bfloat16_supported(),
        bf16 = is_bfloat16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit",
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 3407,
        output_dir = "outputs",
    ),
)

# 모델 훈련
trainer_stats = trainer.train()
print(trainer_stats)
# 모델 저장
model.save_pretrained("./finetuned_model")
tokenizer.save_pretrained("./finetuned_model")
