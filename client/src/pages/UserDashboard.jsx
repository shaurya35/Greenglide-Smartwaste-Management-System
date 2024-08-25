import React, { useRef, useState } from "react";

const UserDashboard = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const downloadLinkRef = useRef(null);

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
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();

      context.font = "20px Arial";
      context.fillStyle = "red";
      context.fillText(
        `Lat: ${latitude}, Long: ${longitude}`,
        10,
        canvas.height - 50
      );
      context.fillText(`Date: ${date}, Time: ${time}`, 10, canvas.height - 20);

      const imageDataUrl = canvas.toDataURL("image/png");
      const downloadLink = downloadLinkRef.current;
      downloadLink.href = imageDataUrl;
      downloadLink.click();
    } else {
      console.error("Location not available yet.");
    }
  };

  React.useEffect(() => {
    startVideo();
    getLocation();
  }, []);

  return (
    <div>
      <h1>Camera Capture with Location</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      <button onClick={capturePhoto}>Capture Photo</button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>
      <a ref={downloadLinkRef} download="captured-image.png"></a>
    </div>
  );
};

export default UserDashboard;
