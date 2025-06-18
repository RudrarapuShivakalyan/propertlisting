import React, { useState } from 'react';

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    alternateContactNumber: '',
    locality: '',
    address: '',
    spaceType: '',
    petsAllowed: '',
    preference: '',
    bachelors: '',
    type: '',
    bhk: '',
    floor: '',
    nearestLandmark: '',
    washroomType: '',
    coolingFacility: '',
    carParking: '',
    rent: '',
    maintenance: '',
    photos: [],
    squareFeet: '',
    appliances: [],
    amenities: [],
    about: ''
  });

  const [errors, setErrors] = useState({});
  const [photoFiles, setPhotoFiles] = useState([]);

  const spaceTypes = ['Flat', 'House', 'PG', 'Warehouse', 'Office', 'Shop'];
  const preferenceOptions = ['Family', 'Bachelors', 'Any'];
  const bachelorsOptions = ['Female', 'Male'];
  const typeOptions = ['Semi Furnished', 'Fully Furnished', 'Non Furnished'];
  const bhkOptions = ['1', '2', '3', '4', '5'];
  const washroomOptions = ['Western', 'Indian'];
  const coolingOptions = ['AC', 'Fan'];
  const yesNoOptions = ['Yes', 'No'];
  const applianceOptions = ['Refrigerator', 'Washing Machine', 'Microwave', 'TV', 'Water Purifier', 'Geyser'];
  const amenityOptions = ['Swimming Pool', 'Gym', 'Park', 'Security', 'Power Backup', 'Lift', 'Parking', 'Club House'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData({
      ...formData,
      [name]: selectedValues
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotoFiles(files);
    
    // Clear photo error if any
    if (errors.photos) {
      setErrors({
        ...errors,
        photos: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'contactNumber', 'locality', 
      'address', 'spaceType', 'petsAllowed', 'preference', 
      'type', 'bhk', 'floor', 'washroomType', 
      'coolingFacility', 'carParking', 'rent', 'squareFeet', 'about'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    
    // Validate bachelors field if preference is Bachelors or Any
    if ((formData.preference === 'Bachelors' || formData.preference === 'Any') && !formData.bachelors) {
      newErrors.bachelors = 'Bachelors preference is required';
    }
    
    // Validate photos (minimum 5)
    if (photoFiles.length < 5) {
      newErrors.photos = 'At least 5 photos are required';
    }
    
    // Validate contact number format
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    
    // Validate alternate contact number format if provided
    if (formData.alternateContactNumber && !/^\d{10}$/.test(formData.alternateContactNumber)) {
      newErrors.alternateContactNumber = 'Alternate contact number must be 10 digits';
    }
    
    // Validate rent and maintenance as numbers
    if (formData.rent && isNaN(formData.rent)) {
      newErrors.rent = 'Rent must be a number';
    }
    
    if (formData.maintenance && isNaN(formData.maintenance)) {
      newErrors.maintenance = 'Maintenance must be a number';
    }
    
    if (formData.squareFeet && isNaN(formData.squareFeet)) {
      newErrors.squareFeet = 'Square feet must be a number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create a new FormData object to handle file uploads
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'photos' && key !== 'appliances' && key !== 'amenities') {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append arrays as JSON strings
      submitData.append('appliances', JSON.stringify(formData.appliances));
      submitData.append('amenities', JSON.stringify(formData.amenities));
      
      // Append each photo file
      photoFiles.forEach((file, index) => {
        submitData.append(`photo${index}`, file);
      });
      
      // Call the onSubmit function passed from parent
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Contact Number *</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Alternate Contact Number</label>
            <input
              type="text"
              name="alternateContactNumber"
              value={formData.alternateContactNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.alternateContactNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.alternateContactNumber && <p className="text-red-500 text-sm mt-1">{errors.alternateContactNumber}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Property Location</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Locality *</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.locality ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Nearest Landmark *</label>
            <input
              type="text"
              name="nearestLandmark"
              value={formData.nearestLandmark}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.nearestLandmark ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nearestLandmark && <p className="text-red-500 text-sm mt-1">{errors.nearestLandmark}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Property Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Space Type *</label>
            <select
              name="spaceType"
              value={formData.spaceType}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.spaceType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Space Type</option>
              {spaceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.spaceType && <p className="text-red-500 text-sm mt-1">{errors.spaceType}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">BHK *</label>
            <select
              name="bhk"
              value={formData.bhk}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.bhk ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select BHK</option>
              {bhkOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.bhk && <p className="text-red-500 text-sm mt-1">{errors.bhk}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Floor *</label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded ${errors.floor ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.floor && <p className="text-red-500 text-sm mt-1">{errors.floor}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Type</option>
              {typeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Washroom Type *</label>
            <select
              name="washroomType"
              value={formData.washroomType}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.washroomType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Washroom Type</option>
              {washroomOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.washroomType && <p className="text-red-500 text-sm mt-1">{errors.washroomType}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Cooling Facility *</label>
            <select
              name="coolingFacility"
              value={formData.coolingFacility}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.coolingFacility ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Cooling Facility</option>
              {coolingOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.coolingFacility && <p className="text-red-500 text-sm mt-1">{errors.coolingFacility}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Pets Allowed *</label>
            <select
              name="petsAllowed"
              value={formData.petsAllowed}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.petsAllowed ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Option</option>
              {yesNoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.petsAllowed && <p className="text-red-500 text-sm mt-1">{errors.petsAllowed}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Car Parking *</label>
            <select
              name="carParking"
              value={formData.carParking}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.carParking ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Option</option>
              {yesNoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.carParking && <p className="text-red-500 text-sm mt-1">{errors.carParking}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Preference *</label>
            <select
              name="preference"
              value={formData.preference}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.preference ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Preference</option>
              {preferenceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.preference && <p className="text-red-500 text-sm mt-1">{errors.preference}</p>}
          </div>
          
          {(formData.preference === 'Bachelors' || formData.preference === 'Any') && (
            <div>
              <label className="block text-gray-700 mb-1">Bachelors *</label>
              <select
                name="bachelors"
                value={formData.bachelors}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.bachelors ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Option</option>
                {bachelorsOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.bachelors && <p className="text-red-500 text-sm mt-1">{errors.bachelors}</p>}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Financial Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Rent (₹) *</label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded ${errors.rent ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Maintenance (₹)</label>
            <input
              type="number"
              name="maintenance"
              value={formData.maintenance}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded ${errors.maintenance ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.maintenance && <p className="text-red-500 text-sm mt-1">{errors.maintenance}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Square Feet Area *</label>
            <input
              type="number"
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleChange}
              min="0"
              className={`w-full p-2 border rounded ${errors.squareFeet ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.squareFeet && <p className="text-red-500 text-sm mt-1">{errors.squareFeet}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Additional Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Appliances</label>
            <select
              name="appliances"
              multiple
              value={formData.appliances}
              onChange={handleMultiSelect}
              className="w-full p-2 border border-gray-300 rounded h-32"
            >
              {applianceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <p className="text-gray-500 text-sm mt-1">Hold Ctrl/Cmd to select multiple options</p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Amenities</label>
            <select
              name="amenities"
              multiple
              value={formData.amenities}
              onChange={handleMultiSelect}
              className="w-full p-2 border border-gray-300 rounded h-32"
            >
              {amenityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <p className="text-gray-500 text-sm mt-1">Hold Ctrl/Cmd to select multiple options</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Property Photos</h2>
        
        <div>
          <label className="block text-gray-700 mb-1">Upload Photos (Minimum 5) *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className={`w-full p-2 border rounded ${errors.photos ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
          <p className="text-gray-500 text-sm mt-1">Selected files: {photoFiles.length}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Property Description</h2>
        
        <div>
          <label className="block text-gray-700 mb-1">About the Property *</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="5"
            className={`w-full p-2 border rounded ${errors.about ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
        >
          Submit Property
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;