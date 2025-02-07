import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Users } from 'lucide-react';
import { Element } from 'react-scroll';
import './About.css'

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Tanvi Katariya',
      role: 'Senior Physiotherapist',
      specialization: 'Neuro',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
      experience: '15+ years'
    },
    {
      name: 'Dr. Urvashi',
      role: 'Clinical Director',
      specialization: 'Orthopedic Rehabilitation',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
      experience: '20+ years'
    },
    {
      name: 'Dr. navya',
      role: 'Physiotherapist',
      specialization: 'Neurological Rehabilitation',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
      experience: '10+ years'
    },
    {
        name: 'Dr. Sagar',
        role: 'Physiotherapist',
        specialization: 'Neurological Rehabilitation',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        experience: '10+ years'
    },
    {
        name: 'Dr. karnik',
        role: 'Physiotherapist',
        specialization: 'Neurological Rehabilitation',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        experience: '10+ years'
      },
      {
        name: 'Dr. dont know',
        role: 'Physiotherapist',
        specialization: 'Neurological Rehabilitation',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        experience: '10+ years'
      }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="about-page"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Element name="hero">
        <motion.section 
          className="about-hero"
          variants={itemVariants}
        >
          <div className="about-hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About Physiophy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Leading the way in physiotherapy care since 2024
            </motion.p>
          </div>
        </motion.section>
      </Element>

      <Element name="mission-vision">
        <section className="mission-vision">
          <motion.div 
            className="mission-container"
            variants={containerVariants}
          >
            {['Mission', 'Vision', 'Values'].map((item, index) => (
              <motion.div 
                key={item}
                className="mission-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index === 0 && <Heart className="mission-icon" />}
                {index === 1 && <Award className="mission-icon" />}
                {index === 2 && <Users className="mission-icon" />}
                <h2>Our {item}</h2>
                {item === 'Values' ? (
                  <ul>
                    <li>Patient-Centered Care</li>
                    <li>Clinical Excellence</li>
                    <li>Continuous Learning</li>
                    <li>Integrity & Trust</li>
                  </ul>
                ) : (
                  <p>{item === 'Mission' ? 
                    "To provide exceptional physiotherapy care that empowers our patients to achieve optimal physical health and well-being through personalized treatment plans and evidence-based practices." :
                    "To be the leading physiotherapy clinic that sets the standard for excellence in patient care, innovation, and rehabilitation services in our community."
                  }</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Element>

      <Element name="history">
        <motion.section 
          className="history"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="history-content">
            <motion.h2 variants={itemVariants}>Our History</motion.h2>
            <motion.p variants={itemVariants}>
            At the heart of our clinic's story is a deep passion for improving lives through physiotherapy. Founded in 2024 by a dedicated team of healthcare professionals, we set out with a clear mission: to provide compassionate, effective, and innovative care for our community.

From humble beginnings, our clinic has rapidly grown into a trusted name in the field, recognized for our personalized treatment plans, state-of-the-art techniques, and unwavering commitment to patient well-being. We have been privileged to serve a diverse range of patients, helping them recover from injuries, manage chronic pain, and achieve a better quality of life.
            </motion.p>
            <motion.p variants={itemVariants}>
            Join us as we continue to shape the future of physiotherapy, empowering individuals to lead healthier, pain-free lives.
            </motion.p>
          </div>
        </motion.section>
      </Element>

      <Element name="team">
        <motion.section 
          className="team"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants}>Meet Our Team</motion.h2>
          <motion.div 
            className="team-grid"
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-member"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="specialization">{member.specialization}</p>
                  <p className="experience">Experience: {member.experience}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </Element>
    </motion.div>
  );
};

export default About;