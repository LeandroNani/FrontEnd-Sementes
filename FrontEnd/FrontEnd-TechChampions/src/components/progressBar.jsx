import React from 'react';
import '../Utils/css/carreiras.css';

const ProgressBar = ({ value, maxValue, label }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">{label}</div>
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;