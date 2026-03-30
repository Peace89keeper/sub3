import React, { useState } from 'react';
 // Import the hook for navigation
import { Link } from 'react-router-dom';
import './SchemeMatchDashboard.css';
import Navbar from '../components/Navbar.jsx'; // Import the Navbar component

const SchemeMatchDashboard = () => {

  // Initialize the router

  // THE LOGOUT LOGIC

  // Simulated data: This will eventually come from your Express backend / MongoDB
  const [schemes] = useState([
    {
      id: '',
      title: 'PM Vishwakarma Yojana',
      ministry: 'Ministry of Micro, Small & Medium Enterprises',
      benefit: 'Up to ₹15,000 toolkits + training stipend',
      deadline: '31 May 2026',
      daysLeft: 66,
      impactScore: 84,
      isNew: true,
      matchReason: 'Matches: Artisan / OBC / Maharashtra'
    },
    {
      id: 'SM-089',
      title: 'Post Matric Scholarship Scheme',
      ministry: 'Ministry of Social Justice',
      benefit: 'Full academic allowance + maintenance',
      deadline: '15 Apr 2026',
      daysLeft: 20,
      impactScore: 92,
      isNew: false,
      matchReason: 'Matches: Student / SC / Income < 2.5L'
    },
    {
      id: 'SM-211',
      title: 'Stand Up India Scheme',
      ministry: 'Department of Financial Services',
      benefit: 'Bank loans between ₹10 Lakh and ₹1 Crore',
      deadline: 'Rolling',
      daysLeft: null,
      impactScore: 65,
      isNew: false,
      matchReason: 'Matches: Category / Age bracket'
    },
    {
      id: 'SM-21139',
      title: 'Stand Up India Scheme all',
      ministry: 'Department of Financial Services',
      benefit: 'Bank loans between ₹10 Lakh and ₹1 Crore',
      deadline: 'Rolling',
      daysLeft: null,
      impactScore: 64,
      isNew: false,
      matchReason: 'Matches: Category / Age bracket'
    },
    {
      id: 'SM-211',
      title: 'Stand Up India Scheme none',
      ministry: 'Department of Financial Services',
      benefit: 'Bank loans between ₹10 Lakh and ₹1 Crore',
      deadline: 'Rolling',
      daysLeft: 20,
      impactScore: 69,
      isNew: false,
      matchReason: 'Matches: Category / Age bracket'
    }
  ]);

  // Logic: Always sort schemes by highest impact score first
  const rankedSchemes = [...schemes].sort((a, b) => b.impactScore - a.impactScore);

  return (
    <div className="sm-dash-container">
      {/* Dashboard Nav */}
      <Navbar/>

      <main className="sm-dash-main">
        {/* Top Profile Summary Bar */}
        <section className="sm-profile-summary">
          <div className="sm-summary-content">
            <h1 className="sm-dash-title">Your AI Welfare Matches</h1>
            <p className="sm-dash-subtitle">Gemini evaluated 2,500+ schemes against your profile. Here are your top recommendations.</p>
          </div>
          <div className="sm-stats-group">
            <div className="sm-stat-box">
              <span className="sm-stat-label">Total Matches</span>
              <span className="sm-stat-value">{rankedSchemes.length}</span>
            </div>
            <div className="sm-stat-box">
              <span className="sm-stat-label">Avg. Impact</span>
              <span className="sm-stat-value sm-text-accent">
                {Math.round(rankedSchemes.reduce((acc, curr) => acc + curr.impactScore, 0) / rankedSchemes.length)}
              </span>
            </div>
          </div>
        </section>

        {/* Scheme Cards Grid */}
        <section className="sm-scheme-grid">
          {rankedSchemes.map((scheme) => (
            <div key={scheme.id} className="sm-scheme-card">
              
              {/* Card Header: Tags & Ministry */}
              <div className="sm-card-header">
                <div className="sm-tag-group">
                  {scheme.isNew && <span className="sm-badge sm-badge-new">Newly Launched</span>}
                  {scheme.daysLeft && scheme.daysLeft <= 30 ? (
                    <span className="sm-badge sm-badge-urgent">Urgent: {scheme.daysLeft} days left</span>
                  ) : scheme.daysLeft ? (
                    <span className="sm-badge sm-badge-standard">Deadline: {scheme.deadline}</span>
                  ) : (
                    <span className="sm-badge sm-badge-standard">Rolling Deadline</span>
                  )}
                </div>
                <span className="sm-ministry-text">{scheme.ministry}</span>
              </div>

              {/* Card Body: Title & Benefit */}
              <div className="sm-card-body">
                <h2 className="sm-scheme-title">{scheme.title}</h2>
                <div className="sm-benefit-box">
                  <span className="sm-benefit-label">Estimated Benefit:</span>
                  <span className="sm-benefit-value">{scheme.benefit}</span>
                </div>
              </div>

              {/* Card Footer: Impact Score & CTA */}
              <div className="sm-card-footer">
                <div className="sm-score-section">
                  <div className="sm-score-header">
                    <span className="sm-score-label">Personal Impact Score</span>
                    <span className="sm-score-number">{scheme.impactScore}/100</span>
                  </div>
                  <div className="sm-progress-track">
                    {/* Logic: Inline style handles the dynamic width of the bar */}
                    <div 
                      className="sm-progress-fill" 
                      style={{ width: `${scheme.impactScore}%` }}
                    ></div>
                  </div>
                  <p className="sm-match-reason">{scheme.matchReason}</p>
                </div>
                
                <button className="sm-btn-apply">
                  <Link to={`/detail/${scheme.id}`}>Apply via MyScheme</Link>
                  <span className="sm-arrow">↗</span>
                </button>
              </div>

            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SchemeMatchDashboard;