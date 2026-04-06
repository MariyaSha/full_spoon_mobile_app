import React from 'react';

const Homepage = () => {
  const categories = [
    { id: 1, name: 'ALL RECIPES', testId: 'category-all-recipes' },
    { id: 2, name: 'QUICK', testId: 'category-quick' },
    { id: 3, name: 'LOW CALORIE', testId: 'category-low-calorie' },
    { id: 4, name: 'NO PORK', testId: 'category-no-pork' },
    { id: 5, name: 'VEGETARIAN', testId: 'category-vegetarian' },
    { id: 6, name: 'DAIRY FREE', testId: 'category-dairy-free' }
  ];

  return (
    <div className="p-4 pb-8" data-testid="homepage">
      <h2 className="text-2xl font-bold text-primary mb-6">Browse Recipes</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 min-h-[140px] flex items-center justify-center text-center hover:border-accent hover:shadow-lg active:scale-98 transition-all duration-200 group"
            data-testid={category.testId}
          >
            <span className="text-base font-bold text-gray-800 group-hover:text-accent transition-colors leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
