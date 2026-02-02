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
    <>
          <div className="flex flex-col items-center gap-5">

      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer Glow Ring */}
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: `3px solid ${COLORS.accent.cyan}`,
            boxShadow: `0 0 40px ${COLORS.glow.cyan_glow}, inset 0 0 40px ${COLORS.glow.cyan_glow}`,
            animation: isListening ? "pulse 2s ease-in-out infinite" : "none",
          }}
        />

        {/* Microphone Icon */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "80px",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={() => {
            setIsListening(!isListening);
            onclick();
          }}
        >
          🎤
        </div>
      </div>
      
        {/* Listening Status */}
        <p
          className="text-lg italic"
          style={{
            color: COLORS.text.secondary,
          }}
        >
          {isListening ? "Listening..." : "Not listening"}
        </p>
      </div>
    </>
  );
};

export default MicroPhone;
