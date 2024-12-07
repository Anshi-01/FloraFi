import React from 'react';
import '../css/DiseaseInfoCard.css';  // Assuming you have a CSS file for styling

const DiseaseInfoCard = (props) => {
    return (
        <div className="disease-info-card">
            <h1 className="card-title">{props.title}</h1>
            
            {/* Ensure data is an array and render list items */}
            {Array.isArray(props.data) && props.data.length > 0 ? (
                <ul className="data-list">
                    {props.data.map((item, index) => (
                        <li key={index} className="list-item">{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="no-data-message">No data available</p>  // If data is empty or not an array
            )}
        </div>
    );
}

export default DiseaseInfoCard;
