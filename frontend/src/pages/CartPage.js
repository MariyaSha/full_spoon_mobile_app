import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import { useCart } from '../context/CartContext';
import { loadRecipes, formatIngredients } from '../services/recipeService';

const CartPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [aggregatedIngredients, setAggregatedIngredients] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(true);
  
  const { cartRecipeIds } = useCart();

  // Helper function to convert Unicode fractions and mixed numbers to decimals
  const parseQuantity = (quantityStr) => {
    if (!quantityStr) return 0;
    
    // Convert to string in case it's not
    const str = String(quantityStr).trim();
    
    // Unicode fraction map
    const fractionMap = {
      '¼': 0.25,
      '½': 0.5,
      '¾': 0.75,
      '⅐': 0.142857,
      '⅑': 0.111111,
      '⅒': 0.1,
      '⅓': 0.333333,
      '⅔': 0.666667,
      '⅕': 0.2,
      '⅖': 0.4,
      '⅗': 0.6,
      '⅘': 0.8,
      '⅙': 0.166667,
      '⅚': 0.833333,
      '⅛': 0.125,
      '⅜': 0.375,
      '⅝': 0.625,
      '⅞': 0.875
    };
    
    // Check if it's a pure Unicode fraction
    if (fractionMap[str]) {
      return fractionMap[str];
    }
    
    // Check for mixed numbers like "1 ½" or "2¼"
    const mixedMatch = str.match(/^(\d+)\s*(¼|½|¾|⅐|⅑|⅒|⅓|⅔|⅕|⅖|⅗|⅘|⅙|⅚|⅛|⅜|⅝|⅞)?$/);
    if (mixedMatch) {
      const whole = parseInt(mixedMatch[1], 10);
      const fraction = mixedMatch[2] ? fractionMap[mixedMatch[2]] : 0;
      return whole + fraction;
    }
    
    // Try standard parseFloat
    const parsed = parseFloat(str);
    if (!isNaN(parsed)) {
      return parsed;
    }
    
    // Return original string if cannot parse
    return str;
  };

  // Helper function to normalize measurement units (handle plural/singular)
  const normalizeMeasurement = (measurement) => {
    if (!measurement) return '';
    
    let normalized = measurement.toLowerCase().trim();
    
    // Convert common plural forms to singular
    const pluralMap = {
      'cups': 'cup',
      'tablespoons': 'tablespoon',
      'teaspoons': 'teaspoon',
      'ounces': 'ounce',
      'pounds': 'pound',
      'grams': 'gram',
      'kilograms': 'kilogram',
      'milliliters': 'milliliter',
      'liters': 'liter',
      'cloves': 'clove',
      'stalks': 'stalk',
      'slices': 'slice',
      'pieces': 'piece',
      'pinches': 'pinch',
      'dashes': 'dash',
      'cans': 'can',
      'packages': 'package',
      'bunches': 'bunch'
    };
    
    // Check if the measurement ends with any plural form and convert to singular
    for (const [plural, singular] of Object.entries(pluralMap)) {
      if (normalized === plural) {
        return singular;
      }
    }
    
    return normalized;
  };

  // Aggregate ingredients from all cart recipes
  useEffect(() => {
    const aggregateIngredients = async () => {
      try {
        setLoading(true);
        
        if (cartRecipeIds.length === 0) {
          setAggregatedIngredients([]);
          setCheckedItems({});
          setLoading(false);
          return;
        }
        
        // Load all recipes
        const allRecipes = await loadRecipes();
        
        // Filter to only cart recipes
        const cartRecipes = allRecipes.filter(recipe => 
          cartRecipeIds.includes(recipe.RecipeId)
        );
        
        // Extract ingredients from all recipes
        const ingredientMap = {};
        
        cartRecipes.forEach(recipe => {
          const ingredients = formatIngredients(
            recipe.RecipeIngredientQuantities,
            recipe.RecipeIngredientMeasurements,
            recipe.RecipeIngredientParts,
            recipe.RecipeIngredientInstructions
          );
          
          ingredients.forEach(ingredient => {
            // Skip if no name
            if (!ingredient.name) return;
            
            // Normalize ingredient name (lowercase, trim)
            const normalizedName = ingredient.name.toLowerCase().trim();
            
            // Normalize measurement (lowercase, trim, plurals to singular)
            const normalizedMeasurement = normalizeMeasurement(ingredient.measurement);
            
            // Parse quantity using our Unicode fraction converter
            const quantity = parseQuantity(ingredient.quantity);
            
            // Create unique key: name + measurement unit
            // This ensures we only combine ingredients with matching name AND unit
            const key = `${normalizedName}|${normalizedMeasurement}`;
            
            if (ingredientMap[key]) {
              // Ingredient with same name and unit exists - combine quantities
              if (typeof quantity === 'number' && typeof ingredientMap[key].quantity === 'number') {
                ingredientMap[key].quantity += quantity;
              } else {
                // If we can't parse as numbers, keep as separate (shouldn't happen often)
                const newKey = `${key}|${Date.now()}`;
                ingredientMap[newKey] = {
                  name: ingredient.name,
                  quantity: ingredient.quantity,
                  measurement: ingredient.measurement
                };
              }
            } else {
              // New ingredient
              ingredientMap[key] = {
                name: ingredient.name,
                quantity: quantity,
                measurement: normalizedMeasurement
              };
            }
          });
        });
        
        // Convert map to array and format for display
        const ingredientList = Object.keys(ingredientMap).map((key, index) => {
          const ingredient = ingredientMap[key];
          const displayQuantity = typeof ingredient.quantity === 'number' 
            ? ingredient.quantity.toString()
            : ingredient.quantity;
          const displayMeasurement = ingredient.measurement || '';
          
          return {
            id: `ingredient-${index}`,
            name: ingredient.name.toUpperCase(),
            quantity: `${displayQuantity}${displayMeasurement ? ' ' + displayMeasurement.toUpperCase() : ''}`.trim(),
            testId: `cart-item-${index}`
          };
        });
        
        // Sort alphabetically by name
        ingredientList.sort((a, b) => a.name.localeCompare(b.name));
        
        setAggregatedIngredients(ingredientList);
        
        // Initialize checked state for all ingredients
        const initialCheckedState = {};
        ingredientList.forEach(item => {
          initialCheckedState[item.id] = false;
        });
        setCheckedItems(initialCheckedState);
        
      } catch (error) {
        console.error('Error aggregating ingredients:', error);
      } finally {
        setLoading(false);
      }
    };
    
    aggregateIngredients();
  }, [cartRecipeIds]);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="min-h-screen bg-white" data-testid="cart-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={handleFilterToggle}
        onLovedClick={() => navigate('/loved-recipes')}
        onCartClick={() => navigate('/cart')}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      <FilterPanel isOpen={isFilterOpen} />
      
      {/* Action Icons Row */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-4">
        {/* Save Icon */}
        <button 
          onClick={() => navigate('/save-cart')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          aria-label="Save cart"
          data-testid="save-cart-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
        
        {/* Refresh Icon */}
        <button 
          onClick={() => navigate('/saved-carts')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          aria-label="View saved carts"
          data-testid="refresh-cart-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <main className="p-4 pb-8">
        {/* Shopping Checklist */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading ingredients...</div>
        ) : aggregatedIngredients.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-sm mb-6">
              Add recipes to your cart to generate a shopping list
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {aggregatedIngredients.map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer transition-colors"
                data-testid={`${item.testId}-label`}
              >
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-6 h-6 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 cursor-pointer"
                    data-testid={item.testId}
                  />
                  <span className="ml-4 text-lg font-medium text-gray-800">{item.name}</span>
                </div>
                <span className="text-lg font-semibold text-gray-700">{item.quantity}</span>
              </label>
            ))}
          </div>
        )}
        
        {/* Cart Recipes Section - Tappable */}
        <button
          onClick={() => navigate('/cart-recipes')}
          className="w-full mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl hover:border-accent hover:shadow-lg active:scale-98 transition-all duration-200"
          data-testid="cart-recipes-button"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xl font-bold text-gray-800">CART RECIPES</span>
          </div>
        </button>
      </main>
    </div>
  );
};

export default CartPage;
