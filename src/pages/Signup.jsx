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
      // Simulate API call (replace with actual signup API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your signup API here
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password
      // })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Signup failed');
      
      console.log('Signup successful', formData);
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          fontSize: '1.8rem'
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
        
        <form onSubmit={handleSubmit} style={{
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
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.name ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your name"
              autoComplete="name"
            />
            {errors.name && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem',
              marginTop: '0.25rem'
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
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.email ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem',
              marginTop: '0.25rem'
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
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.password ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {errors.password && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem',
              marginTop: '0.25rem'
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
              style={{
                padding: '0.75rem',
                border: `1px solid ${errors.confirmPassword ? '#d32f2f' : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span style={{
              color: '#d32f2f',
              fontSize: '0.85rem',
              marginTop: '0.25rem'
            }}>{errors.confirmPassword}</span>}
          </div>
          
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.3s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: isLoading ? 0.7 : 1
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
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
              textDecoration: 'underline'
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