import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';
import { useLovedRecipes } from '../context/LovedRecipesContext';
import { loadRecipes } from '../services/recipeService';

const LovedRecipesPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lovedRecipes, setLovedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { lovedRecipeIds } = useLovedRecipes();

  useEffect(() => {
    const fetchLovedRecipes = async () => {
      try {
        setLoading(true);
        const allRecipes = await loadRecipes();
        // Filter recipes by loved IDs
        const loved = allRecipes.filter(recipe => 
          lovedRecipeIds.includes(recipe.RecipeId)
        );
        setLovedRecipes(loved);
      } catch (error) {
        console.error('Error loading loved recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLovedRecipes();
  }, [lovedRecipeIds]);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="loved-recipes-page">
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
            onClick={() => navigate('/')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to home"
            data-testid="back-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <svg className="w-6 h-6 mr-2 fill-current text-red-500" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <h1 className="text-2xl font-bold text-primary">LOVED RECIPES</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading loved recipes...</div>
        ) : lovedRecipes.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 fill-current text-gray-300" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <p className="text-gray-500 text-lg mb-2">No loved recipes yet</p>
            <p className="text-gray-400 text-sm mb-6">
              Browse recipes and tap the heart icon to save your favorites here
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {lovedRecipes.length} {lovedRecipes.length === 1 ? 'recipe' : 'recipes'}
            </div>
            <div className="space-y-4">
              {lovedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.RecipeId}
                  recipeId={recipe.RecipeId}
                  title={recipe.Name}
                  image={recipe.Images && recipe.Images[0]}
                  testId={`loved-recipe-card-${recipe.RecipeId}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default LovedRecipesPage;
