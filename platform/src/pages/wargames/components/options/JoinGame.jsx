import React from "react";
import OtpInputStyled from "../../../../components/auth/OtpInputStyled";

const JoinGame = ({ 
  session,
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
  setOtpMessage
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
        <i data-lucide="gamepad-2" className="w-4 h-4 mr-2"></i>
        JOIN GAME
      </h3>
      <div className="space-y-3">
        {session ? (
          <>
            <input
              type="email"
              className="cyber-input w-full text-sm"
              placeholder="Player Email"
              value={session.user.email}
              readOnly
            />
            <button className="cyber-button w-full text-sm">
              JOIN SESSION
            </button>
          </>
        ) : showOtpInput ? (
          <OtpInputStyled
            email={playerEmail}
            otp={otp}
            onOtpChange={(value) => {
              setOtp(value);
              setJoinGameError(""); // Clear error on input change
            }}
            onVerify={handleOtpVerification}
            onCancel={() => {
              setShowOtpInput(false);
              setOtp("");
              setOtpMessage("");
              setJoinGameError("");
            }}
            loading={joinGameLoading}
            error={joinGameError}
            message={otpMessage}
            variant="cyber"
          />
        ) : (
          <>
            <input
              type="email"
              className="cyber-input w-full text-sm"
              placeholder="Player Email"
              value={playerEmail}
              onChange={(e) => {
                setPlayerEmail(e.target.value);
                setJoinGameError(""); // Clear error on input change
              }}
            />
            {joinGameError && (
              <p className="text-red-400 text-xs">{joinGameError}</p>
            )}
            <button 
              className="cyber-button w-full text-sm"
              onClick={handleJoinSession}
              disabled={joinGameLoading}
            >
              {joinGameLoading ? "Sending..." : "JOIN SESSION"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinGame;