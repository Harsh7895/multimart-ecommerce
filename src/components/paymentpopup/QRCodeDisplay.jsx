import React from "react";
// import { QRCodeSVG } from "qrcode.react";

const QRCodeDisplay = ({ amount = 0 }) => {
  const upiId = "your-upi-id@upi";
  const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${amount.toFixed(
    2
  )}&cu=INR`;

  return (
    <div className="qr-code-container">
      {/* <QRCodeSVG value={upiLink} size={200} />? */}
      <img src="/qr.jpg" alt="qr" height={200} width={200} />
      <p>Scan this QR code to pay ${amount.toFixed(2)}</p>
    </div>
  );
};

export default QRCodeDisplay;
