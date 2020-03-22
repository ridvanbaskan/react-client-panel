import React from 'react';
import './WithSpinner.styles.css';

const WithSpinner = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="spinner-overlay">
        <div className="spinner-container" />
      </div>
    )
  );
};

export default WithSpinner;
