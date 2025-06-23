import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginAsAgent: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [accessRequested, setAccessRequested] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const navigate = useNavigate();
  const { login, loginAsAgent } = useAuth();

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const requestAccess = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setLoading(true);
        
        // Simulate an API call to request access
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAccessRequested(true);
        setLoading(false);
        
        // Simulate access being granted after 2 seconds
        setTimeout(() => {
          setAccessGranted(true);
        }, 2000);
      } catch (err) {
        console.error('Access request error:', err);
        setErrors({
          form: 'An error occurred while requesting access. Please try again.'
        });
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accessGranted) {
      requestAccess(e);
      return;
    }
    
    if (validateForm()) {
      try {
        setLoading(true);
        
        // Use the appropriate login function from AuthContext
        const result = formData.loginAsAgent 
          ? await loginAsAgent(formData.email, formData.password)
          : await login(formData.email, formData.password);
        
        if (result.success) {
          // Show success message
          alert('Login successful! Redirecting to home page...');
          
          // Redirect to home page (main page)
          navigate('/home');
        } else {
          setErrors({
            form: result.error || 'Invalid email or password. Please try again.'
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Login error:', err);
        setErrors({
          form: 'An unexpected error occurred. Please try again.'
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        {errors.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{errors.form}</p>
          </div>
        )}
        
        {accessRequested && !accessGranted && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p>Access request submitted. Waiting for approval...</p>
          </div>
        )}
        
        {accessGranted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p>Access granted! You can now log in.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="loginAsAgent"
                checked={formData.loginAsAgent}
                onChange={(e) => setFormData({
                  ...formData,
                  loginAsAgent: e.target.checked
                })}
                className="mr-2"
                disabled={loading}
              />
              <span className="text-gray-700">Login as Agent</span>
            </label>
          </div>
          
          <button
            type="submit"
            className={`w-full ${accessGranted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white py-2 rounded-md font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 
             accessGranted ? (formData.loginAsAgent ? 'Login as Agent' : 'Login') : 
             'Request Access'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;