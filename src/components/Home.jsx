import React, { useEffect } from 'react';
import { UserRound, Clock, HeartPulse } from 'lucide-react';
import './Home.css';
import Card from './Mini/Card';

const Home = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.medical-service-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="medical-home">
      <section className="medical-hero">
        <div className="medical-hero-content">
          <div className="medical-title-container">
            <h1>
              <span className="medical-destination-text">Destination</span>
              <span className="medical-for-text">For</span>
              <span className="medical-relief-text">Relief & Wellness</span>
            </h1>
          </div>
          <p className="medical-hero-description">
            Experience exceptional healthcare tailored to your needs. Our dedicated team
            of professionals is committed to providing personalized care and innovative
            treatments for your optimal well-being.
          </p>
          <div className="medical-button-group">
            <button className="medical-explore-button">
              Explore Services
              <span className="medical-arrow">→</span>
            </button>
            <button className="medical-book-button">
              Book Appointment
              <span className="medical-arrow">→</span>
            </button>
          </div>
          <div className="medical-stats">
            <div className="medical-stat-item">
              <h3>24/7</h3>
              <p>Emergency Care</p>
            </div>
            <div className="medical-stat-item">
              <h3>80+</h3>
              <p>Doctors</p>
            </div>
            <div className="medical-stat-item">
              <h3>100k+</h3>
              <p>Customers</p>
            </div>
          </div>
        </div>
        <div className="medical-hero-image-section">
          <div className="medical-image-container">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80"
              alt="Doctor"
              className="medical-main-image"
            />
            <div className="medical-doctor-badge">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"
                alt="Profile"
                className="medical-badge-image"
              />
              <div className="medical-badge-info">
                <h4>Dr. Jamie Smith</h4>
                <p>Physiotherapy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="medical-services">
        <div className="medical-service-container">
          <div className="medical-service-header">
            <h2>Our Services</h2>
            <p>Comprehensive care for your well-being</p>
          </div>
          <div className="medical-service-grid">
            {/* <div className="medical-service-card">
              <div className="medical-icon-wrapper">
                <UserRound className="medical-icon" />
              </div>
              <h3>Expert Therapists</h3>
              <p>Our team of licensed and certified physiotherapists brings years of experience to your care</p>
            </div> */}
            <Card h3="Expert Therapists" p="Our team of licensed and certified physiotherapists brings years of experience to your care"/>
            {/* <div className="medical-service-card">
              <div className="medical-icon-wrapper">
                <Clock className="medical-icon" />
              </div>
              <h3>Emergency Service</h3>
              <p>24/7 emergency physiotherapy services designed for immediate care when you need it most</p>
            </div> */}
            <Card h3="Emergency Service" p="24/7 emergency physiotherapy services designed for immediate care when you need it most"/>
            {/* <div className="medical-service-card">
              <div className="medical-icon-wrapper">
                <HeartPulse className="medical-icon" />
              </div>
              <h3>Free Consultation</h3>
              <p>Begin your journey to wellness with a complimentary consultation with our experts</p>
            </div> */}
            <Card h3="Free Consultation" p="Begin your journey to wellness with a complimentary consultation with our experts"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;