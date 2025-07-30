import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./Callback.css";

const Callback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1),
        );
        const queryParams = new URLSearchParams(window.location.search);

        const token_hash =
          hashParams.get("token_hash") || queryParams.get("token_hash");
        const type = hashParams.get("type") || queryParams.get("type");

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type,
          });

          if (!error) {
            navigate("/");
          } else {
            setError("Invalid or expired authentication link.");
          }
        } else {
          setError("Missing authentication parameters.");
        }
      } catch (err) {
        setError("An error occurred during authentication.");
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="callback-container">
        <div className="callback-content error">
          <div className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")} className="home-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="callback-container">
      <div className="callback-content">
        <div className="loading-spinner"></div>
        <h2>Verifying your login...</h2>
        <p>Please wait while we authenticate your session.</p>
      </div>
    </div>
  );
};

export default Callback;
