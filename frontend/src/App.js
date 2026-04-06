import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import MenuDrawer from './components/MenuDrawer';
import FilterPanel from './components/FilterPanel';
import Homepage from './components/Homepage';
import QuickRecipesPage from './pages/QuickRecipesPage';
import LovedRecipesPage from './pages/LovedRecipesPage';
import './App.css';

function HomeLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleLovedClick = () => {
    navigate('/loved-recipes');
  };

  return (
    <div className="App min-h-screen bg-white" data-testid="app-container">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={handleLovedClick}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      <main className="pb-8">
        <Homepage />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/quick-recipes" element={<QuickRecipesPage />} />
        <Route path="/loved-recipes" element={<LovedRecipesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
