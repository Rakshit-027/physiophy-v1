// MediaGallery.jsx
import React, { useState, useEffect } from 'react';
import supabase from './SupabaseClient';
import { Play } from 'lucide-react';
import './MediaGallery.css';
import { Link as RouterLink } from "react-router-dom";

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'photos', 'videos'

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, age, photo_url, video_url, problem, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaItems(data);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Failed to load media items');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const filteredItems = mediaItems.filter(item => {
    if (filter === 'photos') return !item.video_url;
    if (filter === 'videos') return item.video_url;
    return true;
  });

  if (loading) {
    return (
      <div className="media-loading">
        <div className="spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return <div className="media-error">{error}</div>;
  }

  return (
    <div className="media-container">
      <h1 className="media-title">Patient Gallery</h1>
      <p className="media-subtitle">Browse our collection of success stories</p>

      <div className="media-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          testimonials
        </button>
        <RouterLink 
         to="/ClinicsPhotos"
 
          className={`filter-btn ${filter === 'photos' ? 'active' : ''}`}
          onClick={() => setFilter('photos')}
        >
          Clinics Photos
        </RouterLink>
        <RouterLink 
        to="/ClinicVideos"
 
          className={`filter-btn ${filter === 'videos' ? 'active' : ''}`}
          onClick={() => setFilter('videos')}
        >
          Clinic Videos
        </RouterLink>
      </div>

      <div className="media-grid">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="media-card"
            onClick={() => openModal(item)}
          >
            <div className="media-wrapper">
              <img 
                src={item.photo_url} 
                alt={`${item.name}'s transformation`}
                className="media-thumbnail"
              />
              {item.video_url && (
                <div className="video-indicator">
                  <Play size={24} />
                </div>
              )}
              <div className="media-overlay">
                <h3 className="media-name">{item.name}, {item.age}</h3>
                <p className="media-preview">{item.problem.substring(0, 100)}...</p>
                <span className="view-details">
                  {item.video_url ? 'Watch Video' : 'View Details'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-media-container">
              {selectedItem.video_url ? (
                <video 
                  controls 
                  className="modal-video"
                  autoPlay
                >
                  <source src={selectedItem.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={selectedItem.photo_url} 
                  alt={`${selectedItem.name}'s transformation`}
                  className="modal-image"
                />
              )}
            </div>
            <div className="modal-info">
              <h2>{selectedItem.name}, {selectedItem.age}</h2>
              <p className="modal-description">{selectedItem.problem}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;