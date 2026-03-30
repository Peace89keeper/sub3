import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added Router Import
import './Register.css';

const Register = () => {
  const navigate = useNavigate(); // 2. Initialized Router

  // Basic state to hold form data for your MERN backend later
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    age: '', gender: '', state: '', 
    category: '', occupation: '', income: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload ready for Express backend:", formData);
    
    // 3. Routing logic executed: Send user to dashboard instantly
    navigate('/dashboard');
  };

  return (
    <div className="sm-reg-container">
      {/* Minimal Navbar for context */}
      <nav className="sm-reg-nav">
        <div className="sm-logo-group">
          <div className="sm-logo-icon">S</div>
          <span className="sm-logo-text">SchemeMatch</span>
        </div>
        {/* 4. Wired up the Back button */}
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

          <form className="sm-form" onSubmit={handleSubmit}>
            
            {/* Block 1: Auth Essentials */}
            <div className="sm-form-section">
              <h2 className="sm-section-title">1. Account Details</h2>
              <div className="sm-input-grid">
                <div className="sm-input-group full-width">
                  <label htmlFor="name">Full Name</label>
                  {/* 5. Added value bindings to all inputs */}
                  <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange} placeholder="e.g. Ramesh Kumar" />
                </div>
                <div className="sm-input-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} required onChange={handleChange} placeholder="name@example.com" />
                </div>
                <div className="sm-input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} placeholder="••••••••" />
                </div>
              </div>
            </div>

            <div className="sm-divider"></div>

            {/* Block 2: AI Matching Parameters */}
            <div className="sm-form-section">
              <h2 className="sm-section-title">2. Welfare Profile</h2>
              <div className="sm-input-grid">
                
                <div className="sm-input-group">
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" name="age" min="18" max="100" value={formData.age} required onChange={handleChange} placeholder="e.g. 28" />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="gender">Gender</label>
                  {/* 6. Removed 'selected' from the child options, bound value to parent select */}
                  <select id="gender" name="gender" value={formData.gender} required onChange={handleChange}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="state">State</label>
                  <select id="state" name="state" value={formData.state} required onChange={handleChange}>
                    <option value="" disabled>Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} required onChange={handleChange}>
                    <option value="" disabled>Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                <div className="sm-input-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input type="text" id="occupation" name="occupation" value={formData.occupation} required onChange={handleChange} placeholder="e.g. Farmer, Artisan, Student" />
                </div>

                <div className="sm-input-group">
                  <label htmlFor="income">Annual Income (₹)</label>
                  <input type="number" id="income" name="income" value={formData.income} required onChange={handleChange} placeholder="e.g. 150000" />
                </div>

              </div>
            </div>

            <button type="submit" className="sm-btn-submit">
              Analyze Matches <span className="sm-arrow">→</span>
            </button>
            
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;