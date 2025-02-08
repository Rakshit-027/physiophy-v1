import React, { useState, useEffect } from 'react';
import supabase from './SupabaseClient';
import './MediaUpload.css';

const MediaUpload = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUploads(data);
    } catch (err) {
      console.error('Error fetching uploads:', err);
      setError('Failed to load uploads');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'photo') setPhotoFile(files[0]);
    if (name === 'video') setVideoFile(files[0]);
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error(`Error uploading ${folder}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let photoUrl = null;
      let videoUrl = null;

      if (photoFile) {
        photoUrl = await uploadFile(photoFile, 'photos');
      }

      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'videos');
      }

      const { data, error: insertError } = await supabase
        .from('uploads')
        .insert([{
          ...formData,
          photo_url: photoUrl,
          video_url: videoUrl,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setUploads(prev => [data, ...prev]);
      setFormData({ title: '', description: '' });
      setPhotoFile(null);
      setVideoFile(null);
      e.target.reset();

    } catch (error) {
      console.error('Error adding upload:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, photoUrl, videoUrl) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setDeleteLoading(id);
    try {
      // Delete record from database
      const { error: deleteError } = await supabase
        .from('uploads')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Delete files from storage
      if (photoUrl) {
        const photoPath = photoUrl.split('/').pop();
        await supabase.storage
          .from('media')
          .remove([`photos/${photoPath}`]);
      }

      if (videoUrl) {
        const videoPath = videoUrl.split('/').pop();
        await supabase.storage
          .from('media')
          .remove([`videos/${videoPath}`]);
      }

      setUploads(uploads.filter(upload => upload.id !== id));

    } catch (error) {
      console.error('Error deleting upload:', error);
      setError('Failed to delete upload');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="upload-container">
      <h1>Media Upload</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label>Video:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div className="uploads-grid">
        {uploads.map((upload) => (
          <div key={upload.id} className="upload-card">
            <button
              onClick={() => handleDelete(upload.id, upload.photo_url, upload.video_url)}
              className="delete-button"
              disabled={deleteLoading === upload.id}
            >
              ×
            </button>

            <h3>{upload.title}</h3>
            {upload.photo_url && (
              <img
                src={upload.photo_url}
                alt={upload.title}
                className="upload-image"
              />
            )}
            {upload.video_url && (
              <video controls className="upload-video">
                <source src={upload.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p className="upload-description">{upload.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaUpload;