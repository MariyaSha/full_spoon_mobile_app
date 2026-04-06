import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';

const SavedCartsPage = () => {
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

  const savedCarts = [
    { id: 1, name: 'game night', date: '01.04.26', testId: 'saved-cart-1' },
    { id: 2, name: 'easter', date: '07.04.26', testId: 'saved-cart-2' },
    { id: 3, name: 'camping', date: '02.08.25', testId: 'saved-cart-3' },
    { id: 4, name: 'party', date: '07.07.25', testId: 'saved-cart-4' }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="saved-carts-page">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <h1 className="text-2xl font-bold text-primary">SAVED CARTS</h1>
        </div>
        
        {/* Saved Carts List */}
        <div className="space-y-3">
          {savedCarts.map((cart) => (
            <button
              key={cart.id}
              className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-accent hover:shadow-lg active:scale-98 transition-all duration-200"
              data-testid={cart.testId}
            >
              <span className="text-lg font-medium text-gray-800">{cart.name}</span>
              <span className="text-lg font-semibold text-gray-600">{cart.date}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SavedCartsPage;
