import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    time: [],
    nutrition: [],
    dishType: [],
    cookingMethod: []
  });

  const toggleFilter = (sectionId, filterId) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].includes(filterId)
        ? prev[sectionId].filter(id => id !== filterId)
        : [...prev[sectionId], filterId]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      time: [],
      nutrition: [],
      dishType: [],
      cookingMethod: []
    });
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0);
  };

  // Filter definitions (mapping filter IDs to dataset fields)
  const filterDefinitions = {
    time: {
      '< 15 mins': { tag: '< 15 mins' },
      '< 30 mins': { tag: '< 30 mins' },
      '< 60 mins': { tag: '< 60 mins' },
      '< 4 hours': { tag: '< 4 hours' },
    },
    nutrition: {
      'vegetarian': { boolField: 'is_vegetarian' },
      'vegan': { tag: 'vegan' },
      'dairy-free': { boolField: 'is_dairy_free' },
      'low-cholesterol': { tag: 'low cholesterol' },
      'low-protein': { tag: 'low protein' },
      'low-calorie': { boolField: 'is_low_calorie' },
      'high-protein': { tag: 'high protein' },
      'very-low-carbs': { tag: 'very low carbs' },
      'healthy': { tag: 'healthy' },
    },
    dishType: {
      'dessert': { tag: 'dessert' },
      'breakfast': { tag: 'breakfast' },
      'lunch-snacks': { tag: 'lunch/snacks' },
      'main-dish': { tag: 'one dish meal' },
      'breads': { tag: 'breads' },
      'cookie-brownie': { tag: 'cookie & brownie' },
    },
    cookingMethod: {
      'no-cook': { tag: 'no cook' },
      'oven': { tag: 'oven' },
      'stove-top': { tag: 'stove top' },
      'quick': { boolField: 'is_quick' },
      'easy': { tag: 'easy' },
      'small-appliance': { tag: 'small appliance' },
    }
  };

  // Apply filters to a list of recipes
  const applyFilters = (recipes) => {
    if (getTotalSelectedCount() === 0) {
      return recipes; // No filters selected, return all
    }

    return recipes.filter(recipe => {
      // Check all selected filters - ALL must match (strict AND logic)
      for (const [sectionId, filterIds] of Object.entries(selectedFilters)) {
        if (filterIds.length === 0) continue; // Skip if no filters in this section

        // ALL filters in this section must match (AND logic)
        const allFiltersMatch = filterIds.every(filterId => {
          const filterDef = filterDefinitions[sectionId][filterId];
          if (!filterDef) return false;

          // Check boolean field
          if (filterDef.boolField) {
            return recipe[filterDef.boolField] === true;
          }

          // Check tag
          if (filterDef.tag) {
            const tags = recipe.Tags || [];
            return tags.includes(filterDef.tag);
          }

          return false;
        });

        // If any filter in this section didn't match, exclude recipe
        if (!allFiltersMatch) {
          return false;
        }
      }

      return true; // All filters in all sections matched
    });
  };

  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        toggleFilter,
        clearAllFilters,
        getTotalSelectedCount,
        applyFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
