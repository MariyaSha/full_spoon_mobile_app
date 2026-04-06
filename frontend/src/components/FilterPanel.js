import React, { useState } from 'react';

const FilterPanel = ({ isOpen, onClose }) => {
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
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        data-testid="filter-backdrop"
      />
      
      {/* Filter Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="filter-panel"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-primary">Filters</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close filters"
              data-testid="filter-close-button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Filter Options */}
          <div className="flex-1 overflow-y-auto py-4">
            {filterOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
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
              className="flex items-center px-6 py-4 w-full text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
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
          
          {/* Apply Button */}
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-orange-600 active:scale-98 transition-all"
              data-testid="filter-apply-button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
