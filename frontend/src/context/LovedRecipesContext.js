import React, { createContext, useContext, useState, useEffect } from 'react';

const LovedRecipesContext = createContext();

export const useLovedRecipes = () => {
  const context = useContext(LovedRecipesContext);
  if (!context) {
    throw new Error('useLovedRecipes must be used within LovedRecipesProvider');
  }
  return context;
};

export const LovedRecipesProvider = ({ children }) => {
  const [lovedRecipeIds, setLovedRecipeIds] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('lovedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever lovedRecipeIds changes
  useEffect(() => {
    localStorage.setItem('lovedRecipes', JSON.stringify(lovedRecipeIds));
  }, [lovedRecipeIds]);

  const addLovedRecipe = (recipeId) => {
    setLovedRecipeIds(prev => {
      if (prev.includes(recipeId)) {
        return prev; // Already loved
      }
      return [...prev, recipeId];
    });
  };

  const removeLovedRecipe = (recipeId) => {
    setLovedRecipeIds(prev => prev.filter(id => id !== recipeId));
  };

  const toggleLovedRecipe = (recipeId) => {
    if (lovedRecipeIds.includes(recipeId)) {
      removeLovedRecipe(recipeId);
    } else {
      addLovedRecipe(recipeId);
    }
  };

  const isRecipeLoved = (recipeId) => {
    return lovedRecipeIds.includes(recipeId);
  };

  const value = {
    lovedRecipeIds,
    addLovedRecipe,
    removeLovedRecipe,
    toggleLovedRecipe,
    isRecipeLoved,
  };

  return (
    <LovedRecipesContext.Provider value={value}>
      {children}
    </LovedRecipesContext.Provider>
  );
};
