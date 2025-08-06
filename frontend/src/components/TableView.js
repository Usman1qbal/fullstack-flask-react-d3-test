import React from 'react';
import './TableView.css';

const TableView = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="table-error">
        <p>No data available to display in table format.</p>
      </div>
    );
  }

  // Format population numbers with commas
  const formatPopulation = (population) => {
    return new Intl.NumberFormat('en-US').format(population);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>US Population Data</h3>
        <p>Showing {data.length} records</p>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{item.year}</td>
                <td>{formatPopulation(item.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-summary">
        <div className="summary-item">
          <span className="summary-label">Total Records:</span>
          <span className="summary-value">{data.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Latest Year:</span>
          <span className="summary-value">{Math.max(...data.map(item => item.year))}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Earliest Year:</span>
          <span className="summary-value">{Math.min(...data.map(item => item.year))}</span>
        </div>
      </div>
    </div>
  );
};

export default TableView; 