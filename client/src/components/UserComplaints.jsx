import React, { useEffect, useState } from 'react';
import '../styles/UserComplaints.css'; 

const UploadComplaints = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch image URL from local storage
    const savedImageUrl = localStorage.getItem('uploadedImageUrl');
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    } else {
      console.error('No image found in local storage');
    }
  }, []);

  return (
    <div>
      <h1>Your Uploaded Image</h1>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>No image available.</p>
      )}
      <br />
      <a href="/">Upload another image</a>
    </div>
  );
};

export default UploadComplaints;
