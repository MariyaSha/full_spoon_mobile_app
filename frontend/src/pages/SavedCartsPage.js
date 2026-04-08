import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import { useCart } from '../context/CartContext';

const SavedCartsPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedCarts, setSavedCarts] = useState([]);
  const { addToCart, clearCart } = useCart();

  // Load saved carts from localStorage
  useEffect(() => {
    const savedCartsJson = localStorage.getItem('savedCarts');
    if (savedCartsJson) {
      const carts = JSON.parse(savedCartsJson);
      // Sort by savedAt date (newest first)
      carts.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
      setSavedCarts(carts);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleLoadCart = (cart) => {
    // Clear current cart
    clearCart();
    
    // Load saved cart recipe IDs
    cart.recipeIds.forEach(recipeId => {
      addToCart(recipeId);
    });
    
    // Navigate to cart page to show loaded cart
    navigate('/cart');
  };

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
        {savedCarts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">No saved carts yet</p>
            <p className="text-gray-400 text-sm mb-6">
              Save your cart from the cart page to access it later
            </p>
            <button
              onClick={() => navigate('/cart')}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Go to Cart
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedCarts.map((cart, index) => (
              <button
                key={cart.id}
                onClick={() => handleLoadCart(cart)}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-accent hover:shadow-lg active:scale-98 transition-all duration-200"
                data-testid={`saved-cart-${index}`}
              >
                <span className="text-lg font-medium text-gray-800">{cart.name}</span>
                <span className="text-lg font-semibold text-gray-600">{cart.displayDate}</span>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedCartsPage;
