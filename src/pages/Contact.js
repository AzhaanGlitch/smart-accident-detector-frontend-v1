import React, { useState } from 'react';
import Header from '../components/Header';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: [
        "info@smartaccidentdetector.com",
        "support@smartaccidentdetector.com"
      ]
    },
    {
      icon: Phone,
      title: "Phone",
      details: [
        "+1 (555) 123-4567",
        "Emergency: +1 (555) 911-HELP"
      ]
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "123 Innovation Drive",
        "Tech City, TC 12345"
      ]
    }
  ];

  return (
    <div className="page-container">
      <Header 
        title="Get In Touch" 
        subtitle="We're here to help and answer your questions" 
      />
      
      <div className="contact-content">
        <div className="contact-info">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="contact-info-card">
                <div className="contact-icon">
                  <Icon size={32} />
                </div>
                <h3 className="contact-title">{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="contact-detail">{detail}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="contact-form-container">
          <h2 className="form-title">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <Select value={formData.subject} onValueChange={handleSubjectChange}>
                <SelectTrigger className="form-select">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="sales">Sales Question</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="submit-btn">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;