import {type JSX, useState} from "react";
import {COLORS} from "../const/colors";

const Transcript = ({transcript}: {transcript: string}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className="w-full p-4 sm:p-6 border-2 rounded-lg shadow-lg transition-all duration-150"
      style={{
        borderColor: COLORS.border.primary,
        backgroundColor: "rgba(0, 212, 255, 0.05)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <label
          className="text-xs sm:text-sm font-bold tracking-wider uppercase"
          style={{
            color: COLORS.text.muted,
          }}
        >
          LIVE TRANSCRIPT
        </label>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-cyan-500/10 transition duration-150"
          style={{
            color: COLORS.accent.cyan,
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
          aria-label={isExpanded ? "Collapse transcript" : "Expand transcript"}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="flex justify-between items-start gap-3">
          <p
            className="text-sm sm:text-base leading-relaxed flex-1"
            style={{
              color: COLORS.text.cyan,
              lineHeight: "1.6",
            }}
          >
            {transcript}
          </p>

          <button
            className="cursor-pointer flex items-center gap-1 p-2 rounded-lg hover:bg-cyan-500/10 transition duration-150 flex-shrink-0"
            style={{
              color: COLORS.accent.cyan,
            }}
            aria-label="Play audio"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-sm hidden sm:inline">Play</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Transcript;
