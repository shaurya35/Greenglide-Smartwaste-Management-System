import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode"; // Ensure correct import
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [result, setResult] = useState("");
  const empId = "worker123";
  const navigate = useNavigate();

  useEffect(() => {
    let config = {
      fps: 50,
      qrbox: { width: 200, height: 150 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], 
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      config,
      false
    );

    const onScanSuccess = (qrCodeMessage) => {
      html5QrcodeScanner.clear().then(() => {
        console.log("QR code scanner stopped.");
      }).catch((error) => {
        console.error("Failed to clear QR code scanner:", error);
      });

      fetch(`/api/emp/${empId}/dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dustbinId: qrCodeMessage,
          workerId: empId,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          setResult(data);
          setTimeout(() => {
            navigate("/auth/employee/login");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
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
      html5QrcodeScanner.clear().catch((error) =>
        console.error("Failed to stop scanner:", error)
      );
    };
  }, [empId, navigate]);

  return (
    <main className="qr">
      <h1 className="sora qr_heading">Scan QR Code to Mark </h1>
      <div
        id="reader"
        style={{
          width: "360px",
          height: "350px",
          marginTop: "20px",
          backgroundColor: "var(--text)"
        }}
      ></div>
      <div id="result">{result}</div>
    </main>
  );
};

export default EmployeeDashboard;
