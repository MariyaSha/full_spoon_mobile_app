import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuDrawer from '../components/MenuDrawer';
import RecipeCard from '../components/RecipeCard';
import { useCart } from '../context/CartContext';
import { loadRecipes } from '../services/recipeService';

const CartRecipesPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartRecipes, setCartRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { cartRecipeIds, clearCart } = useCart();

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
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="cart-recipes-page">
      <TopBar 
        onMenuToggle={handleMenuToggle}
        onFilterToggle={() => {}} // Disabled - we'll use custom icons instead
        onLovedClick={() => navigate('/loved-recipes')}
        onCartClick={() => navigate('/cart')}
      />
      
      <MenuDrawer isOpen={isMenuOpen} />
      
      {/* Custom Action Icons Row */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-4">
        {/* Save Cart Icon */}
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
        
        {/* Saved Carts Icon */}
        <button 
          onClick={() => navigate('/saved-carts')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          aria-label="View saved carts"
          data-testid="saved-carts-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        {/* Empty Cart Icon */}
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to empty your cart? This will remove all recipes and ingredients.')) {
              clearCart();
            }
          }}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors active:scale-95 text-red-600"
          aria-label="Empty cart"
          data-testid="empty-cart-button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
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
