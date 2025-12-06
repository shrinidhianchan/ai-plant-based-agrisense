# C:\projects\Fertilizer\backend\main.py (FINAL VERSION FOR VERCEL)

import os
import joblib
import tensorflow as tf
import numpy as np
from PIL import Image
import io

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

# --- Setup ---
app = FastAPI(title="AI Farm Assistant API")
logging.basicConfig(level=logging.INFO)

# CORS configuration (Crucial for Vercel/GitHub Pages communication)
# NOTE: Replace 'ai-plant-based-agrisense.vercel.app' with your actual Vercel domain once known!
origins = [
    "http://127.0.0.1:5173",   
    "http://localhost:5173",
    "https://shrinidhianchan.github.io", # GitHub Pages domain
    "https://ai-plant-based-agrisense.vercel.app", # Vercel production backend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Model Loading Global Variables ---
fertilizer_model = None
crop_encoder = None
fert_encoder = None
disease_model = None
DISEASE_LABELS = [] 

IMG_SIZE = (224, 224)

# --- Utility Functions and Schemas ---

class SoilAnalysisInput(BaseModel):
    plant_species: str
    N: float
    P: float
    K: float
    pH: float

DISEASE_LABELS = [
    'Apple_Black_rot', 'Apple_Cedar_rust', 'Apple_healthy', 'Apple_scab',
    'Blueberry_healthy', 
    'Cherry(including_sour)_Powdery_mildew', 'Cherry(including_sour)_healthy',
    'Corn(maize)_Cercospora_leaf_spot Gray_leaf_spot', 'Corn(maize)_Common_rust', 
    'Corn(maize)_Northern_Leaf_Blight', 'Corn(maize)_healthy',
    'Grape_Black_rot', 'Grape_Esca(Black_Measles)', 'Grape_Leaf_blight(Isariopsis_leaf_spot)', 
    'Grape_healthy',
    'Orange_Haunglongbing(Citrus_greening)',
    'Peach_Bacterial_spot', 'Peach_healthy',
    'Pepper,_bell_Bacterial_spot', 'Pepper,_bell_healthy',
    'Potato_Early_blight', 'Potato_Late_blight', 'Potato_healthy',
    'Raspberry_healthy',
    'Soybean_healthy',
    'Squash_Powdery_mildew',
    'Strawberry_Leaf_scorch', 'Strawberry_healthy',
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight', 
    'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot', 
    'Tomato_Spider_mites Two-spotted_spider_mite', 'Tomato_Target_Spot', 
    'Tomato_Tomato_mosaic_virus', 'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_healthy',
]

# --- Application Startup Event (PATHING FIXED) ---

@app.on_event("startup")
async def load_models():
    """Loads the ML models when the FastAPI application starts."""
    global fertilizer_model, crop_encoder, fert_encoder, disease_model
    logging.info("Attempting to load ML models...")

    # ✅ FIX 1: Get the directory where this script (main.py) is located
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Load Fertilizer Model Bundle
    try:
        # Build path relative to main.py's location
        bundle_path = os.path.join(base_dir, 'models', 'fertilizer_prediction_bundle.joblib')
        bundle = joblib.load(bundle_path)
        fertilizer_model = bundle['model']
        crop_encoder = bundle['crop_encoder']
        fert_encoder = bundle['fert_encoder']
        logging.info("Fertilizer model bundle loaded successfully.")
    except Exception as e:
        logging.error(f"Error loading fertilizer model: {e}")

    # Load Disease Detection Model
    try:
        # Build path relative to main.py's location
        model_path = os.path.join(base_dir, 'models', 'plant_disease_model.h5')
        disease_model = tf.keras.models.load_model(model_path, compile=False)
        logging.info("Disease model loaded successfully.")
    except Exception as e:
        logging.error(f"Error loading disease model: {e}")

    logging.info("Application startup complete.")


# --- Endpoints (The rest of the code is sound) ---

@app.post("/api/analyze/soil")
def analyze_soil(input_data: SoilAnalysisInput):
    """
    Predicts the recommended fertilizer based on soil nutrient levels and crop type.
    """
    if not fertilizer_model or not crop_encoder:
        raise HTTPException(status_code=503, detail="Soil prediction model not loaded.")

    try:
        # 1. Encode the crop species 
        encoded_crop = crop_encoder.transform([input_data.plant_species])[0]

        # 2. Prepare the input data array (Order: N, P, K, pH, plant_species_encoded)
        features = [
            input_data.N,
            input_data.P,
            input_data.K,
            input_data.pH,
            encoded_crop
        ]
        
        input_array = np.array(features).reshape(1, -1)

        # 3. Predict the encoded fertilizer label
        encoded_prediction = fertilizer_model.predict(input_array)[0]

        # 4. Inverse transform to get the human-readable fertilizer name
        recommended_fertilizer = fert_encoder.inverse_transform([encoded_prediction])[0]
        
        # 5. Extract focus (Simplified logic)
        focus = "Balanced NPK application."
        if input_data.N < 40 and input_data.P > 40:
             focus = "Focus on Nitrogen supplementation."
        elif input_data.P < 30 and input_data.N > 40:
             focus = "Focus on Phosphorus supplementation."
        elif input_data.K < 30:
             focus = "Focus on Potassium and pH adjustment."

        return {
            "plant_species": input_data.plant_species,
            "recommended_fertilizer": recommended_fertilizer,
            "soil_improvement_focus": focus
        }

    except ValueError as e:
        if "unseen labels" in str(e):
             raise HTTPException(status_code=400, 
                                 detail=f"Input validation failed for features: {input_data.plant_species}. This crop type is not supported by the current model. Please check inputs.")
        raise HTTPException(status_code=500, detail=f"Prediction Error: {e}")
    except Exception as e:
        logging.error(f"Soil analysis failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during soil analysis.")


@app.post("/api/analyze/disease")
async def analyze_disease(file: UploadFile = File(...)):
    """
    Detects plant disease from an uploaded leaf image.
    """
    if not disease_model:
        raise HTTPException(status_code=503, detail="Disease detection model not loaded.")
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Must be an image.")

    try:
        # 1. Read the file content
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # 2. Preprocess the image 
        image = image.resize(IMG_SIZE)
        
        # Convert to a numpy array and normalize
        image_array = np.asarray(image)
        normalized_array = image_array / 255.0
        
        # Add a batch dimension
        input_tensor = np.expand_dims(normalized_array, axis=0)

        # 3. Predict
        predictions = disease_model.predict(input_tensor)
        
        # Get the highest confidence index and score
        predicted_index = np.argmax(predictions)
        confidence_score = predictions[0][predicted_index] * 100
        
        # Convert NumPy float32 to standard Python float for JSON serialization
        confidence_score_py_float = float(confidence_score)
        
        # 4. Map index to label
        detected_issue = DISEASE_LABELS[predicted_index]
        
        # 5. Extract base disease and generate a mock treatment
        base_plant = detected_issue.split('_')[0]
        treatment_advice = f"Apply a broad-spectrum fungicide specifically recommended for {base_plant} diseases."


        return {
            "detected_issue": detected_issue,
            "confidence_score": confidence_score_py_float, # Use the converted float
            "treatment": treatment_advice,
            "image_filename": file.filename
        }

    except Exception as e:
        logging.error(f"Disease analysis failed: {e}")
        # Return a generic 500 error detail, as the actual trace is for debugging
        raise HTTPException(status_code=500, detail="Internal server error during disease analysis. Check backend console for details.")