import React, { useState, useEffect } from 'react';
import  supabase  from './SupabaseClient';
import { Video } from 'lucide-react';
import './ClinicVideos.css';

const ClinicVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .not('video_url', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data);
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
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading videos: {error}</p>
      </div>
    );
  }

  return (
    <div className="clinic-videos">
      <header className="gallery-header">
        <Video size={32} />
        <h1>Our Video Gallery</h1>
      </header>
      
      {videos.length === 0 ? (
        <div className="no-videos">
          <p>No videos available at the moment.</p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map(video => (
            <div key={video.id} className="video-card">
              <div className="video-wrapper">
                <video 
                  controls
                  preload="metadata"
                  poster={video.photo_url}
                >
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                {video.description && <p>{video.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicVideos;