import React from 'react';
import Header from '../components/Header';
import { Github, Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "AI Research Director",
      bio: "Leading expert in computer vision and machine learning with 15+ years of experience in accident prevention technology.",
      avatar: "👩‍💻",
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@smartaccidentdetector.com"
      }
    },
    {
      name: "Michael Chen",
      role: "Lead Software Engineer",
      bio: "Full-stack developer specializing in real-time data processing and scalable system architecture.",
      avatar: "👨‍💻",
      social: {
        linkedin: "#",
        github: "#",
        email: "michael@smartaccidentdetector.com"
      }
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Safety Systems Analyst",
      bio: "Traffic safety expert with extensive experience in accident analysis and prevention strategies.",
      avatar: "👩‍🔬",
      social: {
        linkedin: "#",
        github: "#",
        email: "emily@smartaccidentdetector.com"
      }
    },
    {
      name: "Alex Thompson",
      role: "Mobile App Developer",
      bio: "Mobile technology specialist focused on creating intuitive emergency response applications.",
      avatar: "👨‍📱",
      social: {
        linkedin: "#",
        github: "#",
        email: "alex@smartaccidentdetector.com"
      }
    }
  ];

  return (
    <div className="page-container">
      <Header 
        title="Our Team" 
        subtitle="Meet the experts behind Smart Accident Detector" 
      />
      
      <div className="team-content">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-avatar">
                <span className="avatar-emoji">{member.avatar}</span>
              </div>
              
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
              
              <div className="member-social">
                <a href={member.social.linkedin} className="social-link">
                  <Linkedin size={20} />
                </a>
                <a href={member.social.github} className="social-link">
                  <Github size={20} />
                </a>
                <a href={`mailto:${member.social.email}`} className="social-link">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="team-stats">
          <div className="stat-card">
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Years Combined Experience</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">1000+</h3>
            <p className="stat-label">Accidents Prevented</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">99.9%</h3>
            <p className="stat-label">System Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;