import React from 'react';
import PropertyCard from '../PropertyCard';

const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl text-gray-600">No properties found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {properties.map(property => (
        <div key={property.id} className="h-full transform transition-transform duration-300 hover:-translate-y-1">
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;