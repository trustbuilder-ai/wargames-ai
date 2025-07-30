import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useApiData } from "../../hooks";
import { auth } from "../../lib/supabase";
import { getSampleMessagesSampleMessagesGet } from "../../backend_client/sdk.gen";
import useWargamesScripts from "./hooks/useWargamesScripts";
// import GameStatus from "./components/GameStatus";  // Intentionally not displayed
import ModelOutput from "./components/ModelOutput";
import Options from "./components/options/Options";
import "./WargamesChallenge.css";

const WargamesChallenge = () => {
  const { session } = useAuth();
  useWargamesScripts(); // Load external dependencies
  
  const [theme, setTheme] = useState(() => 
    localStorage.getItem("wargamesTheme") || "cyberpunk"
  );
  const [userInput, setUserInput] = useState("");
  const [gameStatus, setGameStatus] = useState({
    state: "READY",
    players: 0,
    round: "-",
    score: "0.00"
  });
  
  // Fetch sample messages from API if authenticated
  const sampleMessages = useApiData(getSampleMessagesSampleMessagesGet, {
    requiresAuth: true,
    enabled: !!session // Only fetch if user is authenticated
  });
  
  // Determine messages based on authentication state
  const getDisplayMessages = () => {
    if (!session) {
      return [{ type: "system", text: "User not authenticated. Unable to proceed." }];
    }
    
    if (sampleMessages.data) {
      // Transform API messages to match ModelOutput expected format
      return sampleMessages.data.map(msg => ({
        type: msg.role,
        text: msg.content
      }));
    }
    
    return [];
  };
  
  // State for JOIN GAME authentication
  const [playerEmail, setPlayerEmail] = useState("");
  const [joinGameLoading, setJoinGameLoading] = useState(false);
  const [joinGameError, setJoinGameError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  // Load theme CSS
  useEffect(() => {
    // Remove all existing wargames theme links
    const existingThemes = document.querySelectorAll('link[data-wargames-theme]');
    existingThemes.forEach(link => link.remove());

    // Create and add new theme link
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/src/pages/wargames/themes/${theme}.css`;
    themeLink.setAttribute('data-wargames-theme', theme);
    
    // Add to head
    document.head.appendChild(themeLink);
    
    // Save preference
    localStorage.setItem("wargamesTheme", theme);
    
    // Cleanup function to remove theme on unmount
    return () => {
      const linkToRemove = document.querySelector(`link[data-wargames-theme="${theme}"]`);
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [theme]);


  const handleSendMessage = () => {
    if (userInput.trim() && session) {
      // For now, just clear the input since we're using read-only API messages
      // In a real implementation, this would send to a different endpoint
      setUserInput("");
      
      // Could trigger a refresh of messages here if needed
      // sampleMessages.refetch();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleJoinSession = async () => {
    // Reset error
    setJoinGameError("");
    
    // Check if email is empty
    if (!playerEmail.trim()) {
      setJoinGameError("Please enter an email address");
      return;
    }
    
    // Validate email format
    if (!isValidEmail(playerEmail)) {
      setJoinGameError("Please enter a valid email address");
      return;
    }
    
    setJoinGameLoading(true);
    
    try {
      const { error } = await auth.signInWithOtp(playerEmail);
      
      if (error) throw error;
      
      // Successfully sent OTP
      setOtpMessage("Check your email for the 6-digit code!");
      setShowOtpInput(true);
    } catch (error) {
      setJoinGameError(error.message || "Failed to send verification code");
    } finally {
      setJoinGameLoading(false);
    }
  };
  
  const handleOtpVerification = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setJoinGameError("Please enter a 6-digit code");
      return;
    }
    
    setJoinGameLoading(true);
    setJoinGameError("");
    
    try {
      const { error } = await auth.verifyOtp(playerEmail, otp);
      
      if (error) throw error;
      
      // Successfully verified - user is now logged in
      setOtpMessage("Successfully logged in!");
      // Reset states
      setTimeout(() => {
        setShowOtpInput(false);
        setOtp("");
        setPlayerEmail("");
        setOtpMessage("");
      }, 1500);
    } catch (error) {
      setJoinGameError(error.message || "Invalid code. Please try again.");
    } finally {
      setJoinGameLoading(false);
    }
  };

  return (
    <div className="wargames-challenge-container cyber-grid">
      {/* Wargames Header */}
      <header className="wargames-header fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                WARGAMES-AI
              </h1>
              <span className="text-xs text-gray-500 uppercase">TrustBuilder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/wargames" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                ← Back to Dashboard
              </Link>
              <span className="text-sm text-gray-400">Connected to: wargames-ai.trb.ai</span>
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-8 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Model Output & User Input */}
          <div className="flex-1 flex flex-col gap-10">
            <ModelOutput 
              messages={getDisplayMessages()} 
              loading={session && sampleMessages.loading}
              error={session ? sampleMessages.error : null}
            />
            
            {/* User Input */}
            <div className="cyber-card glow-border-accent">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-cyan-400">USER INPUT</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Tokens: {userInput.length}/4096</span>
                </div>
              </div>
              <div className="space-y-4">
                <textarea
                  className="cyber-input w-full h-36 resize-none"
                  placeholder="Enter your prompt here..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button className="option-button">
                      <i data-lucide="paperclip" className="w-4 h-4"></i>
                    </button>
                    <button className="option-button">
                      <i data-lucide="mic" className="w-4 h-4"></i>
                    </button>
                  </div>
                  <button 
                    className="cyber-button flex items-center space-x-2"
                    onClick={handleSendMessage}
                  >
                    <i data-lucide="send" className="w-4 h-4"></i>
                    <span>EXECUTE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Options & Game Status */}
          <div className="w-full lg:w-96 space-y-10">
            <Options
              session={session}
              theme={theme}
              onThemeChange={setTheme}
              playerEmail={playerEmail}
              setPlayerEmail={setPlayerEmail}
              showOtpInput={showOtpInput}
              otp={otp}
              setOtp={setOtp}
              joinGameLoading={joinGameLoading}
              joinGameError={joinGameError}
              setJoinGameError={setJoinGameError}
              otpMessage={otpMessage}
              handleJoinSession={handleJoinSession}
              handleOtpVerification={handleOtpVerification}
              setShowOtpInput={setShowOtpInput}
              setOtpMessage={setOtpMessage}
            />

            {/* Game Status - Intentionally not displayed
            <GameStatus status={gameStatus} />
            */}
          </div>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-800">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-12 text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Model: GPT-4</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Latency: 42ms</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Requests: 127</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-400">● ONLINE</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default WargamesChallenge;