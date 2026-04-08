import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartRecipeIds, setCartRecipeIds] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('cartRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cartRecipeIds changes
  useEffect(() => {
    localStorage.setItem('cartRecipes', JSON.stringify(cartRecipeIds));
  }, [cartRecipeIds]);

  const addToCart = (recipeId) => {
    setCartRecipeIds(prev => {
      if (prev.includes(recipeId)) {
        return prev; // Already in cart
      }
      return [...prev, recipeId];
    });
  };

  const removeFromCart = (recipeId) => {
    setCartRecipeIds(prev => prev.filter(id => id !== recipeId));
  };

  const toggleCart = (recipeId) => {
    if (cartRecipeIds.includes(recipeId)) {
      removeFromCart(recipeId);
    } else {
      addToCart(recipeId);
    }
  };

  const isInCart = (recipeId) => {
    return cartRecipeIds.includes(recipeId);
  };

  const clearCart = () => {
    setCartRecipeIds([]);
  };

  const value = {
    cartRecipeIds,
    addToCart,
    removeFromCart,
    toggleCart,
    isInCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
