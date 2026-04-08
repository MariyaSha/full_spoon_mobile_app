import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';
import { getRecipesByCategory } from '../services/recipeService';
import { useFilters } from '../context/FilterContext';

const CategoryPage = ({ category, title }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [baseRecipes, setBaseRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { applyFilters } = useFilters();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const categoryRecipes = await getRecipesByCategory(category);
        setBaseRecipes(categoryRecipes);
      } catch (error) {
        console.error(`Error loading ${category} recipes:`, error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, [category]);

  useEffect(() => {
    const filtered = applyFilters(baseRecipes);
    setFilteredRecipes(filtered);
  }, [baseRecipes, applyFilters]);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors" data-testid="category-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={() => navigate('/loved-recipes')}
        onCartClick={() => navigate('/cart')}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      <main className="p-4 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          data-testid="back-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-2xl font-bold text-primary dark:text-white mb-4">{title}</h1>

        {loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading recipes...</div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredRecipes.length} recipes found
            </div>
            <div className="space-y-4">
              {filteredRecipes.slice(0, 50).map((recipe) => (
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

export default CategoryPage;
