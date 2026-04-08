import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';
import { getRecipesByCategory } from '../services/recipeService';

const QuickRecipesPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const quickRecipes = await getRecipesByCategory('quick');
        setRecipes(quickRecipes);
      } catch (error) {
        console.error('Error loading quick recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, []);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="quick-recipes-page">
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
          <h1 className="text-2xl font-bold text-primary">QUICK RECIPES</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading recipes...</div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {recipes.length} recipes found
            </div>
            <div className="space-y-4">
              {recipes.slice(0, 50).map((recipe) => (
                <RecipeCard
                  key={recipe.RecipeId}
                  recipeId={recipe.RecipeId}
                  title={recipe.Name}
                  image={recipe.Images && recipe.Images[0]}
                  testId={`recipe-card-${recipe.RecipeId}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default QuickRecipesPage;
