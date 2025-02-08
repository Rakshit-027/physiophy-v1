import React, { useState, useEffect } from "react";
import supabase from "./SupabaseClient";
import { Trash2 } from "lucide-react";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Set to true by default for testing
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    age: "",
    problem: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setError("Failed to load testimonials");
    }
  };

  // Function to delete testimonial
  const handleDelete = async (testimonialId, photoUrl, videoUrl) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    setDeleteLoading(testimonialId);
    try {
      // Delete the testimonial record
      const { error: deleteError } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", testimonialId);

      if (deleteError) throw deleteError;

      // Delete associated files from storage
      if (photoUrl) {
        const photoPath = photoUrl.split("/").pop();
        await supabase.storage
          .from("media")
          .remove([`photos/${photoPath}`]);
      }

      if (videoUrl) {
        const videoPath = videoUrl.split("/").pop();
        await supabase.storage
          .from("media")
          .remove([`videos/${videoPath}`]);
      }

      // Update local state
      setTestimonials(testimonials.filter(t => t.id !== testimonialId));

    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setError("Failed to delete testimonial");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "photo") setPhotoFile(files[0]);
    if (name === "video") setVideoFile(files[0]);
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error(`Error uploading ${folder}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const [photoUrl, videoUrl] = await Promise.all([
        uploadFile(photoFile, "photos"),
        videoFile ? uploadFile(videoFile, "videos") : Promise.resolve(null)
      ]);

      if (!photoUrl) throw new Error("Photo upload failed");

      const { data, error: insertError } = await supabase
        .from("testimonials")
        .insert([{
          ...newTestimonial,
          photo_url: photoUrl,
          video_url: videoUrl,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setTestimonials((prev) => [data, ...prev]);
      setNewTestimonial({ name: "", age: "", problem: "" });
      setPhotoFile(null);
      setVideoFile(null);
      e.target.reset();

    } catch (error) {
      console.error("Error adding testimonial:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="testimonials-container">
      <h1>Patient Testimonials</h1>

      {/* Added Admin Toggle Button */}
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="admin-toggle"
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: isAdmin ? '#4CAF50' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Admin Mode: {isAdmin ? 'ON' : 'OFF'}
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="testimonial-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Patient's Name"
            value={newTestimonial.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Patient's Age"
            value={newTestimonial.age}
            onChange={handleChange}
            required
          />
        </div>
        
        <textarea
          name="problem"
          placeholder="Problem Description"
          value={newTestimonial.problem}
          onChange={handleChange}
          required
          rows="3"
        />
        
        <div className="file-inputs">
          <div className="file-group">
            <label>Photo *</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="file-group">
            <label>Video (optional)</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? "Adding..." : "Add Testimonial"}
        </button>
      </form>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            {isAdmin && (
              <button
                onClick={() => handleDelete(testimonial.id, testimonial.photo_url, testimonial.video_url)}
                className="delete-button"
                disabled={deleteLoading === testimonial.id}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(255, 0, 0, 0.8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1
                }}
              >
                <Trash2 className={`h-5 w-5 ${deleteLoading === testimonial.id ? 'animate-spin' : ''}`} />
              </button>
            )}
            <img
              src={testimonial.photo_url}
              alt={testimonial.name}
              className="testimonial-photo"
            />
            <div className="testimonial-content">
              <h2>
                {testimonial.name}, {testimonial.age}
              </h2>
              <p className="problem-text">{testimonial.problem}</p>
              {testimonial.video_url && (
                <video controls className="testimonial-video">
                  <source src={testimonial.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;