import React, { useState } from 'react';
import supabase from './SupabaseClient';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.update({ password });

    if (error) {
      console.error('Error updating password:', error.message);
      alert('Error updating password: ' + error.message);
    } else {
      alert('Password updated successfully!');
    }
  };

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleUpdatePassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;