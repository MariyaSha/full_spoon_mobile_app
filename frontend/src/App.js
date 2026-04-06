import React, { useState } from 'react';
import TopBar from './components/TopBar';
import MenuDrawer from './components/MenuDrawer';
import FilterPanel from './components/FilterPanel';
import Homepage from './components/Homepage';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsFilterOpen(false); // Close filter if open
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false); // Close menu if open
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="App relative min-h-screen bg-white" data-testid="app-container">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
      />
      
      <main className="pb-8">
        <Homepage />
      </main>
      
      <MenuDrawer 
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
      />
      
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
      />
    </div>
  );
}

export default App;
