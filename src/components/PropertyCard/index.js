import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  // Add a check to ensure property is defined
  if (!property) {
    return <div className="bg-gray-100 p-4 rounded-lg">Property data unavailable</div>;
  }

  const {
    id,
    firstName = '',
    lastName = '',
    locality = '',
    spaceType = '',
    bhk = '',
    rent = 0,
    squareFeet = 0,
    type = '',
    photos = [],
  } = property;

  // Format rent with error handling
  const formattedRent = typeof rent === 'number' ? rent.toLocaleString() : '0';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 w-full border border-gray-100 hover:border-blue-100">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={photos && photos.length > 0 ? photos[0] : 'https://via.placeholder.com/800x600?text=No+Image'} 
          alt={`${firstName} ${lastName}'s property`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-3 rounded-md text-xs font-medium shadow-sm">
          <i className="fas fa-building mr-1"></i> {spaceType}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center text-xs">
            <i className="fas fa-user-circle mr-1"></i>
            <span>{firstName} {lastName}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-base font-semibold mb-2 text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors duration-300">
          {bhk} BHK in {locality}
        </h3>
        <div className="flex justify-between text-gray-500 mb-3">
          <span className="text-xs font-medium flex items-center">
            <i className="fas fa-vector-square text-blue-500 mr-1"></i>
            {squareFeet} sq.ft
          </span>
          <span className="text-xs font-medium flex items-center">
            <i className="fas fa-home text-blue-500 mr-1"></i>
            {type}
          </span>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-base font-bold text-blue-600">₹{formattedRent}<span className="text-xs font-normal text-gray-500">/month</span></p>
          </div>
          <Link 
            to={`/property/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs rounded-md transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
          >
            <i className="fas fa-eye mr-1"></i> View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;