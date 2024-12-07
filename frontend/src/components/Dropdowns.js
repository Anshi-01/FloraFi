import React, { useState } from "react";
import "../index.css";

const Dropdowns = (props) => {
  // Example plantDiseaseData object
  const plantDiseaseData = {
    plant1: {
      name: "Apple",
      diseases: ["Apple Scab", "Apple Black Rot", "Apple Cedar/Apple Rust"],
    },
    plant2: {
      name: "Cherry",
      diseases: ["Cherry Powdery Mildew"],
    },
    plant3: {
      name: "Corn",
      diseases: [
        "Corn Cercospora Leaf Spot",
        "Corn Common Rust",
        "Corn Northern Leaf Blight",
      ],
    },
    plant4: {
      name: "Grapes",
      diseases: [
        "Grape Black Rot",
        "Grape Esca (Black Measles)",
        "Grape Leaf Blight",
      ],
    },
    plant5: {
      name: "Orange",
      diseases: ["Orange Haunglongbing (Citrus Greening)"],
    },
    plant6: {
      name: "Peach",
      diseases: ["Peach Bacterial Spot"],
    },
    plant7: {
      name: "Pepper Bell",
      diseases: ["Pepper Bell Bacterial Spot"],
    },
    plant8: {
      name: "Potato",
      diseases: ["Potato Early Blight", "Potato Late Blight"],
    },
    plant9: {
      name: "Squash",
      diseases: ["Squash Powdery Mildew"],
    },
    plant10: {
      name: "Strawberry",
      diseases: ["Strawberry Leaf Scorch"],
    },
    plant11: {
      name: "Tomato",
      diseases: [
        "Tomato Bacterial Spot",
        "Tomato Early Blight",
        "Tomato Late Blight",
        "Tomato Leaf Mold",
        "Tomato Septoria Leaf Spot",
        "Tomato Spider Mites",
        "Tomato Target Spot",
        "Tomato Mosaic Virus",
      ],
    },
  };
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const handlePlantChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPlant(selectedValue);
    setSelectedDisease(""); // Reset the disease selection when the plant changes
    props.onPlantChange(selectedValue);
  };

  const handleDiseaseChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDisease(selectedValue);
    props.onDiseaseChange(selectedValue);
  };

  const getDiseaseOptions = () => {
    if (selectedPlant) {
      const selectedPlantData = plantDiseaseData[selectedPlant];
      return selectedPlantData && selectedPlantData.diseases
        ? selectedPlantData.diseases.map((disease, index) => (
            <option key={index} value={disease}>
              {disease}
            </option>
          ))
        : null;
    } else {
      return (
        <option value="" disabled>
          Select a Plant first
        </option>
      );
    }
  };

  return (
    <div className="options-container">
      <div className="selectField">
        <label className="selectField-label">Plant Name</label>
        <select
          className="selectField-select"
          value={selectedPlant}
          onChange={handlePlantChange}
        >
          <option value="">Select a Plant</option>
          {plantDiseaseData &&
            Object.keys(plantDiseaseData).map((plantKey, index) => (
              <option key={index} value={plantKey}>
                {plantDiseaseData[plantKey].name}
              </option>
            ))}
        </select>
      </div>

      <div className="selectField">
        <label className="selectField-label">Disease Name</label>
        <select
          className="selectField-select"
          value={selectedDisease}
          onChange={handleDiseaseChange}
          disabled={!selectedPlant}
        >
          <option value="">Select a Disease</option>
          {getDiseaseOptions()}
        </select>
      </div>
    </div>
  );
}

export default Dropdowns;
