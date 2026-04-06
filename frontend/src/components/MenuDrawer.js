import React from 'react';

const MenuDrawer = ({ isOpen }) => {
  const menuItems = [
    { label: 'Categories', testId: 'menu-categories' },
    { label: 'Loved Recipes', testId: 'menu-loved-recipes' },
    { label: 'Cart', testId: 'menu-cart' },
    { label: 'Saved Carts', testId: 'menu-saved-carts' }
  ];

  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-200 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
      data-testid="menu-drawer"
    >
      <nav className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full text-left px-6 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
            data-testid={item.testId}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MenuDrawer;
