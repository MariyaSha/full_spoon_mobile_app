import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';

const RecipeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const ingredients = [
    { name: 'FLOUR', quantity: '1 KG' },
    { name: 'CHICKEN', quantity: '500 G' },
    { name: 'MILK', quantity: '2 L' }
  ];

  // Placeholder images (3 for carousel demonstration)
  const totalImages = 3;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

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
            RECIPE TITLE
          </h1>
        </div>
        
        {/* Image Carousel */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center border-b border-gray-200" data-testid="image-carousel">
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
          
          <div className="text-center">
            <span className="text-gray-400 text-lg font-medium">images</span>
            <div className="mt-2 text-sm text-gray-500">{currentImageIndex + 1} / {totalImages}</div>
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
        </div>
        
        {/* Time Info */}
        <div className="flex items-center justify-center space-x-8 py-4 bg-gray-50 border-b border-gray-200" data-testid="time-info">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base font-medium text-gray-700">prep</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base font-medium text-gray-700">total</span>
          </div>
        </div>
        
        {/* Description Area */}
        <div className="px-4 py-6 border-b border-gray-200" data-testid="description-area">
          <h2 className="text-xl font-bold text-gray-800 mb-3">DESCRIPTION AREA</h2>
          <p className="text-gray-600 leading-relaxed">
            Placeholder description text will appear here when connected to the dataset.
          </p>
        </div>
        
        {/* Ingredients Area */}
        <div className="px-4 py-6 border-b border-gray-200" data-testid="ingredients-area">
          <h2 className="text-xl font-bold text-gray-800 mb-4">INGREDIENTS AREA</h2>
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2"
                data-testid={`ingredient-${index}`}
              >
                <span className="text-lg font-medium text-gray-800">{ingredient.name}</span>
                <span className="text-lg font-semibold text-gray-700">{ingredient.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Instructions Area */}
        <div className="px-4 py-6 border-b border-gray-200" data-testid="instructions-area">
          <h2 className="text-xl font-bold text-gray-800 mb-3">INSTRUCTIONS AREA</h2>
          <p className="text-gray-600 leading-relaxed">
            Placeholder instructions text will appear here when connected to the dataset.
          </p>
        </div>
        
        {/* Calories */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="calories-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">CALORIES</span>
            <span className="text-lg font-semibold text-gray-700">---</span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="rating-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">RATING</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>
        
        {/* Review Count */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="review-count-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">REVIEW COUNT</span>
            <span className="text-lg font-semibold text-gray-700">---</span>
          </div>
        </div>
        
        {/* Servings */}
        <div className="px-4 py-4 border-b border-gray-200" data-testid="servings-section">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">SERVINGS</span>
            <span className="text-lg font-semibold text-gray-700">---</span>
          </div>
        </div>
        
        {/* Everything Else Placeholder */}
        <div className="px-4 py-6 bg-gray-50" data-testid="everything-else-section">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">EVERYTHING ELSE</h2>
          <p className="text-sm text-gray-500 text-center">
            Additional recipe metadata will appear here when connected to the dataset
          </p>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetailPage;
