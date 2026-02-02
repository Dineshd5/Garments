import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { useAuth } from 'contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      let result;
      if (isSignUp) {
        result = await signUp(formData.email, formData.password);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      const { error } = result;
      
      if (error) {
        let errorMessage = error.message || 'Authentication failed';
        
        // Handle specific Supabase errors
        if (errorMessage.includes('security purposes')) {
          errorMessage = 'Too many requests. Please wait 30 seconds before trying again.';
        } else if (errorMessage.includes('User already registered')) {
          errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (errorMessage.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address. Check your inbox for the confirmation link.';
        }

        setErrors({ general: errorMessage });
      } else {
        if (isSignUp) {
          setSuccessMessage('Account created! Please check your email to confirm your registration.');
          setIsSignUp(false);
          setFormData(prev => ({ ...prev, password: '' })); // Clear password
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality to be integrated with Supabase.');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Factory" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            T-Shirt Factory Platform
          </h1>
          <p className="text-text-secondary">
            {isSignUp ? 'Create an account to get started' : 'Sign in to access your manufacturing dashboard'}
          </p>
        </div>

        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-error-50 border border-error-200 rounded-md p-3 flex items-center space-x-2 animate-pulse">
                <Icon name="AlertCircle" size={16} className="text-error-600" />
                <span className="text-sm text-error-700">{errors.general}</span>
              </div>
            )}
            
            {successMessage && (
              <div className="bg-success-50 border border-success-200 rounded-md p-3 flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success-600" />
                <span className="text-sm text-success-700">{successMessage}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Icon name="Mail" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-error-600 flex items-center">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Icon name="Lock" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-error-600 flex items-center">{errors.password}</p>}
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-text-secondary">Remember me</span>
                </label>
                <button type="button" onClick={handleForgotPassword} className="text-sm text-primary hover:text-primary-700 font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing in...'}</span>
                </>
              ) : (
                <>
                  <Icon name={isSignUp ? "UserPlus" : "LogIn"} size={20} />
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={toggleMode}
                className="text-primary hover:text-primary-700 font-medium transition-colors"
                disabled={isLoading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-text-secondary">
              Access levels: Factory Manager, Production Supervisor, Quality Inspector
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} T-Shirt Factory Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
