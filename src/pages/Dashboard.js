import React, { useState } from 'react';
import Header from '../components/Header';
import { Upload } from 'lucide-react';

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
    console.log('File dropped');
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    // Handle file selection logic here
    console.log('File selected');
  };

  return (
    <div className="page-container">
      <Header 
        title="Smart Accident Insights Panel" 
        subtitle="Real-time accident predictions" 
      />
      
      <div className="dashboard-content">
        <div className="upload-section">
          <h2 className="section-title">Upload Media</h2>
          
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*,video/*"
              onChange={handleInputChange}
              style={{ display: 'none' }}
            />
            
            <label htmlFor="fileInput" className="upload-content">
              <Upload size={48} className="upload-icon" />
              <p className="upload-text">Click to choose or drag & drop a file</p>
              <p className="upload-hint">Supported: Image or Video</p>
            </label>
          </div>
          
          <button className="run-test-btn">
            Run Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;