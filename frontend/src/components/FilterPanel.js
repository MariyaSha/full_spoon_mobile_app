import React, { useState } from 'react';

const FilterPanel = ({ isOpen }) => {
  const [filters, setFilters] = useState({
    lowProtein: false,
    lowCholesterol: false,
    smoothies: false,
    noCook: false,
    oven: false,
    dessert: false
  });

  const filterOptions = [
    { id: 'lowProtein', label: 'low protein', testId: 'filter-low-protein' },
    { id: 'lowCholesterol', label: 'low cholesterol', testId: 'filter-low-cholesterol' },
    { id: 'smoothies', label: 'smoothies', testId: 'filter-smoothies' },
    { id: 'noCook', label: 'no cook', testId: 'filter-no-cook' },
    { id: 'oven', label: 'oven', testId: 'filter-oven' },
    { id: 'dessert', label: 'dessert', testId: 'filter-dessert' }
  ];

  const handleCheckboxChange = (id) => {
    setFilters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-200 ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}
      data-testid="filter-panel"
    >
      <div className="py-2">
        {filterOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
            data-testid={`${option.testId}-label`}
          >
            <input
              type="checkbox"
              checked={filters[option.id]}
              onChange={() => handleCheckboxChange(option.id)}
              className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 cursor-pointer"
              data-testid={option.testId}
            />
            <span className="ml-3 text-base text-gray-800">{option.label}</span>
          </label>
        ))}
        
        {/* More Tags Option */}
        <button
          className="flex items-center px-6 py-3 w-full text-left hover:bg-gray-50 transition-colors"
          data-testid="filter-more-tags"
        >
          <div className="w-5 h-5 border-2 border-gray-300 rounded mr-3 flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-base text-gray-600">more tags...</span>
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
