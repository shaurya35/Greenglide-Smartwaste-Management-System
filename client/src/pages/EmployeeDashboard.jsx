import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [result, setResult] = useState('');
  const empId = 'worker123';  
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", { fps: 10, qrbox: 250 }
    );

    const onScanSuccess = (qrCodeMessage) => {
      html5QrcodeScanner.clear().then(() => {
        console.log("QR code scanner stopped.");
      }).catch(error => {
        console.error("Failed to clear QR code scanner:", error);
      });

      fetch('/api/emp/${empId}/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dustbinId: qrCodeMessage,
          workerId: empId
        })
      })
      .then(response => response.text())
      .then(data => {
        setResult(data);

        // Redirect after 2 seconds to give time for the user to see the result
        setTimeout(() => {
          navigate('/auth/employee/login');
        }, 2000);
      })
      .catch(error => {
        console.error('Error:', error);
        restartScanner();
      });
    };

    const onScanFailure = (error) => {
      console.warn('QR code scan error: ${error}');
    };

    const restartScanner = () => {
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    };

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      // Cleanup the scanner on component unmount
      html5QrcodeScanner.clear().catch(error => console.error('Failed to stop scanner:', error));
    };
  }, [empId, navigate]);

  return (
    <div>
      <h1>Scan QR Code to Mark Attendance</h1>
      <div id="reader" style={{ width: '300px', height: '300px' }}></div>
      <div id="result">{result}</div>
    </div>
  );
};

export default EmployeeDashboard;