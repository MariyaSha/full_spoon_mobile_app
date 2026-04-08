import React, { useState } from 'react';

const FilterPanel = ({ isOpen }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    time: [],
    nutrition: [],
    dishType: [],
    cookingMethod: []
  });

  // Filter sections with options derived from dataset analysis
  const filterSections = [
    {
      id: 'time',
      title: 'Time',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      options: [
        { id: '< 15 mins', label: 'Less than 15 minutes', tag: '< 15 mins' },
        { id: '< 30 mins', label: 'Less than 30 minutes', tag: '< 30 mins' },
        { id: '< 60 mins', label: 'Less than 60 minutes', tag: '< 60 mins' },
        { id: '< 4 hours', label: 'Less than 4 hours', tag: '< 4 hours' },
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrition / Dietary',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      options: [
        { id: 'vegetarian', label: 'Vegetarian', boolField: 'is_vegetarian' },
        { id: 'vegan', label: 'Vegan', tag: 'vegan' },
        { id: 'dairy-free', label: 'Dairy Free', boolField: 'is_dairy_free' },
        { id: 'low-cholesterol', label: 'Low Cholesterol', tag: 'low cholesterol' },
        { id: 'low-protein', label: 'Low Protein', tag: 'low protein' },
        { id: 'low-calorie', label: 'Low Calorie', boolField: 'is_low_calorie' },
        { id: 'high-protein', label: 'High Protein', tag: 'high protein' },
        { id: 'very-low-carbs', label: 'Very Low Carbs', tag: 'very low carbs' },
        { id: 'healthy', label: 'Healthy', tag: 'healthy' },
      ]
    },
    {
      id: 'dishType',
      title: 'Dish Type',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      options: [
        { id: 'dessert', label: 'Dessert', tag: 'dessert' },
        { id: 'breakfast', label: 'Breakfast', tag: 'breakfast' },
        { id: 'lunch-snacks', label: 'Lunch / Snacks', tag: 'lunch/snacks' },
        { id: 'main-dish', label: 'Main Dish', tag: 'one dish meal' },
        { id: 'breads', label: 'Breads', tag: 'breads' },
        { id: 'cookie-brownie', label: 'Cookies & Brownies', tag: 'cookie & brownie' },
      ]
    },
    {
      id: 'cookingMethod',
      title: 'Cooking Method',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      options: [
        { id: 'no-cook', label: 'No Cook', tag: 'no cook' },
        { id: 'oven', label: 'Oven', tag: 'oven' },
        { id: 'stove-top', label: 'Stove Top', tag: 'stove top' },
        { id: 'quick', label: 'Quick & Easy', boolField: 'is_quick' },
        { id: 'easy', label: 'Easy', tag: 'easy' },
        { id: 'small-appliance', label: 'Small Appliance', tag: 'small appliance' },
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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

  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-200 ${
        isOpen ? 'max-h-[600px] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
      }`}
      data-testid="filter-panel"
    >
      <div className="py-2">
        {/* Clear Filters Button */}
        <button
          onClick={clearAllFilters}
          className="flex items-center justify-between px-6 py-3 w-full hover:bg-gray-50 transition-colors border-b-2 border-gray-300"
          data-testid="clear-filters-button"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-base font-semibold text-gray-800">Clear All Filters</span>
          </div>
          {getTotalSelectedCount() > 0 && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {getTotalSelectedCount()}
            </span>
          )}
        </button>

        {/* Filter Sections */}
        {filterSections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const selectedCount = selectedFilters[section.id].length;

          return (
            <div key={section.id} className="border-b border-gray-200">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between px-6 py-3 w-full hover:bg-gray-50 transition-colors"
                data-testid={`filter-section-${section.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-600">
                    {section.icon}
                  </div>
                  <span className="text-base font-medium text-gray-800">{section.title}</span>
                  {selectedCount > 0 && (
                    <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                      {selectedCount}
                    </span>
                  )}
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Section Options */}
              <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[400px]' : 'max-h-0'}`}>
                <div className="bg-gray-50 py-2">
                  {section.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center px-10 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      data-testid={`filter-${section.id}-${option.id}-label`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters[section.id].includes(option.id)}
                        onChange={() => toggleFilter(section.id, option.id)}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 cursor-pointer"
                        data-testid={`filter-${section.id}-${option.id}`}
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
