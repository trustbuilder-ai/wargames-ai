import React from "react";

const EmailInput = ({ 
  email, 
  onEmailChange, 
  onSubmit, 
  loading = false,
  error = "",
  placeholder = "Email address",
  buttonText = "Send OTP",
  className = ""
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
        placeholder={placeholder}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        autoFocus
        disabled={loading}
      />
      
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading || !email.trim()}
      >
        {loading ? "Sending..." : buttonText}
      </button>
    </form>
  );
};

export default EmailInput;