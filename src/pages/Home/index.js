import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyList from '../../components/PropertyList';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { sampleProperties } from '../../utils/sampleProperties';

// Mock data for development - would be replaced with API calls
const mockProperties = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    locality: 'Indiranagar',
    spaceType: 'Flat',
    bhk: '2',
    rent: 25000,
    squareFeet: 1200,
    type: 'Semi Furnished',
    photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80'],
    views: 120
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    locality: 'Koramangala',
    spaceType: 'House',
    bhk: '3',
    rent: 35000,
    squareFeet: 1800,
    type: 'Fully Furnished',
    photos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'],
    views: 85
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Johnson',
    locality: 'HSR Layout',
    spaceType: 'Flat',
    bhk: '1',
    rent: 18000,
    squareFeet: 800,
    type: 'Semi Furnished',
    photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'],
    views: 210
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Williams',
    locality: 'Whitefield',
    spaceType: 'PG',
    bhk: '1',
    rent: 12000,
    squareFeet: 500,
    type: 'Fully Furnished',
    photos: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvc3RlbHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'],
    views: 65
  },
  {
    id: 5,
    firstName: 'Michael',
    lastName: 'Brown',
    locality: 'Electronic City',
    spaceType: 'Office',
    bhk: '2',
    rent: 40000,
    squareFeet: 1500,
    type: 'Fully Furnished',
    photos: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwc3BhY2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'],
    views: 150
  },
  {
    id: 6,
    firstName: 'Emily',
    lastName: 'Davis',
    locality: 'Jayanagar',
    spaceType: 'House',
    bhk: '4',
    rent: 50000,
    squareFeet: 2200,
    type: 'Fully Furnished',
    photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww&w=1000&q=80'],
    views: 180
  }
];

const Home = () => {
  const { isAgent } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('dateUploaded');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const propertiesPerPage = 6;

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use the mock data
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Combine mock properties with agent sample properties if user is an agent
        let allProperties = [...mockProperties];
        
        // Add agent properties if user is an agent
        if (isAgent) {
          // Convert sample properties to match the format of mock properties
          const formattedAgentProperties = sampleProperties.map((prop, index) => ({
            id: 100 + index, // Use high IDs to ensure they're different from mock properties
            firstName: prop.firstName,
            lastName: prop.lastName,
            locality: prop.locality,
            spaceType: prop.spaceType,
            bhk: prop.bhk,
            rent: parseInt(prop.rent),
            squareFeet: parseInt(prop.squareFeet),
            type: prop.type,
            photos: prop.photos || [
              'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80'
            ],
            views: Math.floor(Math.random() * 200) + 50,
            isAgentProperty: true
          }));
          
          allProperties = [...allProperties, ...formattedAgentProperties];
        }
        
        // Sort the properties based on the selected criteria
        let sortedProperties = [...allProperties];
        
        switch (sortBy) {
          case 'dateUploaded':
            // For mock data, we'll just use the ID as a proxy for date
            sortedProperties = sortedProperties.sort((a, b) => 
              sortOrder === 'desc' ? b.id - a.id : a.id - b.id
            );
            break;
          case 'rentLowToHigh':
            sortedProperties = sortedProperties.sort((a, b) => a.rent - b.rent);
            break;
          case 'rentHighToLow':
            sortedProperties = sortedProperties.sort((a, b) => b.rent - a.rent);
            break;
          case 'popularity':
            sortedProperties = sortedProperties.sort((a, b) => b.views - a.views);
            break;
          default:
            break;
        }
        
        // Calculate pagination
        const totalItems = sortedProperties.length;
        const calculatedTotalPages = Math.ceil(totalItems / propertiesPerPage);
        setTotalPages(calculatedTotalPages);
        
        // Get current page items
        const indexOfLastProperty = currentPage * propertiesPerPage;
        const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
        const currentProperties = sortedProperties.slice(indexOfFirstProperty, indexOfLastProperty);
        
        setProperties(currentProperties);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [currentPage, sortBy, sortOrder]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    
    switch (value) {
      case 'dateUploaded':
        setSortBy('dateUploaded');
        setSortOrder('desc');
        break;
      case 'rentLowToHigh':
        setSortBy('rentLowToHigh');
        setSortOrder('asc');
        break;
      case 'rentHighToLow':
        setSortBy('rentHighToLow');
        setSortOrder('desc');
        break;
      case 'popularity':
        setSortBy('popularity');
        setSortOrder('desc');
        break;
      default:
        break;
    }
    
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="bg-blue-700 text-white py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80" 
               alt="Background" 
               className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-3/5 mb-10 md:mb-0">
              <div className="inline-block px-3 py-1 bg-blue-500 rounded-md text-sm font-medium text-white mb-4">
                <i className="fas fa-star mr-1"></i> Premium Property Listings
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Find Your <span className="text-yellow-300">Dream Home</span> <br className="hidden md:block" />
                With Ease
              </h1>
              <p className="text-base md:text-lg mb-8 text-blue-100 max-w-xl leading-relaxed">
                Discover exceptional properties in prime locations with all the amenities you need for comfortable living. Your perfect home is just a click away.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/add-property" 
                  className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <i className="fas fa-plus-circle mr-2"></i>
                  List Your Property
                </Link>
                <Link 
                  to="/" 
                  className="inline-flex items-center bg-blue-600 text-white border border-blue-500 hover:bg-blue-500 px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
                >
                  <i className="fas fa-search mr-2"></i>
                  Explore Properties
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-2/5">
              <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-6">
                  <i className="fas fa-home text-5xl text-yellow-300"></i>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-blue-100">
                    <i className="fas fa-check-circle text-green-400 mr-3"></i>
                    <span>Thousands of verified properties</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <i className="fas fa-check-circle text-green-400 mr-3"></i>
                    <span>Secure and trusted platform</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <i className="fas fa-check-circle text-green-400 mr-3"></i>
                    <span>Direct contact with owners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center mb-2">
              <i className="fas fa-home text-blue-600 text-2xl mr-3"></i>
              <h2 className="text-2xl font-bold text-gray-800">Featured Properties</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-10">
              <i className="fas fa-check-circle text-green-500 mr-1"></i> 
              Handpicked premium properties for you
            </p>
          </div>
          
          <div className="flex items-center bg-white shadow-sm rounded-md px-4 py-2 border border-gray-100">
            <i className="fas fa-sort text-blue-500 mr-2"></i>
            <label htmlFor="sort" className="mr-2 text-gray-600 text-sm font-medium">Sort by:</label>
            <select
              id="sort"
              onChange={handleSortChange}
              value={sortBy === 'dateUploaded' ? 'dateUploaded' : 
                     sortBy === 'rentLowToHigh' ? 'rentLowToHigh' : 
                     sortBy === 'rentHighToLow' ? 'rentHighToLow' : 'popularity'}
              className="p-2 text-sm bg-transparent focus:outline-none text-gray-700"
            >
              <option value="dateUploaded">Latest Listings</option>
              <option value="rentLowToHigh">Price: Low to High</option>
              <option value="rentHighToLow">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <PropertyList properties={properties} />
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;