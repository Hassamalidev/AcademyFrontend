import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes loading {
        0% { width: 0%; }
        100% { width: 100%; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (loginError) setLoginError('');
  };

  const validate = () => {
    const newErrors = {};
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await loginUser(formData);
      
      // Store the authentication token
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role || 'User');
        localStorage.setItem('userEmail', formData.email);
        
        // Show success message
        setLoginSuccess(true);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          if (response.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 2000);
      } else {
        throw new Error('No authentication token received');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data || 
        error.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div style={successStyles.container}>
        <div style={successStyles.card}>
          <div style={successStyles.successIcon}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
          
          <h1 style={successStyles.title}>Login Successful!</h1>
          
          <p style={successStyles.message}>
            Welcome back! You are being redirected to your dashboard.
          </p>

          <div style={successStyles.loader}>
            <div style={successStyles.loaderBar}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        
        {loginError && (
          <div style={styles.errorAlert}>{loginError}</div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email && styles.inputError)
              }}
              placeholder="Enter your email"
              autoComplete="username"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password && styles.inputError)
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>
          
          <div style={styles.forgotPassword}>
            <button 
              type="button" 
              onClick={() => navigate('/forgot-password')}
              style={styles.forgotPasswordButton}
            >
              Forgot password?
            </button>
          </div>
          
          <button
            type="submit"
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span>Logging in...</span>
                <div style={styles.spinner}></div>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
        
        <div style={styles.signupText}>
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            style={styles.signupButton}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '500',
    color: '#333',
    fontSize: '0.95rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  errorAlert: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  button: {
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
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '-0.5rem',
  },
  forgotPasswordButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '0',
    textDecoration: 'underline',
  },
  signupText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#666',
    fontSize: '0.95rem',
  },
  signupButton: {
    background: 'none',
    border: 'none',
    color: '#2E7D32',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '0',
    textDecoration: 'underline',
  },
};

const successStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    padding: '3rem 2rem',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#4CAF50',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto',
    boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)',
  },
  title: {
    color: '#2E7D32',
    marginBottom: '1rem',
    fontSize: '2rem',
    fontWeight: '600',
  },
  message: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    lineHeight: '1.5',
  },
  loader: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e0e0e0',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    width: '0%',
    backgroundColor: '#4CAF50',
    borderRadius: '3px',
    animation: 'loading 2s ease-in-out forwards',
  },
};

export default Login;