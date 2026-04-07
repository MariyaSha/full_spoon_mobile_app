import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ image, title, testId, recipeId = '1' }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/recipe/${recipeId}`);
  };
  
  return (
    <button 
      onClick={handleClick}
      className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 active:scale-98"
      data-testid={testId}
    >
      <div className="flex">
        {/* Image Area */}
        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm font-medium">image</span>';
              }}
            />
          ) : (
            <span className="text-gray-400 text-sm font-medium">image</span>
          )}
        </div>
        
        {/* Title Area */}
        <div className="flex-1 p-4 flex items-center text-left">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-3">
            {title}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default RecipeCard;
