import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';
import { useCart } from '../context/CartContext';
import { loadRecipes } from '../services/recipeService';

const CartRecipesPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartRecipes, setCartRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { cartRecipeIds } = useCart();

  useEffect(() => {
    const fetchCartRecipes = async () => {
      try {
        setLoading(true);
        const allRecipes = await loadRecipes();
        // Filter recipes by cart IDs
        const cart = allRecipes.filter(recipe => 
          cartRecipeIds.includes(recipe.RecipeId)
        );
        setCartRecipes(cart);
      } catch (error) {
        console.error('Error loading cart recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCartRecipes();
  }, [cartRecipeIds]);

  const handleMenuToggle = () => {
    setIsFilterOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterToggle = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="cart-recipes-page">
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
            onClick={() => navigate('/cart')}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to cart"
            data-testid="back-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-primary">CART RECIPES</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading cart recipes...</div>
        ) : cartRecipes.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-sm mb-6">
              Browse recipes and tap the cart icon to add them here
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
              {cartRecipes.length} {cartRecipes.length === 1 ? 'recipe' : 'recipes'} in cart
            </div>
            <div className="space-y-4">
              {cartRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.RecipeId}
                  recipeId={recipe.RecipeId}
                  title={recipe.Name}
                  image={recipe.Images && recipe.Images[0]}
                  testId={`cart-recipe-card-${recipe.RecipeId}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartRecipesPage;
