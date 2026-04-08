import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuDrawer = ({ isOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Main Categories', path: '/', testId: 'menu-main-categories' },
    { label: 'Loved Recipes', path: '/loved-recipes', testId: 'menu-loved-recipes' },
    { label: 'Cart Ingredients', path: '/cart', testId: 'menu-cart-ingredients' },
    { label: 'Cart Recipes', path: '/cart-recipes', testId: 'menu-cart-recipes' },
    { label: 'Saved Carts', path: '/saved-carts', testId: 'menu-saved-carts' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
      data-testid="menu-drawer"
    >
      <nav className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="w-full text-left px-6 py-4 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
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
