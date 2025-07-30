import React from "react";
import { useAuth } from "../hooks/useAuth";
import "./ProtectedCard.css";

export function ProtectedCard({ children, requiredRole, className = "" }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className={`protected-card loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={`protected-card unauthenticated ${className}`}>
        <div className="lock-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 9V7a5 5 0 0110 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h1zm2-2a3 3 0 016 0v2H9V7z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="auth-message">Please log in to view this content</p>
        <button
          onClick={() => {
            const loginButton = document.querySelector(".header-right button");
            if (loginButton) loginButton.click();
          }}
          className="login-prompt-button"
        >
          Log In
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedCard;
