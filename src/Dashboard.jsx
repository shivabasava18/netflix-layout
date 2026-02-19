import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch user profile from backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to load profile');
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '16px',
          textAlign: 'center',
          minWidth: '400px'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '3rem 4rem', 
        borderRadius: '16px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#333', margin: 0, fontSize: '2.5rem', fontWeight: '700' }}>Dashboard</h1>
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Logout
          </button>
        </div>

        {error && (
          <div style={{ 
            color: '#e74c3c', 
            padding: '1.5rem', 
            backgroundColor: '#fdf2f2',
            borderRadius: '12px',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        {user && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem', fontSize: '2rem', fontWeight: '600' }}>
              Welcome, {user.username}!
            </h2>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '2rem', 
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>
                Profile Information
              </h3>
              
              <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                <strong style={{ color: '#555' }}>User ID:</strong> 
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>{user.id}</span>
              </div>
              
              <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                <strong style={{ color: '#555' }}>Username:</strong> 
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>{user.username}</span>
              </div>
              
              <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                <strong style={{ color: '#555' }}>Email:</strong> 
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>{user.email}</span>
              </div>
              
              {user.phone_number && (
                <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                  <strong style={{ color: '#555' }}>Phone Number:</strong> 
                  <span style={{ marginLeft: '0.5rem', color: '#333' }}>{user.phone_number}</span>
                </div>
              )}
              
              <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                <strong style={{ color: '#555' }}>Member Since:</strong> 
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>
                  {new Date(user.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            <div style={{ 
              background: '#e8f5e8', 
              padding: '2rem', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#27ae60', 
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                ✅ Successfully logged in! Your data is securely stored in the database.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
