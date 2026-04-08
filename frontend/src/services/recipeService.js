// Recipe data service for loading and filtering recipes

let recipesCache = null;

/**
 * Load all recipes from the JSON dataset
 */
export const loadRecipes = async () => {
  if (recipesCache) {
    return recipesCache;
  }
  
  try {
    const response = await fetch('/recipes.json');
    const data = await response.json();
    recipesCache = data;
    return data;
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
};

/**
 * Get recipes by category
 */
export const getRecipesByCategory = async (category) => {
  const recipes = await loadRecipes();
  
  switch (category.toLowerCase()) {
    case 'quick':
      return recipes.filter(r => r.is_quick === true);
    case 'low calorie':
    case 'low_calorie':
      return recipes.filter(r => r.is_low_calorie === true);
    case 'no pork':
    case 'no_pork':
      return recipes.filter(r => r.is_pork === false);
    case 'vegetarian':
      return recipes.filter(r => r.is_vegetarian === true);
    case 'dairy free':
    case 'dairy_free':
      return recipes.filter(r => r.is_dairy_free === true);
    case 'all':
    default:
      return recipes;
  }
};

/**
 * Get a single recipe by ID
 */
export const getRecipeById = async (id) => {
  const recipes = await loadRecipes();
  return recipes.find(r => r.RecipeId === parseFloat(id));
};

/**
 * Parse ISO 8601 duration to readable format
 */
export const parseDuration = (duration) => {
  if (!duration) return 'N/A';
  
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return duration;
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
};

/**
 * Format ingredients list with quantities, measurements, and instructions
 */
export const formatIngredients = (quantities, measurements, parts, instructions) => {
  if (!parts) return [];
  
  return parts.map((part, index) => ({
    name: part,
    quantity: quantities && quantities[index] ? quantities[index] : '',
    measurement: measurements && measurements[index] && measurements[index] !== 'None' ? measurements[index] : '',
    instruction: instructions && instructions[index] && instructions[index] !== 'None' ? instructions[index] : ''
  }));
};

/**
 * Get recipe instructions as array
 */
export const getInstructions = (recipe) => {
  if (!recipe.RecipeInstructions) return [];
  return Array.isArray(recipe.RecipeInstructions) 
    ? recipe.RecipeInstructions 
    : [recipe.RecipeInstructions];
};

/**
 * Format calorie count
 */
export const formatCalories = (calories) => {
  if (!calories) return 'N/A';
  return Math.round(calories);
};

/**
 * Get star rating component data
 */
export const getStarRating = (rating) => {
  if (!rating) return { full: 0, empty: 5 };
  const fullStars = Math.round(rating);
  return {
    full: fullStars,
    empty: 5 - fullStars
  };
};
