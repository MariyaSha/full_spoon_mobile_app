import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';

const CartPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    flour: false,
    chicken: false,
    milk: false,
    potatoe: false,
    onion: false,
    sugar: false
  });

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const cartItems = [
    { id: 'flour', name: 'FLOUR', quantity: '1 KG', testId: 'cart-item-flour' },
    { id: 'chicken', name: 'CHICKEN', quantity: '500 G', testId: 'cart-item-chicken' },
    { id: 'milk', name: 'MILK', quantity: '2 L', testId: 'cart-item-milk' },
    { id: 'potatoe', name: 'POTATOE', quantity: '400 G', testId: 'cart-item-potatoe' },
    { id: 'onion', name: 'ONION', quantity: '300 G', testId: 'cart-item-onion' },
    { id: 'sugar', name: 'SUGAR', quantity: '150 G', testId: 'cart-item-sugar' }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="cart-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={() => navigate('/loved-recipes')}
        onCartClick={() => navigate('/cart')}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      {/* Action Icons Row */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-4">
        {/* Save Icon */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          aria-label="Save cart"
          data-testid="save-cart-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
        
        {/* Refresh Icon */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          aria-label="Refresh cart"
          data-testid="refresh-cart-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <main className="p-4 pb-8">
        {/* Shopping Checklist */}
        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer transition-colors"
              data-testid={`${item.testId}-label`}
            >
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id]}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="w-6 h-6 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 cursor-pointer"
                  data-testid={item.testId}
                />
                <span className="ml-4 text-lg font-medium text-gray-800">{item.name}</span>
              </div>
              <span className="text-lg font-semibold text-gray-700">{item.quantity}</span>
            </label>
          ))}
        </div>
        
        {/* Cart Recipes Section - Tappable */}
        <button
          onClick={() => navigate('/cart-recipes')}
          className="w-full mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl hover:border-accent hover:shadow-lg active:scale-98 transition-all duration-200"
          data-testid="cart-recipes-button"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xl font-bold text-gray-800">CART RECIPES</span>
          </div>
        </button>
      </main>
    </div>
  );
};

export default CartPage;
