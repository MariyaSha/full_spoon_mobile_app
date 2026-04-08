import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import MenuDrawer from './components/MenuDrawer';
import FilterPanel from './components/FilterPanel';
import Homepage from './components/Homepage';
import CategoryPage from './pages/CategoryPage';
import LovedRecipesPage from './pages/LovedRecipesPage';
import CartPage from './pages/CartPage';
import CartRecipesPage from './pages/CartRecipesPage';
import SaveCartPage from './pages/SaveCartPage';
import SavedCartsPage from './pages/SavedCartsPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
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

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="App min-h-screen bg-white" data-testid="app-container">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={handleLovedClick}
        onCartClick={handleCartClick}
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
        <Route path="/all-recipes" element={<CategoryPage category="all" title="ALL RECIPES" />} />
        <Route path="/quick-recipes" element={<CategoryPage category="quick" title="QUICK RECIPES" />} />
        <Route path="/low-calorie" element={<CategoryPage category="low_calorie" title="LOW CALORIE" />} />
        <Route path="/no-pork" element={<CategoryPage category="no_pork" title="NO PORK" />} />
        <Route path="/vegetarian" element={<CategoryPage category="vegetarian" title="VEGETARIAN" />} />
        <Route path="/dairy-free" element={<CategoryPage category="dairy_free" title="DAIRY FREE" />} />
        <Route path="/loved-recipes" element={<LovedRecipesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart-recipes" element={<CartRecipesPage />} />
        <Route path="/save-cart" element={<SaveCartPage />} />
        <Route path="/saved-carts" element={<SavedCartsPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
