'use client';

import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, User, Settings, UserCircle } from 'lucide-react';
import { Link as RouterLink } from "react-router-dom";
import supabase from './SupabaseClient';
import Logo from './Logo.png';
import './Navbar.css';

const Navbar = ({ 
  isLoggedIn, 
  onLogin, 
  onLogout, 
  userProfile 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
    setFullName('');
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user's full name from Supabase
  useEffect(() => {
    const fetchUserFullName = async () => {
      if (isLoggedIn && userProfile?.email) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('users')
            .select('full_name')
            .eq('email', userProfile.email)
            .single();
  
          if (data?.full_name) {
            setFullName(data.full_name);
          } else {
            // Fallback to username from email
            setFullName(userProfile.email.split('@')[0]);
          }
  
          console.log('Full Name Fetch Result:', { data, error });
        } catch (err) {
          console.error('Error fetching full name:', err);
          setFullName(userProfile.email.split('@')[0]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
  
    fetchUserFullName();
  }, [isLoggedIn, userProfile]);
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo with routing */}
        <RouterLink to="/" className="logo" onClick={closeMenu}>
          <img src={Logo || "/placeholder.svg"} alt="PhysioHealth Logo" className="logo-image" />
        </RouterLink>

        {/* Hamburger Menu */}
        <button className="hamburger" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <RouterLink to="/" onClick={closeMenu}>Home</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/about" onClick={closeMenu}>About Us</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/services" onClick={closeMenu}>Services</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/appointment" onClick={closeMenu}>Appointment Booking</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/contact" onClick={closeMenu}>Contact Us</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/faq" onClick={closeMenu}>FAQs</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/testimonials" onClick={closeMenu}>Testimonials</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/media_upload" onClick={closeMenu}></RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/Media" onClick={closeMenu}>Media</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/blog" onClick={closeMenu}>Blog</RouterLink>
          </li>
          <li className="nav-item">
            <RouterLink to="/mainadmin" onClick={closeMenu}></RouterLink>
          </li>

          {/* Authentication and User Menu */}
          <li className="nav-item auth-item min-height-100vh">
            {isLoggedIn ? (
              <div
                className="user-profile"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  <UserCircle size={24} />
                </div>
                <span className="username">
                  {isLoading 
                    ? "Loading..." 
                    : fullName || userProfile?.email || "User"}
                </span>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <RouterLink to="/profile" className="dropdown-item" onClick={closeMenu}>
                      <User size={16} />
                      <span>My Profile</span>
                    </RouterLink>
                    <RouterLink to="/settings" className="dropdown-item" onClick={closeMenu}>
                      <Settings size={16} />
                      <span>Settings</span>
                    </RouterLink>
                    <div className="dropdown-divider"></div>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="dropdown-item logout"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-button" onClick={onLogin}>
                <LogIn size={20} />
                <span>Sign In</span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;