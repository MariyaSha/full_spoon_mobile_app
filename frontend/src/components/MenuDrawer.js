import React from 'react';

const MenuDrawer = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Categories', testId: 'menu-categories' },
    { label: 'Loved Recipes', testId: 'menu-loved-recipes' },
    { label: 'Cart', testId: 'menu-cart' },
    { label: 'Saved Carts', testId: 'menu-saved-carts' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        data-testid="menu-backdrop"
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="menu-drawer"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-primary">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
              data-testid="menu-close-button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 py-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-6 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
                data-testid={item.testId}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;
