import React, {type JSX} from "react";
import {COLORS} from "../const/colors";

const MicroPhone = ({
  isListening,
  setIsListening,
  onclick,
}: {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  onclick: () => void;
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center gap-8">
        <div className="flex items-center gap-1">
          {[20, 35, 45, 30, 25, 40, 35, 20].map((height, idx) => (
            <div
              key={`left-${idx}`}
              className="w-1 bg-gradient-to-t from-pink-500/40 to-pink-500/80 rounded-full transition-all duration-300"
              style={{
                height: isListening ? `${height}px` : "15px",
                animation: isListening
                  ? `wave 1s ease-in-out ${idx * 0.1}s infinite alternate`
                  : "none",
              }}
            />
          ))}
        </div>

        {/* Microphone with Glow Rings */}
        <div className="relative flex items-center justify-center">
          {isListening && (
            <div
              className="absolute w-48 h-48 rounded-full border-4 opacity-60"
              style={{
                borderColor: "#ff1b6b",
                boxShadow:
                  "0 0 60px rgba(255, 27, 107, 0.6), inset 0 0 60px rgba(255, 27, 107, 0.3)",
                animation: "pulse-ring 2s ease-in-out infinite",
              }}
            />
          )}

          {/* Middle Ring */}
          {isListening && (
            <div
              className="absolute w-36 h-36 rounded-full border-4 opacity-80"
              style={{
                borderColor: "#ff1b6b",
                boxShadow: "0 0 40px rgba(255, 27, 107, 0.7)",
                animation: "pulse-ring 2s ease-in-out 0.3s infinite",
              }}
            />
          )}

          {/* Microphone Button */}
          <button
            onClick={() => {
              setIsListening(!isListening);
              onclick();
            }}
            className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            style={{
              backgroundColor: isListening ? "#1a0a1f" : "#1e293b",
              boxShadow: isListening
                ? "0 0 40px rgba(255, 27, 107, 0.8), inset 0 0 30px rgba(255, 27, 107, 0.2)"
                : "0 0 20px rgba(0, 212, 255, 0.3)",
            }}
          >
            {/* Microphone Icon */}
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
                fill={isListening ? "#ff1b6b" : COLORS.text.primary}
                stroke={isListening ? "#ff1b6b" : COLORS.text.primary}
                strokeWidth="1.5"
              />
              <path
                d="M19 10V12C19 15.866 15.866 19 12 19C8.134 19 5 15.866 5 12V10"
                stroke={isListening ? "#ff1b6b" : COLORS.text.primary}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 19V23M8 23H16"
                stroke={isListening ? "#ff1b6b" : COLORS.text.primary}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Right Sound Waves */}
        <div className="flex items-center gap-1">
          {[25, 40, 30, 45, 35, 20, 30, 25].map((height, idx) => (
            <div
              key={`right-${idx}`}
              className="w-1 bg-gradient-to-t from-pink-500/40 to-pink-500/80 rounded-full transition-all duration-300"
              style={{
                height: isListening ? `${height}px` : "15px",
                animation: isListening
                  ? `wave 1s ease-in-out ${idx * 0.1}s infinite alternate`
                  : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Listening Status */}
      <p
        className="text-base font-light"
        style={{color: COLORS.text.secondary}}
      >
        {isListening ? "Listening..." : "Click to start"}
      </p>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes wave {
          0% { transform: scaleY(0.5); opacity: 0.5; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MicroPhone;
