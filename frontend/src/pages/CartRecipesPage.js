import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';

const CartRecipesPage = () => {
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

  const placeholderRecipes = [
    { id: 1, title: 'Placeholder Cart Recipe 1', testId: 'cart-recipe-card-1' },
    { id: 2, title: 'Placeholder Cart Recipe 2', testId: 'cart-recipe-card-2' },
    { id: 3, title: 'Placeholder Cart Recipe 3', testId: 'cart-recipe-card-3' }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="cart-recipes-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={() => navigate('/loved-recipes')}
        onCartClick={() => navigate('/cart')}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      <main className="p-4 pb-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/cart')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to cart"
            data-testid="back-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-primary">CART RECIPES</h1>
        </div>
        
        <div className="space-y-4">
          {placeholderRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              testId={recipe.testId}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CartRecipesPage;
