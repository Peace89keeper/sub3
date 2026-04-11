import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate(); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    age: '', gender: '', state: '', 
    category: '', occupation: '', income: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Logic: Sending full payload to the Express backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (data.success) {
        console.log("Registration Success!");
        localStorage.setItem('schemeMatch_token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed. Check details.');
      }
    } catch (err) {
      console.error("Registration connection error:", err);
      setError('Network Error: Cannot reach the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm-reg-container">
      <nav className="sm-reg-nav">
        <div className="sm-logo-group">
          <div className="sm-logo-icon">S</div>
          <span className="sm-logo-text">SchemeMatch</span>
        </div>
        <button type="button" className="sm-btn-text" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </nav>

      <main className="sm-reg-main">
        <div className="sm-reg-wrapper">
          
          <div className="sm-reg-header">
            <h1 className="sm-reg-title">Build Your Profile</h1>
            <p className="sm-reg-subtitle">
              This data stays private and is only used by our Gemini AI engine to calculate your Personal Impact Score.
            </p>
          </div>

          {/* Conditional Error Display */}
          {error && <div className="sm-error-message" style={{color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6', borderRadius: '4px'}}>{error}</div>}

          <form className="sm-form" onSubmit={handleSubmit}>
            
            <div className="sm-form-section">
              <h2 className="sm-section-title">1. Account Details</h2>
              <div className="sm-input-grid">
                <div className="sm-input-group full-width">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange} placeholder="e.g. Ramesh Kumar" disabled={isLoading} />
                </div>
                <div className="sm-input-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} required onChange={handleChange} placeholder="name@example.com" disabled={isLoading} />
                </div>
                <div className="sm-input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} placeholder="••••••••" disabled={isLoading} />
                </div>
              </div>
            </div>

            <div className="sm-divider"></div>

            <div className="sm-form-section">
              <h2 className="sm-section-title">2. Welfare Profile</h2>
              <div className="sm-input-grid">
                
                <div className="sm-input-group">
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" name="age" min="18" max="100" value={formData.age} required onChange={handleChange} placeholder="e.g. 28" disabled={isLoading} />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" value={formData.gender} required onChange={handleChange} disabled={isLoading}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="state">State</label>
                  <select id="state" name="state" value={formData.state} required onChange={handleChange} disabled={isLoading}>
                    <option value="" disabled>Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} required onChange={handleChange} disabled={isLoading}>
                    <option value="" disabled>Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input type="text" id="occupation" name="occupation" value={formData.occupation} required onChange={handleChange} placeholder="e.g. Farmer, Artisan, Student" disabled={isLoading} />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="income">Annual Income (₹)</label>
                  <input type="number" id="income" name="income" value={formData.income} required onChange={handleChange} placeholder="e.g. 150000" disabled={isLoading} />
                </div>

              </div>
            </div>

            <button type="submit" className="sm-btn-submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : <>Analyze Matches <span className="sm-arrow">→</span></>}
            </button>
            
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
