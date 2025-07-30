import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import { auth } from "../lib/supabase";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await auth.signInWithOtp(email);

      if (error) throw error;

      setMessage("Check your email for the 6-digit code!");
      setShowOtpInput(true);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await auth.verifyOtp(email, otp);

      if (error) throw error;

      setMessage("Successfully logged in!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setError(error.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login / Register</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {!showOtpInput ? (
          <form onSubmit={handleSubmit} className="login-form">
            <p className="form-description">
              Enter your email address to receive a one-time password
            </p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
              autoFocus
            />

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification} className="login-form">
            <p className="form-description">
              Enter the 6-digit code sent to {email}
            </p>

            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
              }}
              required
              className="email-input otp-input"
              autoFocus
              maxLength={6}
              style={{ letterSpacing: "0.5em", textAlign: "center" }}
            />

            <button
              type="submit"
              className="submit-button"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              className="resend-button"
              onClick={() => {
                setShowOtpInput(false);
                setOtp("");
                setMessage("");
                setError("");
              }}
              style={{
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Use different email
            </button>
          </form>
        )}

        {message && <div className="success-message">{message}</div>}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginModal;
