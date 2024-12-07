import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext"; // Correctly importing the hook
import DragDrop from "../components/DragDrop"; 
import DiseaseDetails from "../components/DiseaseDetails";
import Dropdowns from "../components/Dropdowns";

const PredictionPage = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [dragDrop, setDragDrop] = useState(true);
  const [plantDiseaseData, setPlantDiseaseData] = useState(null); // To store plant disease data
  const [selectedPlant, setSelectedPlant] = useState(""); // To track selected plant
  const [selectedDisease, setSelectedDisease] = useState(""); // To track selected disease
  const { user } = useAuthContext(); // Destructuring user from AuthContext
  const [loading, setLoading] = useState(false); // For handling loading state

  useEffect(() => {
    // Fetch plant disease data from API or define static data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/plant-disease-data");
        setPlantDiseaseData(response.data); // Set the plant disease data
      } catch (error) {
        console.error("Error fetching plant disease data:", error);
      }
    };
    fetchData();
  }, []);

  const notify = (type, message) => {  
    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };

    switch (type) {
      case "warn":
        toast.warn(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      default:
        toast.info(message, options);
    }
  };

  const predictPlantDisease = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`, // Using token from AuthContext
        },
      });
      setLoading(false); // Stop loading when the response is received
      return response.data;
    } catch (error) {
      setLoading(false); // Stop loading if an error occurs
      throw error;
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setDragDrop(true); // Revert to the image upload mode after removal
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!user) return notify("error", "You are not logged in!");
    if (!file && (!selectedPlant || !selectedDisease)) {
      return notify("warn", "Please select a plant or upload an image!");
    }

    try {
      let response;
      if (file) {
        response = await predictPlantDisease(file);
      } else {
        response = {
          class_name: selectedDisease, // Simulate the prediction result with selected disease
        };
      }

      if (response.class_name === "Healthy") {
        notify("info", "The plant is healthy!");
      } else {
        setPrediction(response); // Update state with prediction result
      }
    } catch (err) {
      console.error(err);
      notify("error", "Error in prediction. Try again!");
    }
  };

  return (
    <div className="predictionpage-container">
      <ToastContainer />
      <div className="predict-container">
        <button
          className={dragDrop ? "active" : ""}
          onClick={() => setDragDrop(true)}
        >
          Upload Image
        </button>
        <button
          className={!dragDrop ? "active" : ""}
          onClick={() => setDragDrop(false)}
        >
          Select Disease
        </button>

        {dragDrop ? (
          <form onSubmit={handleFormSubmit}>
            <DragDrop
              onFileChange={(file) => setFile(file)}
              onRemoveClicked={handleRemoveImage}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Predict"}
            </button>
          </form>
        ) : (
          <div>
            <Dropdowns
              plantDiseaseData={plantDiseaseData}
              onPlantChange={(selectedPlant) => setSelectedPlant(selectedPlant)}
              onDiseaseChange={(selectedDisease) => setSelectedDisease(selectedDisease)}
            />
            <button type="button" onClick={handleFormSubmit} disabled={loading}>
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>
        )}
      </div>

      {/* Ensure prediction is available before rendering DiseaseDetails */}
      {prediction && <DiseaseDetails predictedDiseaseData={prediction} />}
    </div>
  );
};

export default PredictionPage;
