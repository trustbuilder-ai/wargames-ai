import React from "react";

const OtpInput = ({ 
  email, 
  otp, 
  onOtpChange, 
  onVerify, 
  onCancel,
  loading = false,
  error = "",
  message = "",
  className = ""
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

  return (
    <form onSubmit={handleSubmit} className={className}>
      <p className="text-sm text-gray-400 mb-2">
        Enter the 6-digit code sent to {email}
      </p>
      
      <input
        type="text"
        className={`w-full px-3 py-2 border border-gray-300 rounded-md mb-3 ${className.includes('cyber-') ? 'cyber-input' : ''}`}
        placeholder="000000"
        value={otp}
        onChange={handleChange}
        maxLength={6}
        style={{ letterSpacing: "0.5em", textAlign: "center" }}
        autoFocus
        disabled={loading}
      />
      
      {message && (
        <div className="text-green-500 text-sm mb-2">{message}</div>
      )}
      
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-2"
        disabled={loading || otp.length !== 6}
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>
      
      {onCancel && (
        <button
          type="button"
          className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
          onClick={onCancel}
          disabled={loading}
        >
          Use different email
        </button>
      )}
    </form>
  );
};

export default OtpInput;