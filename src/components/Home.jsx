import React from 'react';
import { Heart, Calendar, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Physiophy</h1>
        <p>
          Expert physiotherapy care tailored to your needs. Our experienced team is
          dedicated to helping you achieve optimal physical health and wellness.
        </p>
        <button className="cta-button">Book an Appointment</button>
      </section>

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Heart size={32} color="#2C5530" />
            <h3>Expert Care</h3>
            <p>Experienced physiotherapists dedicated to your recovery</p>
          </div>
          <div className="feature-card">
            <Calendar size={32} color="#2C5530" />
            <h3>Flexible Scheduling</h3>
            <p>Convenient appointment times that fit your schedule</p>
          </div>
          <div className="feature-card">
            <Clock size={32} color="#2C5530" />
            <h3>Quick Recovery</h3>
            <p>Proven techniques for faster rehabilitation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;