import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const EmployeeDashboard = () => {
  const [result, setResult] = useState('');
  const empId = 'worker123';  // You can dynamically set this as needed

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

      fetch(`/api/emp/${empId}/dashboard`, {
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
        // Remove the redirection after 2 seconds or perform any other action
      })
      .catch(error => {
        console.error('Error:', error);
        restartScanner();
      });
    };

    const onScanFailure = (error) => {
      console.warn(`QR code scan error: ${error}`);
    };

    const restartScanner = () => {
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    };

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      // Cleanup the scanner on component unmount
      html5QrcodeScanner.clear().catch(error => console.error('Failed to stop scanner:', error));
    };
  }, [empId]);

  return (
    <div>
      <h1>Scan QR Code to Mark Attendance</h1>
      <div id="reader" style={{ width: '300px', height: '300px' }}></div>
      <div id="result">{result}</div>
    </div>
  );
};

export default EmployeeDashboard;
