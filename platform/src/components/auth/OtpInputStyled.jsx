import React from "react";

const OtpInputStyled = ({ 
  email, 
  otp, 
  onOtpChange, 
  onVerify, 
  onCancel,
  loading = false,
  error = "",
  message = "",
  variant = "default" // "default" | "cyber"
}) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    onOtpChange(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify();
    }
  };

  // Style classes based on variant
  const styles = {
    default: {
      input: "w-full px-3 py-2 border border-gray-300 rounded-md mb-3",
      button: "w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-2",
      cancelButton: "w-full text-sm text-gray-600 hover:text-gray-800 underline",
      message: "text-green-500 text-sm mb-2",
      error: "text-red-500 text-sm mb-2",
      description: "text-sm text-gray-600 mb-2"
    },
    cyber: {
      input: "cyber-input w-full text-sm",
      button: "cyber-button w-full text-sm",
      cancelButton: "text-xs text-gray-500 hover:text-gray-300 underline",
      message: "text-green-400 text-xs",
      error: "text-red-400 text-xs",
      description: "text-sm text-gray-400 mb-2"
    }
  };

  const currentStyle = styles[variant] || styles.default;

  return (
    <form onSubmit={handleSubmit}>
      <p className={currentStyle.description}>
        Enter the 6-digit code sent to {email}
      </p>
      
      <input
        type="text"
        className={currentStyle.input}
        placeholder="000000"
        value={otp}
        onChange={handleChange}
        maxLength={6}
        style={{ letterSpacing: "0.5em", textAlign: "center" }}
        autoFocus
        disabled={loading}
      />
      
      {message && (
        <p className={currentStyle.message}>{message}</p>
      )}
      
      {error && (
        <p className={currentStyle.error}>{error}</p>
      )}
      
      <button
        type="submit"
        className={currentStyle.button}
        disabled={loading || otp.length !== 6}
      >
        {loading ? "Verifying..." : variant === "cyber" ? "VERIFY CODE" : "Verify Code"}
      </button>
      
      {onCancel && (
        <button
          type="button"
          className={currentStyle.cancelButton}
          onClick={onCancel}
          disabled={loading}
        >
          Use different email
        </button>
      )}
    </form>
  );
};

export default OtpInputStyled;