import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/getMenu');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMenuItems(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError('Failed to load menu items. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      {/* Fixed Header */}
      <header className="header">
        <h1>Welcome to our page</h1>
      </header>

      <div className="main-container">
        {/* Sidebar - 30% width */}
        <aside className="sidebar">
          <Sidebar 
            menuItems={menuItems}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
            loading={loading}
            error={error}
          />
        </aside>

        {/* Main Content Area - 70% width */}
        <main className="content-area">
          <ContentArea selectedItem={selectedItem} />
        </main>
      </div>
    </div>
  );
}

export default App;
