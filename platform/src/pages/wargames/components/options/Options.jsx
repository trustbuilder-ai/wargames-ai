import React from "react";
import AuthStatus from "./AuthStatus";
import ThemeSelector from "./ThemeSelector";
import JoinGame from "./JoinGame";
// import ToolsPanel from "./ToolsPanel";  // Intentionally not displayed
// import ModeSelector from "./ModeSelector";  // Intentionally not displayed
// import EvalPanel from "./EvalPanel";  // Intentionally not displayed

const Options = ({ 
  session,
  theme,
  onThemeChange,
  playerEmail,
  setPlayerEmail,
  showOtpInput,
  otp,
  setOtp,
  joinGameLoading,
  joinGameError,
  setJoinGameError,
  otpMessage,
  handleJoinSession,
  handleOtpVerification,
  setShowOtpInput,
  setOtpMessage,
  onHistoryClick,
  onExportClick,
  onSettingsClick,
  onHelpClick,
  onModeChange,
  onRunEval,
  onViewResults
}) => {
  return (
    <div className="cyber-card">
      <h2 className="text-xl font-semibold text-green-400 mb-6">OPTIONS</h2>
      
      <AuthStatus session={session} />
      
      <ThemeSelector theme={theme} onThemeChange={onThemeChange} />
      
      {/* Only show Join Game component when user is not authenticated */}
      {!session && (
        <JoinGame 
          session={session}
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
      )}
      
      {/* Tools Panel - Intentionally not displayed 
      <ToolsPanel 
        onHistoryClick={onHistoryClick}
        onExportClick={onExportClick}
        onSettingsClick={onSettingsClick}
        onHelpClick={onHelpClick}
      />
      */}
      
      {/* Mode Selector - Intentionally not displayed
      <ModeSelector 
        initialMode="single"
        onModeChange={onModeChange}
      />
      */}
      
      {/* Eval Panel - Intentionally not displayed
      <EvalPanel 
        onRunEval={onRunEval}
        onViewResults={onViewResults}
      />
      */}
    </div>
  );
};

export default Options;