import React from 'react';

const TopBar = ({ onMenuToggle, onFilterToggle, onLovedClick, onCartClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Logo and Icons Row */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary" data-testid="logo-text">FULL SPOON</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Heart Icon */}
          <button 
            onClick={onLovedClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            aria-label="Loved recipes"
            data-testid="heart-icon-button"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          
          {/* Cart Icon */}
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 relative"
            aria-label="Shopping cart"
            data-testid="cart-icon-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Filter and Menu Row */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        {/* Filter Icon */}
        <button 
          onClick={onFilterToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95 flex items-center space-x-2"
          aria-label="Filter recipes"
          data-testid="filter-toggle-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        
        {/* Menu Hamburger Icon */}
        <button 
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          aria-label="Open menu"
          data-testid="menu-toggle-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
