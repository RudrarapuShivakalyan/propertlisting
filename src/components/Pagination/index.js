import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  
  // Create an array of page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Limit the number of page buttons shown
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      return pageNumbers;
    }
    
    const halfWay = Math.floor(maxPagesToShow / 2);
    
    if (currentPage <= halfWay) {
      return [...pageNumbers.slice(0, maxPagesToShow - 1), '...', totalPages];
    }
    
    if (currentPage > totalPages - halfWay) {
      return [1, '...', ...pageNumbers.slice(totalPages - maxPagesToShow + 1)];
    }
    
    return [
      1,
      '...',
      ...pageNumbers.slice(currentPage - 2, currentPage + 1),
      '...',
      totalPages
    ];
  };

  return (
    <div className="flex justify-center mt-12 mb-8">
      <nav className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 text-sm border ${
            currentPage === 1
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 transition-colors duration-200'
          } rounded-l-md`}
          aria-label="Previous page"
        >
          Previous
        </button>
        
        <div className="hidden sm:flex">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`px-4 py-2 text-sm border-t border-b border-gray-200 ${
                page === currentPage
                  ? 'bg-blue-600 text-white font-medium border-blue-600'
                  : page === '...'
                  ? 'bg-white text-gray-500 cursor-default'
                  : 'bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200'
              } ${index === 0 && typeof page === 'number' ? 'border-l border-gray-200' : ''}`}
              disabled={page === '...'}
              aria-label={typeof page === 'number' ? `Page ${page}` : 'More pages'}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>
        
        <div className="sm:hidden flex items-center px-4 py-2 bg-white border-t border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">
            {currentPage} of {totalPages}
          </span>
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 text-sm border ${
            currentPage === totalPages
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 transition-colors duration-200'
          } rounded-r-md`}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;