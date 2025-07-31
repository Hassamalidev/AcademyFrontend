import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (signupError) setSignupError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      console.log('Signup successful', formData);
      setSignupSuccess(true);
      setSignupError('');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleLoginClick = () => {
    console.log('Navigate to login page');
    setSignupSuccess(false);
  };

  const handleBackToSignup = () => {
    setSignupSuccess(false);
  };

  // Show success message if signup completed
  if (signupSuccess) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
          
          <h1 style={{
            color: '#2E7D32',
            marginBottom: '1rem',
            fontSize: '1.8rem',
            margin: '0 0 1rem 0'
          }}>Account Created!</h1>
          
          <p style={{
            color: '#666',
            marginBottom: '1.5rem',
            lineHeight: '1.5',
            margin: '0 0 1.5rem 0'
          }}>
            Your account has been successfully created. You can now log in with your credentials.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column'
          }}>
            <button 
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
            
            <button
              onClick={handleBackToSignup}
              style={{
                backgroundColor: 'transparent',
                color: '#666',
                padding: '0.5rem',
                border: 'none',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Create another account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          color: '#2E7D32',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.8rem',
          margin: '0 0 1.5rem 0'
        }}>Sign Up</h1>
        
        {signupError && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#d32f2f',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>{signupError}</div>
        )}
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="name" style={{
              fontWeight: '500',
              color: '#333',
              fontSize: '0.95rem'
            }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.name ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your name"
              autoComplete="name"
            />
            {errors.name && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem'
            }}>{errors.name}</span>}
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="email" style={{
              fontWeight: '500',
              color: '#333',
              fontSize: '0.95rem'
            }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.email ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem'
            }}>{errors.email}</span>}
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="password" style={{
              fontWeight: '500',
              color: '#333',
              fontSize: '0.95rem'
            }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.password ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {errors.password && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem'
            }}>{errors.password}</span>}
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="confirmPassword" style={{
              fontWeight: '500',
              color: '#333',
              fontSize: '0.95rem'
            }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.confirmPassword ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem'
            }}>{errors.confirmPassword}</span>}
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              backgroundColor: isLoading ? '#cccccc' : '#4CAF50',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.3s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#666',
          fontSize: '0.95rem'
        }}>
          Already have an account?{' '}
         <button 
            onClick={() => navigate('/login')} 
            style={{
              background: 'none',
              border: 'none',
              color: '#2E7D32',
              cursor: 'pointer',
              fontWeight: '600',
              padding: '0',
              textDecoration: 'underline',
              fontSize: '0.95rem'
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;