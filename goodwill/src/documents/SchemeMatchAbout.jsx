import React from 'react';
import './SchemeMatchAbout.css';
import { useNavigate } from 'react-router-dom';


const SchemeMatchAbout = () => {
  const navigate = useNavigate();

  
  return (
    <div className="sm-about-container">
      {/* Navbar */}
      <nav className="sm-about-nav">
        <div className="sm-logo-group" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
          <div className="sm-logo-icon">S</div>
          <span className="sm-logo-text"  >SchemeMatch</span>
        </div>
        
      </nav>
   

      <main className="sm-about-main">
        {/* Header Section */}
        <section className="sm-about-hero">
          <div className="sm-badge sm-badge-orange">NxtGen Heist 2026 · Dyal Singh College</div>
          <h1 className="sm-about-title">Bridging the ₹1.7L Crore Gap</h1>
          <p className="sm-about-subtitle">
            India has over 2,500 government schemes, yet ₹1.7L Cr in welfare funds goes unclaimed yearly. Over 80 Crore citizens are eligible for benefits but remain uninformed. We built SchemeMatch to fix that.
          </p>
        </section>

        {/* The Analogy Section */}
        <section className="sm-analogy-section">
          <div className="sm-analogy-card">
            <h2 className="sm-analogy-title">The Problem</h2>
            <p>Finding a scheme today is like wandering through a massive, unmapped forest. You have to read through 30+ portals and heavy jargon just to see if you fit.</p>
          </div>
          <div className="sm-analogy-divider">→</div>
          <div className="sm-analogy-card sm-card-highlight">
            <h2 className="sm-analogy-title">The Solution</h2>
            <p>SchemeMatch is your predictive GPS. We use AI to calculate the exact financial value of a destination before you even take your first step.</p>
          </div>
        </section>

        {/* Step-by-Step Timeline */}
        <section className="sm-timeline-section">
          <h2 className="sm-section-heading">How It Works</h2>
          
          <div className="sm-timeline">
            <div className="sm-timeline-step">
              <div className="sm-step-number">1</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">Build Your Profile</h3>
                <p className="sm-step-desc">
                  Take 2 minutes to tell us your basic details: age, income, state, category, and occupation. No sensitive documents required yet.
                </p>
              </div>
            </div>

            <div className="sm-timeline-step">
              <div className="sm-step-number">2</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">AI Reads the Rulebooks</h3>
                <p className="sm-step-desc">
                  Our Gemini API engine instantly reads your profile and compares it against the complex eligibility criteria of government schemes. It reasons naturally, going beyond simple database filters.
                </p>
              </div>
            </div>

            <div className="sm-timeline-step">
              <div className="sm-step-number">3</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">Get Your Impact Score</h3>
                <p className="sm-step-desc">
                  Every matched scheme gets a 0–100 Personal Impact Score. We rank your dashboard so you instantly see which schemes offer the highest financial and practical benefit for YOUR specific situation.
                </p>
              </div>
            </div>

            <div className="sm-timeline-step">
              <div className="sm-step-number">4</div>
              <div className="sm-step-content">
                <h3 className="sm-step-title">Apply & Get Alerted</h3>
                <p className="sm-step-desc">
                  Click through directly to the official MyScheme portal to apply. Afterward, our Cron Jobs will automatically notify you via email the moment a new scheme launches that fits your DNA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Under the Hood (Tech Stack) */}
        <section className="sm-tech-section">
          <h2 className="sm-section-heading">Under the Hood</h2>
          <p className="sm-section-subheading">A modern MERN stack supercharged by Google's Gemini LLM.</p>
          
          <div className="sm-tech-grid">
            <div className="sm-tech-card">
              <span className="sm-tech-icon">⚛️</span>
              <h3 className="sm-tech-title">Frontend Engine</h3>
              <p>Built with React.js and standard CSS for high performance and zero-latency state management.</p>
            </div>
            <div className="sm-tech-card">
              <span className="sm-tech-icon">⚙️</span>
              <h3 className="sm-tech-title">Backend Architecture</h3>
              <p>Node.js and Express.js handle secure routing, JWT authentication, and API rate limiting.</p>
            </div>
            <div className="sm-tech-card">
              <span className="sm-tech-icon">🍃</span>
              <h3 className="sm-tech-title">Database Layer</h3>
              <p>MongoDB and Mongoose ODM store the curated scheme seeds from MyScheme.gov.in and user profiles safely.</p>
            </div>
            <div className="sm-tech-card sm-tech-highlight">
              <span className="sm-tech-icon">🧠</span>
              <h3 className="sm-tech-title">AI Matching Logic</h3>
              <p>Gemini API executes complex prompt engineering to return structured JSON evaluations and calculate the 0-100 Impact Score.</p>
            </div>
          </div>
        </section>

        {/* NEW: Vision / Roadmap */}
        <section className="sm-vision-section">
          <div className="sm-vision-content">
            <h2 className="sm-vision-heading">The Vision Beyond the Hackathon</h2>
            <p className="sm-vision-text">
              SchemeMatch is not just a project for NxtGen Heist—it's a foundation for a national-scale welfare discovery platform. 
            </p>
            <ul className="sm-vision-list">
              <li><span>💬</span> Vernacular language support for rural accessibility.</li>
              <li><span>📱</span> WhatsApp bot integration for low-bandwidth users.</li>
              <li><span>🏢</span> District-level officer dashboards to track unclaimed fund hotspots.</li>
              <li><span>🔗</span> Direct application tracking APIs.</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="sm-about-cta">
          <h2 className="sm-cta-heading">Ready to find what's yours?</h2>
          <button className="sm-btn-primary-large">Create Your Free Profile</button>
        </section>

      </main>
    </div>
  );
};

export default SchemeMatchAbout;