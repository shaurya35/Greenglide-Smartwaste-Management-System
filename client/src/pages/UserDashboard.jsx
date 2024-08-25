import React, { useRef, useState, useEffect } from 'react';
import '../styles/UserDashboard.css'; // Import the CSS file

const UserDashboard = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const downloadLinkRef = useRef(null);
  const fileInputRef = useRef(null);

  // Function to start the video stream
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  // Function to get user's location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  };

  // Function to capture photo and overlay information
  const capturePhoto = () => {
    if (latitude !== null && longitude !== null) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();

      context.font = "20px Arial";
      context.fillStyle = "red";
      context.fillText(`Lat: ${latitude}, Long: ${longitude}`, 10, canvas.height - 50);
      context.fillText(`Date: ${date}, Time: ${time}`, 10, canvas.height - 20);

      const imageDataUrl = canvas.toDataURL('image/png');
      const downloadLink = downloadLinkRef.current;
      downloadLink.href = imageDataUrl;
      downloadLink.click();
    } else {
      console.error("Location not available yet.");
    }
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImageUrl = reader.result;
        setUploadedImage(uploadedImageUrl);
        localStorage.setItem('uploadedImageUrl', uploadedImageUrl); // Save to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    startVideo();
    getLocation();
    // Load image from local storage
    const savedImageUrl = localStorage.getItem('uploadedImageUrl');
    if (savedImageUrl) {
      setUploadedImage(savedImageUrl);
    }
  }, []);

  return (
    <div className="user-dashboard">
      <h1 className="title">Camera Capture with Location</h1>
      <div className="video-container">
        <video ref={videoRef} className="video" autoPlay></video>
      </div>
      <button className="capture-button" onClick={capturePhoto}>Capture Photo</button>
      <canvas ref={canvasRef} className="canvas" width="640" height="480"></canvas>
      <a ref={downloadLinkRef} className="download-link" download="captured-image.png"></a>

      <div className="upload-section">
        <h2 className="subtitle sora">Upload an Image</h2>
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploadedImage && (
          <div className="image-preview">
            <h3 className="image-title">Uploaded Image:</h3>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="uploaded-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
