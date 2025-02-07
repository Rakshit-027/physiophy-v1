import React from 'react';
import { Activity, Dumbbell, Heart, Brain, Bone, Users } from 'lucide-react';
import './services.css';

const services = [
  {
    icon: <Activity className="service-icon" />,
    title: "Manual Therapy",
    description: "Hands-on techniques to reduce pain, decrease muscle tension and improve mobility through skilled manipulation of soft tissues and joints.",
    category: "Pain Management"
  },
  {
    icon: <Heart className="service-icon" />,
    title: "Rehabilitation Exercises",
    description: "Customized exercise programs designed to restore strength, flexibility, and function following injury or surgery.",
    category: "Recovery"
  },
  {
    icon: <Dumbbell className="service-icon" />,
    title: "Sports Injury Treatment",
    description: "Specialized care for athletes and sports enthusiasts, focusing on injury recovery and performance enhancement.",
    category: "Sports Medicine"
  },
  {
    icon: <Brain className="service-icon" />,
    title: "Neurological Rehabilitation",
    description: "Expert treatment for conditions affecting the nervous system, including stroke recovery and balance disorders.",
    category: "Specialized Care"
  },
  {
    icon: <Bone className="service-icon" />,
    title: "Post-Surgical Rehabilitation",
    description: "Structured recovery programs following orthopedic surgery to ensure optimal healing and return to function.",
    category: "Recovery"
  },
  {
    icon: <Users className="service-icon" />,
    title: "Group Exercise Classes",
    description: "Therapeutic exercise sessions in a supportive group setting, perfect for maintaining long-term health and wellness.",
    category: "Wellness"
  }
];

const ServiceCard = ({ icon, title, description, category }) => {
  return (
    <div className="service-card">
      <div className="service-icon-wrapper">
        {icon}
      </div>
      <div className="service-category">
        <span>{category}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <div 
        className="hero"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Expert Physiotherapy Services</h1>
              <p>Specialized care for your path to recovery and wellness</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Introduction */}
        <div className="intro-section">
          <h2>Our Comprehensive Services</h2>
          <p>
            We offer a wide range of evidence-based physiotherapy treatments tailored to your specific needs.
            Our experienced team uses the latest techniques and equipment to ensure optimal recovery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>Ready to Start Your Recovery Journey?</h3>
            <p>
              Our expert physiotherapists are here to help you achieve your health and wellness goals.
            </p>
            <button className="cta-button">
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;