import {type JSX, useEffect, useState} from "react";

const Transcript = ({transcript,targetLanguage}: {transcript: string,targetLanguage:string}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    const trimmed = transcript.trim();
    if (!trimmed) {
      setSpeechError("Nothing to read yet.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      setSpeechError("Speech Synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(trimmed);
    utterance.lang = targetLanguage
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechError("Speech synthesis failed.");
    };

    setSpeechError(null);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
            Translated output
          </span>
          <span className="text-lg font-semibold text-white">Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isSpeaking ? handleStop : handleSpeak}
            className="h-10 rounded-full border border-white/10 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/20"
          >
            {isSpeaking ? "Stop" : "Speak"}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-10 w-10 rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20"
            aria-label={
              isExpanded ? "Collapse transcript" : "Expand transcript"
            }
          >
            {isExpanded ? "-" : "+"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            {transcript}
          </p>
          {speechError && (
            <p className="text-xs text-rose-200">{speechError}</p>
          )}
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
            <span>Streaming</span>
            <span>{transcript.length} chars</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;
