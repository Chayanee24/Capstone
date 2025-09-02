from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from PIL import Image
import requests
from io import BytesIO

app = FastAPI()

class ImageRequest(BaseModel):
    url: str

# 🔹 โหลด TFLite model
interpreter = tf.lite.Interpreter(
    model_path= "C:/Users/HP/Documents/GitHub/Capstone/ai-inference/rice_disease_model9-types-all.tflite"
)
interpreter.allocate_tensors()

# 🔹 โหลด labels.txt
with open("C:/Users/HP/Documents/GitHub/Capstone/ai-inference/labels-4.txt", "r", encoding="utf-8-sig") as f:
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
    if confidence < 0.7:
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