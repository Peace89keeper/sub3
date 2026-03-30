import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; // Importing your strict CSS file

const Hero = () => {
  return (
    <div className="sm-hero-container">
      {/* Navigation */}
      <nav className="sm-navbar">
        <div className="sm-logo-group">
          <div className="sm-logo-icon">S</div>
          <span className="sm-logo-text">SchemeMatch</span>
        </div>
        
        <div className="sm-nav-actions">
          <button className="sm-btn-login"><Link to="/login" className="sm-link">Login</Link></button>
          <button className="sm-btn-register">
            <Link to="/register" className="sm-link">Register</Link>
          </button>
        </div>
      </nav>

      {/* Main Split Layout */}
      <main className="sm-hero-main">
        
        {/* Left Side: Content Anchor */}
        <section className="sm-content-section">
          <div className="sm-hackathon-badge">NxtGen Heist 2026</div>
          
          <h1 className="sm-headline">
            ₹1.7L Cr <span className="sm-text-dim">Unclaimed.</span><br />
            <span className="sm-text-accent">Find what's yours.</span>
          </h1>
          
          <p className="sm-description">
            India has over 2,500 government schemes. Most citizens qualify for thousands in benefits but never know it. 
            <strong> SchemeMatch uses Gemini AI to score and match you to the welfare you deserve.</strong>
          </p>
          
          <div className="sm-cta-group">
            <button className="sm-btn-primary">
              <Link to="/register" className="sm-link">Build Your Profile</Link>
            </button>
            <div className="sm-video-link">
              <div className="sm-play-icon"></div>
              <Link to="/about" className="sm-link">How It Works</Link>
            </div>
          </div>
        </section>

        {/* Right Side: Visual Hook */}
        <section className="sm-visual-section">
          {/* Abstract background element */}
          <div className="sm-abstract-bg"></div>
          
          {/* Floating Impact Score Card */}
          <div className="sm-impact-card">
            <div className="sm-card-header">
              <div className="sm-spinner"></div>
              <span className="sm-id-tag">ID: 2026-SM</span>
            </div>
            <h3 className="sm-card-title">Personal Impact Score</h3>
            <div className="sm-score-display">
              84<span className="sm-score-max">/100</span>
            </div>
            <div className="sm-progress-track">
              <div className="sm-progress-fill"></div>
            </div>
            <p className="sm-match-details">Match: <span>OBC / Maharashtra</span></p>
          </div>
          
          {/* Background Image Overlay */}
          <div className="sm-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80" 
              alt="Digital India" 
              className="sm-hero-img"
            />
          </div>
        </section>
      </main>

      {/* Scroll Indicator */}
      <div className="sm-scroll-hint">
        <span>Discover</span>
        <div className="sm-scroll-line"></div>
      </div>
    </div>
  );
};

export default Hero;