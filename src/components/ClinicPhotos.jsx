import React, { useState, useEffect } from 'react';
import  supabase  from './SupabaseClient';
import { Camera } from 'lucide-react';
import './ClinicPhotos.css';

const ClinicPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading photos: {error}</p>
      </div>
    );
  }

  return (
    <div className="clinic-photos">
      <header className="gallery-header">
        <Camera size={32} />
        <h1>Our Clinic Gallery</h1>
      </header>
      
      {photos.length === 0 ? (
        <div className="no-photos">
          <p>No photos available at the moment.</p>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-card">
              <img src={photo.photo_url} alt={photo.title} />
              <div className="photo-overlay">
                <h3>{photo.title}</h3>
                {photo.description && <p>{photo.description}</p>}
                {photo.video_url && <p className="video-badge">Has video</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicPhotos;