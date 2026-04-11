import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SchemeMatchDashboard.css';
import Navbar from '../components/Navbar.jsx';

const SchemeMatchDashboard = () => {
  const [displaySchemes, setDisplaySchemes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch User Data & Scheme Data on Load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch Schemes
        const schemeRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/schemes/all`);
        const schemeData = await schemeRes.json();
        
        if (schemeData.success) {
          const sorted = schemeData.schemes.sort((a, b) => b.impactScore - a.impactScore);
          setDisplaySchemes(sorted);
        }

        // Fetch Current Logged-In User Profile
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
          method: "GET",
          credentials: "true", // CRITICAL for passing the auth cookie
        });
        const userData = await userRes.json();
        
        if (userData.success) {
          setCurrentUser(userData.user);
        }
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // 2. AI Filter Button Logic
  const handleAnalyzeClick = async () => {
    if (!currentUser) {
      alert("No user profile found. Please register or log in first.");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/schemes/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfile: currentUser }), // Sending REAL data to AI
      });

      const data = await response.json();

      if (data.success) {
        setDisplaySchemes(data.matchedSchemes);
      } else {
        console.error("AI Filtering Failed:", data.message);
      }
    } catch (error) {
      console.error("Network Error during AI analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) return <div>Loading Dashboard Data...</div>;

  return (
    <div className="sm-dash-container">
      <Navbar/>
      <main className="sm-dash-main">
        {/* Top Section */}
        <section className="sm-profile-summary">
          <div className="sm-summary-content">
            <h1 className="sm-dash-title">
              {currentUser ? `Welcome back, ${currentUser.name || 'User'}` : "Your AI Welfare Matches"}
            </h1>
            <button 
              onClick={handleAnalyzeClick} 
              disabled={isAnalyzing}
              className="sm-btn-apply"
              style={{ marginTop: '10px' }}
            >
              {isAnalyzing ? "Gemini is Analyzing..." : "Run AI Filter"}
            </button>
            <button 
              
              className="sm-btn-apply"
              style={{ marginTop: '10px' }}
            ><Link to="/admin/add-scheme">Add Informations to AI Filter</Link>
            </button>
          </div>
          <div className="sm-stats-group">
             <div className="sm-stat-box">
              <span className="sm-stat-label">Total Matches</span>
              <span className="sm-stat-value">{displaySchemes.length}</span>
            </div>
          </div>
        </section>

        {/* Dynamic Scheme Grid */}
        <section className="sm-scheme-grid">
          {displaySchemes.length === 0 ? (
            <p>No schemes found in the database.</p>
          ) : (
            displaySchemes.map((scheme) => (
              <div key={scheme._id || scheme.customId} className="sm-scheme-card">
                 <div className="sm-card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 className="sm-scheme-title">{scheme.title}</h2>
                      {scheme.isNewlyLaunched && <span className="sm-badge" style={{ backgroundColor: 'green', color: 'white', padding: '4px', borderRadius: '4px' }}>New</span>}
                    </div>
                    <p><strong>Ministry:</strong> {scheme.ministry}</p>
                    <p><strong>Benefit:</strong> {scheme.benefit}</p>
                 </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default SchemeMatchDashboard;