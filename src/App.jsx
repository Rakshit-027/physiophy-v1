import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import supabase from './components/SupabaseClient';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import About from './components/About';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Appointment from './components/Appointment.jsx';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import FAQ from './components/FAQ.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import PatientPanel from './components/PatientPanel.jsx';

function App() {
  const [showAuth, setShowAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check current session on app load
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUserProfile(session.user);
        setIsLoggedIn(true);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUserProfile(session.user);
          setIsLoggedIn(true);
          setShowAuth(null);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setIsLoggedIn(false);
        }
      }
    );

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    setShowAuth('signin');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          userProfile={userProfile}
        />
        <AnimatePresence mode="wait">
          {showAuth ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              {showAuth === 'signin' ? (
                <SignIn
                  onClose={() => setShowAuth(null)}
                  onSignUp={() => setShowAuth('signup')}
                />
              ) : (
                <SignUp
                  onClose={() => setShowAuth(null)}
                  onSignIn={() => setShowAuth('signin')}
                />
              )}
            </motion.div>
          ) : (
            <Content isLoggedIn={isLoggedIn} />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

function Content({ isLoggedIn }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={isLoggedIn ? <Appointment /> : <Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<PatientPanel />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;