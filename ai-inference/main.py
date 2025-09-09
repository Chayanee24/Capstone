from fastapi import FastAPI, HTTPException 
from pydantic import BaseModel
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import os

from ai_edge_litert.interpreter import Interpreter

app = FastAPI()

class ImageRequest(BaseModel):
    url: str

# 🔹 Base path ของไฟล์ main.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 🔹 Path ของโมเดลและ labels
MODEL_PATH = os.path.join(BASE_DIR, "models", "rice_disease_model9-types-all.tflite")
LABEL_PATH = os.path.join(BASE_DIR, "models", "labels-4.txt")

print("📂 Looking for model at:", MODEL_PATH)
print("📂 Looking for labels at:", LABEL_PATH)

# 🔹 โหลด LiteRT model
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

interpreter = Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

# 🔹 โหลด labels.txt
if not os.path.exists(LABEL_PATH):
    raise FileNotFoundError(f"Labels file not found at {LABEL_PATH}")

with open(LABEL_PATH, "r", encoding="utf-8-sig") as f:
    label_map = [line.strip() for line in f.readlines()]

# 🔹 ดึง input/output tensor
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# 🔹 ฟังก์ชันพยากรณ์จาก URL
def predict_from_url(image_url: str):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content)).convert("RGB").resize((224, 224))
    img = np.expand_dims(np.array(img, dtype=np.float32) / 255.0, axis=0)

    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()

    output = interpreter.get_tensor(output_details[0]['index'])[0]
    predicted_index = int(np.argmax(output))
    confidence = float(np.max(output))
    predicted_label = label_map[predicted_index]

    # ✅ กรองภาพที่ไม่น่าใช่ข้าว
    if confidence < 0.6:
        return {
            "label": "Unknown / Not Rice",
            "confidence": confidence,
            "raw_output": output.tolist()
        }

    return {
        "label": predicted_label,
        "confidence": confidence,
        "raw_output": output.tolist()
    }

# 🔹 Endpoint สำหรับพยากรณ์
@app.post("/uploads/analyze")
def predict_image(req: ImageRequest):
    try:
        print(f"📥 Received image URL: {req.url}")
        result = predict_from_url(req.url)
        print(f"✅ Prediction result: {result}")
        return result
    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))
