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

  return (
    <div className="App min-h-screen bg-white" data-testid="app-container">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
      />
      
      {/* Expandable Menu Panel - pushes content down */}
      <MenuDrawer isOpen={isMenuOpen} />
      
      {/* Expandable Filter Panel - pushes content down */}
      <FilterPanel isOpen={isFilterOpen} />
      
      {/* Main Content - gets pushed down when panels expand */}
      <main className="pb-8">
        <Homepage />
      </main>
    </div>
  );
}

export default App;
