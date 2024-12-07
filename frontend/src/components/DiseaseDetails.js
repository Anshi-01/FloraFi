import React from 'react';
import DiseaseInfoCard from '../components/DiseaseInfoCard';
import GeneratePdfFile from './GeneratePdfFile';

const DiseaseDetails = (props) => {
  const { predictedDiseaseData } = props;

  // Add a check to ensure predictedDiseaseData exists before accessing its properties
  if (!predictedDiseaseData) {
    return <div>Loading...</div>;  // Or a message saying no data is available
  }

  return (
    <div className='disease-details'>
        <GeneratePdfFile data={predictedDiseaseData} />
        
        {/* Check if plant_name exists before displaying it */}
        <h1>Plant Name: {predictedDiseaseData.plant_name || "Not available"}</h1>

        {/* Check if disease_name exists before displaying it */}
        <h2>Disease Name: {predictedDiseaseData.disease_name || "Not available"}</h2>

        {/* Check if symptoms exists before passing data to DiseaseInfoCard */}
        <DiseaseInfoCard 
          title="Symptoms" 
          data={predictedDiseaseData.symptoms && predictedDiseaseData.symptoms.length > 0 ? predictedDiseaseData.symptoms : ["No symptoms available"]} 
        />
        
        {/* Similarly for treatment */}
        <DiseaseInfoCard 
          title="Treatment" 
          data={predictedDiseaseData.treatment && predictedDiseaseData.treatment.length > 0 ? [predictedDiseaseData.treatment] : ["No treatment information available"]} 
        />
    </div>
  );
}

export default DiseaseDetails;
