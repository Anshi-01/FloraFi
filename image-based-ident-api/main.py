from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Define the PlantDisease Pydantic model
class PlantDisease(BaseModel):
    plant_name: str
    disease_name: str
    symptoms: List[str]
    treatment: str


data = [
    PlantDisease(
        plant_name="Apple",
        disease_name="Apple Scab",
        symptoms=["Olive-colored spots", "Dark lesions on fruit"],
        treatment="Use fungicides and remove infected leaves"
    ),
    PlantDisease(
        plant_name="Apple",
        disease_name="Apple Black Rot",
        symptoms=["Sunken, black lesions on fruit", "Wilted leaves"],
        treatment="Prune affected branches and apply copper-based fungicides"
    ),
    PlantDisease(
        plant_name="Apple",
        disease_name="Apple Cedar/Apple Rust",
        symptoms=["Yellow-orange spots on leaves", "Orange spores on undersides of leaves"],
        treatment="Apply fungicides and remove infected cedar trees"
    ),
    PlantDisease(
        plant_name="Cherry",
        disease_name="Cherry Powdery Mildew",
        symptoms=["White powdery coating on leaves", "Distorted leaves"],
        treatment="Apply sulfur-based fungicides"
    ),
    PlantDisease(
        plant_name="Corn",
        disease_name="Corn Cercospora Leaf Spot",
        symptoms=["Round, tan spots with dark borders", "Yellowing of leaf edges"],
        treatment="Apply fungicides and rotate crops"
    ),
    PlantDisease(
        plant_name="Corn",
        disease_name="Corn Common Rust",
        symptoms=["Red-brown pustules on leaves", "Yellowing and curling of leaves"],
        treatment="Use resistant corn varieties and apply fungicides"
    ),
    PlantDisease(
        plant_name="Corn",
        disease_name="Corn Northern Leaf Blight",
        symptoms=["Long, grayish-green lesions", "Wilted leaves"],
        treatment="Apply fungicides and remove infected plant material"
    ),
    PlantDisease(
        plant_name="Grapes",
        disease_name="Grape Black Rot",
        symptoms=["Black lesions on berries", "Cracked fruit"],
        treatment="Use fungicides and remove infected fruit"
    ),
    PlantDisease(
        plant_name="Grapes",
        disease_name="Grape Esca (Black Measles)",
        symptoms=["Spotted leaves", "Fungal growth on wood"],
        treatment="Prune affected wood and apply appropriate fungicides"
    ),
    PlantDisease(
        plant_name="Grapes",
        disease_name="Grape Leaf Blight",
        symptoms=["Brown spots on leaves", "Yellowing of leaf edges"],
        treatment="Prune affected areas and apply fungicides"
    ),
    PlantDisease(
        plant_name="Orange",
        disease_name="Orange Haunglongbing (Citrus Greening)",
        symptoms=["Yellowing of leaves", "Misshapen fruit"],
        treatment="Remove infected trees and use systemic insecticides"
    ),
    PlantDisease(
        plant_name="Peach",
        disease_name="Peach Bacterial Spot",
        symptoms=["Purple spots on leaves", "Lesions on fruit"],
        treatment="Apply copper-based fungicides and remove infected leaves"
    ),
    PlantDisease(
        plant_name="Pepper Bell",
        disease_name="Pepper Bell Bacterial Spot",
        symptoms=["Water-soaked lesions on leaves", "Yellow halos around lesions"],
        treatment="Use copper-based bactericides and remove infected plants"
    ),
    PlantDisease(
        plant_name="Potato",
        disease_name="Potato Early Blight",
        symptoms=["Dark, irregular spots on leaves", "Yellowing of lower leaves"],
        treatment="Apply fungicides and remove infected leaves"
    ),
    PlantDisease(
        plant_name="Potato",
        disease_name="Potato Late Blight",
        symptoms=["Water-soaked lesions on leaves", "Dark brown spots on tubers"],
        treatment="Use copper-based fungicides and remove infected plants"
    ),
    PlantDisease(
        plant_name="Squash",
        disease_name="Squash Powdery Mildew",
        symptoms=["White powdery spots on leaves", "Leaf curling and yellowing"],
        treatment="Apply sulfur-based fungicides"
    ),
    PlantDisease(
        plant_name="Strawberry",
        disease_name="Strawberry Leaf Scorch",
        symptoms=["Brown, scorched leaf edges", "Wilting of leaves"],
        treatment="Improve air circulation and apply fungicides"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Bacterial Spot",
        symptoms=["Water-soaked spots on leaves", "Brown lesions on fruit"],
        treatment="Use copper-based bactericides and remove affected leaves"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Early Blight",
        symptoms=["Concentric rings on leaves", "Yellowing of leaf edges"],
        treatment="Apply fungicides and remove infected leaves"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Late Blight",
        symptoms=["Dark lesions on leaves", "Water-soaked spots on fruit"],
        treatment="Use fungicides and remove affected plants"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Leaf Mold",
        symptoms=["Yellow spots on leaves", "White mold growth on undersides"],
        treatment="Improve air circulation and use fungicides"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Septoria Leaf Spot",
        symptoms=["Small, dark spots with yellow halos on leaves", "Defoliation"],
        treatment="Remove infected leaves and apply fungicides"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Spider Mites",
        symptoms=["Speckled appearance on leaves", "Yellowing and curling of leaves"],
        treatment="Use miticides and remove affected leaves"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Target Spot",
        symptoms=["Circular spots with dark edges on leaves", "Defoliation"],
        treatment="Apply fungicides and remove infected leaves"
    ),
    PlantDisease(
        plant_name="Tomato",
        disease_name="Tomato Mosaic Virus",
        symptoms=["Mosaic pattern on leaves", "Distorted leaves and fruit"],
        treatment="Remove infected plants and control aphids"
    )
]


# Endpoint to fetch plant disease data
@app.get("/plant-disease-data", response_model=List[PlantDisease])
async def get_plant_disease_data():

    return data

