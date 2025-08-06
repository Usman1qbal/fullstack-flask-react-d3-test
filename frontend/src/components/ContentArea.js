import React, { useState, useEffect } from 'react';
import TableView from './TableView';
import ChartView from './ChartView';
import TextView from './TextView';
import './ContentArea.css';

const ContentArea = ({ selectedItem }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      fetchData();
    } else {
      setData(null);
      setError(null);
    }
  }, [selectedItem]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    if (!selectedItem) return;

    setLoading(true);
    setError(null);

    try {
      let url;
      
      // Determine the API endpoint based on the item name
      if (selectedItem.name === 'about') {
        url = 'http://localhost:5001/api/rules/about';
      } else if (selectedItem.name === 'table' || selectedItem.name === 'chart') {
        url = 'http://localhost:5001/api/rules/us_population_data';
      } else {
        // For any other item types, try a generic pattern
        url = `http://localhost:5001/api/rules/${selectedItem.name}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(`Failed to load data for ${selectedItem.label}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedItem) {
    return (
      <div className="content-placeholder">
        <div className="placeholder-content">
          <h2>Welcome to the Dashboard</h2>
          <p>Select an item from the sidebar to view its content.</p>
          <div className="placeholder-icon">📊</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-loading">
        <div className="spinner"></div>
        <p>Loading {selectedItem.label}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-error">
        <p>⚠️ {error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  // Render content based on the item type
  const renderContent = () => {
    switch (selectedItem.name) {
      case 'table':
        return <TableView data={data} />;
      case 'chart':
        return <ChartView data={data} />;
      case 'about':
        return <TextView data={data} />;
      default:
        // For any other types, try to render as text
        return <TextView data={data} />;
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <h2>{selectedItem.label}</h2>
        <span className="content-type">{selectedItem.name}</span>
      </div>
      <div className="content-body">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentArea; 