import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import { 
  getRecipeById, 
  parseDuration, 
  formatIngredients, 
  getInstructions,
  formatCalories,
  getStarRating
} from '../services/recipeService';

const RecipeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipe();
  }, [id]);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const handlePrevImage = () => {
    if (!recipe || !recipe.Images) return;
    setCurrentImageIndex((prev) => (prev === 0 ? recipe.Images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!recipe || !recipe.Images) return;
    setCurrentImageIndex((prev) => (prev === recipe.Images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Recipe not found</div>
      </div>
    );
  }

  const ingredients = formatIngredients(
    recipe.RecipeIngredientQuantities, 
    recipe.RecipeIngredientMeasurements,
    recipe.RecipeIngredientParts,
    recipe.RecipeIngredientInstructions
  );
  const instructions = getInstructions(recipe);
  const totalImages = recipe.Images ? recipe.Images.length : 0;
  const starRating = getStarRating(recipe.AggregatedRating);

  return (
    <div className="min-h-screen bg-white" data-testid="recipe-detail-page">
      {/* Custom Top Bar for Recipe Detail */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        {/* Logo and Icons Row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary" data-testid="logo-text">FULL SPOON</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Heart Icon */}
            <button 
              onClick={() => navigate('/loved-recipes')}
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
              onClick={() => navigate('/cart')}
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
        
        {/* Filter and Menu Row with Save To */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {/* Heart Icon (duplicate for second row) */}
            <button 
              onClick={() => navigate('/loved-recipes')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
              aria-label="Add to loved"
              data-testid="add-to-loved-button"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            
            {/* Cart Icon (duplicate for second row) */}
            <button 
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
              aria-label="Add to cart"
              data-testid="add-to-cart-button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            
            {/* Save To Label */}
            <span className="text-base font-medium text-gray-700" data-testid="save-to-label">save to</span>
          </div>
          
          {/* Menu Hamburger Icon */}
          <button 
            onClick={handleMenuToggle}
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
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      <main className="pb-8">
        {/* Recipe Title */}
        <div className="px-4 py-4 border-b border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="mb-2 p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex"
            aria-label="Go back"
            data-testid="back-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-primary" data-testid="recipe-title">
            {recipe.Name}
          </h1>
        </div>
        
        {/* Image Carousel */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center border-b border-gray-200" data-testid="image-carousel">
          {totalImages > 0 ? (
            <>
              <img 
                src={recipe.Images[currentImageIndex]} 
                alt={recipe.Name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {totalImages > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 p-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all active:scale-95"
                    aria-label="Previous image"
                    data-testid="prev-image-button"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {totalImages}
                  </div>
                  
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 p-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all active:scale-95"
                    aria-label="Next image"
                    data-testid="next-image-button"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-center">
              <span className="text-gray-400 text-lg font-medium">No images available</span>
            </div>
          )}
        </div>
        
        {/* Time Info */}
        <div className="flex items-center justify-center space-x-8 py-4 bg-gray-50 border-b border-gray-200" data-testid="time-info">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base font-medium text-gray-700">
              prep: {parseDuration(recipe.PrepTime)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base font-medium text-gray-700">
              total: {parseDuration(recipe.TotalTime)}
            </span>
          </div>
        </div>
        
        {/* Description Area */}
        <div className="px-4 py-6 border-b border-gray-200" data-testid="description-area">
          <h2 className="text-xl font-bold text-gray-800 mb-3">DESCRIPTION</h2>
          <p className="text-gray-600 leading-relaxed">
            {recipe.Description || 'No description available'}
          </p>
        </div>
        
        {/* Ingredients Area */}
        <div className="px-4 py-6 border-b border-gray-200" data-testid="ingredients-area">
          <h2 className="text-xl font-bold text-gray-800 mb-4">INGREDIENTS</h2>
          <div className="space-y-3">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between py-2"
                  data-testid={`ingredient-${index}`}
                >
                  <div className="flex-1">
                    <span className="text-base font-medium text-gray-800 capitalize">
                      {ingredient.name}
                    </span>
                    {ingredient.instruction && (
                      <span className="text-sm text-gray-600 italic ml-2">
                        ({ingredient.instruction})
                      </span>
                    )}
                  </div>
                  <div className="text-base font-semibold text-gray-700 ml-4 text-right whitespace-nowrap">
                    {ingredient.quantity && (
                      <>
                        {ingredient.quantity}
                        {ingredient.measurement && ` ${ingredient.measurement}`}
                      </>
                    )}
                    {!ingredient.quantity && '—'}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No ingredients listed</p>
            )}
          </div>
        </div>
        
        {/* Instructions Area */}
        <div className="px-4 py-6 border-b border-gray-200" data-testid="instructions-area">
          <h2 className="text-xl font-bold text-gray-800 mb-4">INSTRUCTIONS</h2>
          {instructions.length > 0 ? (
            <ol className="space-y-4">
              {instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="text-accent font-bold mr-3 flex-shrink-0">{index + 1}.</span>
                  <span className="text-gray-600 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No instructions available</p>
          )}
        </div>
        
        {/* Calories */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="calories-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">CALORIES</span>
            <span className="text-lg font-semibold text-gray-700">
              {formatCalories(recipe.Calories)} kcal
            </span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="rating-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">RATING</span>
            <div className="flex items-center space-x-1">
              {[...Array(starRating.full)].map((_, i) => (
                <svg key={`full-${i}`} className="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
              {[...Array(starRating.empty)].map((_, i) => (
                <svg key={`empty-${i}`} className="w-6 h-6 fill-current text-gray-300" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
              {recipe.AggregatedRating && (
                <span className="ml-2 text-sm text-gray-600">({recipe.AggregatedRating.toFixed(1)})</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Review Count */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="review-count-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">REVIEW COUNT</span>
            <span className="text-lg font-semibold text-gray-700">
              {recipe.ReviewCount ? Math.round(recipe.ReviewCount) : 0} reviews
            </span>
          </div>
        </div>
        
        {/* Servings */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="servings-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">SERVINGS</span>
            <span className="text-lg font-semibold text-gray-700">
              {recipe.RecipeServings ? Math.round(recipe.RecipeServings) : 'N/A'}
            </span>
          </div>
        </div>
        
        {/* Everything Else - Additional Nutrition Info */}
        <div className="px-4 py-6 bg-gray-50" data-testid="everything-else-section">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">NUTRITION FACTS</h2>
          <div className="grid grid-cols-2 gap-4">
            {recipe.FatContent && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Fat</div>
                <div className="text-base font-semibold text-gray-800">{recipe.FatContent.toFixed(1)}g</div>
              </div>
            )}
            {recipe.ProteinContent && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Protein</div>
                <div className="text-base font-semibold text-gray-800">{recipe.ProteinContent.toFixed(1)}g</div>
              </div>
            )}
            {recipe.CarbohydrateContent && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="text-base font-semibold text-gray-800">{recipe.CarbohydrateContent.toFixed(1)}g</div>
              </div>
            )}
            {recipe.SugarContent && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Sugar</div>
                <div className="text-base font-semibold text-gray-800">{recipe.SugarContent.toFixed(1)}g</div>
              </div>
            )}
            {recipe.FiberContent && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Fiber</div>
                <div className="text-base font-semibold text-gray-800">{recipe.FiberContent.toFixed(1)}g</div>
              </div>
            )}
            {recipe.SodiumContent && (
              <div className="text-center">
                <div className="text-sm text-gray-500">Sodium</div>
                <div className="text-base font-semibold text-gray-800">{recipe.SodiumContent.toFixed(1)}mg</div>
              </div>
            )}
          </div>
          
          {recipe.Tags && recipe.Tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-gray-700 mb-2">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.Tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipeDetailPage;
