import React from 'react';
import './Sidebar.css';

const Sidebar = ({ menuItems, selectedItem, onItemClick, loading, error }) => {
  if (loading) {
    return (
      <div className="sidebar-content">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar-content">
        <div className="error">
          <p>⚠️ {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-content">
      <h2>Navigation Menu</h2>
      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${selectedItem?.id === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
          >
            <span className="menu-icon">
              {item.name === 'table' && '📊'}
              {item.name === 'chart' && '📈'}
              {item.name === 'about' && 'ℹ️'}
              {!['table', 'chart', 'about'].includes(item.name) && '📄'}
            </span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {menuItems.length === 0 && (
        <div className="empty-state">
          <p>No menu items available</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 