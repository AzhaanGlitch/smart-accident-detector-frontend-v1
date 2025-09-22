import React from 'react';
import Header from '../components/Header';
import { Bot, Zap, Smartphone, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Detection",
      description: "Machine learning algorithms analyze video feeds in real-time to detect potential accidents before they happen."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Ultra-fast processing ensures immediate alerts and responses within milliseconds of detection."
    },
    {
      icon: Smartphone,
      title: "Mobile Alerts",
      description: "Instant notifications sent to emergency services and designated contacts via SMS and push notifications."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive reporting and analytics to identify accident patterns and high-risk areas."
    }
  ];

  return (
    <div className="page-container">
      <Header 
        title="Advanced Features" 
        subtitle="Cutting-edge technology for accident prevention" 
      />
      
      <div className="features-content">
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon size={48} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;