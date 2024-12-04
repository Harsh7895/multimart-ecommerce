import React, { useState } from "react";
// import { X } from "lucide-react";
import "./PaymentMethodsPopup.css";
import QRCodeDisplay from "./QRCodeDisplay";

const PaymentMethodsPopup = ({ onClose, amount = 0 }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          {/* <X size={24} /> */}
          <h3>X</h3>
        </button>
        <h2>Payment Methods</h2>
        <div className="payment-methods">
          <div className="payment-method">
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              onChange={() => handleMethodChange("credit-card")}
              checked={selectedMethod === "credit-card"}
            />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
          <div className="payment-method">
            <input
              type="radio"
              id="paypal"
              name="payment-method"
              onChange={() => handleMethodChange("paypal")}
              checked={selectedMethod === "paypal"}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div className="payment-method">
            <input
              type="radio"
              id="bank-transfer"
              name="payment-method"
              onChange={() => handleMethodChange("bank-transfer")}
              checked={selectedMethod === "bank-transfer"}
            />
            <label htmlFor="bank-transfer">Bank Transfer</label>
          </div>
          <div className="payment-method">
            <input
              type="radio"
              id="upi-qr"
              name="payment-method"
              onChange={() => handleMethodChange("upi-qr")}
              checked={selectedMethod === "upi-qr"}
            />
            <label htmlFor="upi-qr">UPI QR</label>
          </div>
        </div>
        {selectedMethod === "upi-qr" ? (
          <QRCodeDisplay amount={amount} />
        ) : (
          <button className="save-button">Pay ${amount.toFixed(2)}</button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsPopup;
