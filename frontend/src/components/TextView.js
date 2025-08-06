import React from 'react';
import './TextView.css';

const TextView = ({ data }) => {
  if (!data) {
    return (
      <div className="text-error">
        <p>No text content available.</p>
      </div>
    );
  }

  // Handle different data structures
  let content = '';
  let lastUpdate = '';
  let fontSize = '16px'; // Default font size

  if (typeof data === 'string') {
    content = data;
  } else if (data.content) {
    content = data.content;
    lastUpdate = data.last_update;
  } else if (Array.isArray(data)) {
    // If it's an array, convert to text representation
    content = data.map(item => 
      typeof item === 'object' 
        ? JSON.stringify(item, null, 2) 
        : String(item)
    ).join('\n\n');
  } else {
    content = JSON.stringify(data, null, 2);
  }

  return (
    <div className="text-container">
      <div className="text-header">
        <h3>Text Content</h3>
        {lastUpdate && (
          <div className="last-update">
            <span className="update-label">Last Updated:</span>
            <span className="update-time">{lastUpdate}</span>
          </div>
        )}
      </div>
      
      <div className="text-content" style={{ fontSize }}>
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="text-paragraph">
            {paragraph || '\u00A0'} {/* Use non-breaking space for empty paragraphs */}
          </p>
        ))}
      </div>
      
      <div className="text-footer">
        <div className="text-stats">
          <div className="stat-item">
            <span className="stat-label">Characters:</span>
            <span className="stat-value">{content.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Words:</span>
            <span className="stat-value">{content.split(/\s+/).filter(word => word.length > 0).length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Paragraphs:</span>
            <span className="stat-value">{content.split('\n').filter(p => p.trim().length > 0).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextView; 