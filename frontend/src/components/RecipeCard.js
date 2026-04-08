import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipeId, title, image, testId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all duration-200 active:scale-98"
      data-testid={testId}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-cover rounded-lg mr-4 flex-shrink-0"
        />
      )}
      <h3 className="text-left text-lg font-medium text-gray-800 dark:text-gray-100 flex-1">
        {title}
      </h3>
    </button>
  );
};

export default RecipeCard;
