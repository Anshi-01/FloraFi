const mongoose = require('mongoose');

// Define the PlantDisease schema
const plantDiseaseSchema = new mongoose.Schema({
    plant_name: { type: String, required: true },
    disease_name: { type: String, required: true },
    symptoms: { type: [String], required: true },
    treatment: { type: String, required: true }
});

// Create and export the model
const Disease = mongoose.model('PlantDisease', plantDiseaseSchema);

module.exports = Disease;
