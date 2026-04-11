import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import './SchemeMatchDashboard.css'; // Reusing your existing CSS for simplicity

const AddScheme = () => {
  // 1. The State Logic: Tracking the form inputs
  const [formData, setFormData] = useState({
    customId: '',
    title: '',
    ministry: '',
    benefit: '',
    deadline: '',
    impactScore: '',
    targetState: 'All',
    targetCategory: 'All',
    isNewlyLaunched: false
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. The Input Handler: Updates state whenever you type
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 3. The Submit Logic: Sending the data to Express
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from refreshing
    setIsSubmitting(true);
    setStatusMessage('Publishing to database...');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/schemes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage(`✅ Success! ${formData.title} has been added.`);
        // Clear the form for the next entry
        setFormData({
          customId: '', title: '', ministry: '', benefit: '',
          deadline: '', impactScore: '', targetState: 'All', targetCategory: 'All', isNewlyLaunched: false
        });
      } else {
        setStatusMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatusMessage('❌ Network Error. Is the backend running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="igt-container">
      <Navbar />
      <main className="sm-dash-main" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <section className="sm-profile-summary">
          <h1 className="sm-dash-title">Admin: Add New Scheme</h1>
          
          {/* Display success or error messages */}
          {statusMessage && <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#333', color: 'white', borderRadius: '5px' }}>{statusMessage}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            
            <input type="text" name="customId" placeholder="Scheme ID (e.g., SM-305)" value={formData.customId} onChange={handleChange} required />
            <input type="text" name="title" placeholder="Scheme Title" value={formData.title} onChange={handleChange} required />
            <input type="text" name="ministry" placeholder="Ministry / Department" value={formData.ministry} onChange={handleChange} required />
            <textarea name="benefit" placeholder="Core Benefit Description" value={formData.benefit} onChange={handleChange} required rows="3" />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} style={{ flex: 1 }} />
              <input type="number" name="impactScore" placeholder="Impact Score (0-100)" value={formData.impactScore} onChange={handleChange} style={{ flex: 1 }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" name="targetState" placeholder="Target State (or 'All')" value={formData.targetState} onChange={handleChange} style={{ flex: 1 }} />
              <input type="text" name="targetCategory" placeholder="Target Category (e.g., 'Women', 'Farmers', 'All')" value={formData.targetCategory} onChange={handleChange} style={{ flex: 1 }} />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
              <input type="checkbox" name="isNewlyLaunched" checked={formData.isNewlyLaunched} onChange={handleChange} />
              Is this a newly launched scheme?
            </label>

            <button type="submit" className="sm-btn-apply" disabled={isSubmitting} style={{ marginTop: '10px' }}>
              {isSubmitting ? 'Publishing...' : 'Publish Scheme'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddScheme;