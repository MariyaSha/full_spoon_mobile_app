import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';

const QuickRecipesPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const placeholderRecipes = [
    { id: 1, title: 'Placeholder Recipe Title 1', testId: 'recipe-card-1' },
    { id: 2, title: 'Placeholder Recipe Title 2', testId: 'recipe-card-2' },
    { id: 3, title: 'Placeholder Recipe Title 3', testId: 'recipe-card-3' }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="quick-recipes-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={() => navigate('/loved-recipes')}
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
        
        <div className="space-y-4">
          {placeholderRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              testId={recipe.testId}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default QuickRecipesPage;
