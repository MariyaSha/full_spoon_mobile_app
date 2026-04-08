import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import { useCart } from '../context/CartContext';

const SaveCartPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartName, setCartName] = useState('');
  const { cartRecipeIds } = useCart();

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSaveCart = () => {
    if (!cartName.trim()) {
      alert('Please enter a cart name');
      return;
    }

    if (cartRecipeIds.length === 0) {
      alert('Your cart is empty. Add recipes before saving.');
      return;
    }

    // Get existing saved carts from localStorage
    const savedCartsJson = localStorage.getItem('savedCarts');
    const savedCarts = savedCartsJson ? JSON.parse(savedCartsJson) : [];

    // Create new saved cart object
    const newSavedCart = {
      id: Date.now(), // Use timestamp as unique ID
      name: cartName.trim(),
      recipeIds: [...cartRecipeIds], // Save current cart recipe IDs
      savedAt: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '.')
    };

    // Add to saved carts array
    savedCarts.push(newSavedCart);

    // Save back to localStorage
    localStorage.setItem('savedCarts', JSON.stringify(savedCarts));

    // Navigate to saved carts page
    navigate('/saved-carts');
  };

  return (
    <div className="min-h-screen bg-white" data-testid="save-cart-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={() => navigate('/loved-recipes')}
        onCartClick={() => navigate('/cart')}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      <main className="p-4 pb-8">
        <div className="flex items-center mb-8">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <h1 className="text-2xl font-bold text-primary">SAVE CART</h1>
        </div>
        
        {/* Save Cart Form */}
        <div className="space-y-6">
          <div>
            <label 
              htmlFor="cart-name" 
              className="block text-lg font-medium text-gray-700 mb-3"
              data-testid="cart-name-label"
            >
              choose cart name
            </label>
            <input
              id="cart-name"
              type="text"
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
              placeholder="game night"
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-colors"
              data-testid="cart-name-input"
            />
          </div>
          
          {/* Save Button */}
          <button
            onClick={handleSaveCart}
            className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 active:scale-98 transition-all"
            data-testid="save-button"
          >
            Save Cart
          </button>
        </div>
      </main>
    </div>
  );
};

export default SaveCartPage;
