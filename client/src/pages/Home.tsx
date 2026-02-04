import {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import TranslationFeat from "../components/feature/TranslationFeat";
import MicroPhone from "../components/MicroPhone";
import SelectLang from "../components/SelectLang";
import Transcript from "../components/Transcript";
import {COLORS} from "../const/colors";
import {ERROR_MESSAGE, TRANSCRIPT} from "../const/events";
import Heading from "../components/Heading";

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transcript, setTranscript] = useState<string>(
    "your translated text will appear here",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);
  const {startRecording} = TranslationFeat({
    isListening,
    setIsListening,
    sourceLanguage,
    targetLanguage,
    setError,
    socketRef,
    setIsLoading,
  });

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on(TRANSCRIPT, ({transcript}) => {
      console.log("Received", transcript);
      if (!transcript) console.log("transcript is empty");
      setTranscript(transcript);
    });
    socketRef.current.on(ERROR_MESSAGE, (err) => {
      console.error("Connection error:", err);
      setError("Connection error: " + err.message);
    });

    return () => {
      socketRef.current?.off(TRANSCRIPT);
      socketRef.current?.off(ERROR_MESSAGE);
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden">
      <div className="min-h-screen flex flex-col items-center justify-start gap-6 px-4 py-8 sm:px-6 md:px-8">
        <Heading />

        <div className="w-full max-w-3xl">
          <SelectLang
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
          />
        </div>

        <div className="flex flex-col items-center gap-4 my-6">
          <MicroPhone
            isListening={isListening}
            setIsListening={setIsListening}
            onclick={startRecording}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm px-4 py-2 bg-red-900/20 rounded-lg border border-red-500/30">
            {error}
          </p>
        )}

        {isLoading && isListening && (
          <p className="text-blue-400 text-sm px-4 py-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
            Processing speech...
          </p>
        )}

        <div className="w-full max-w-3xl mb-8">
          <Transcript transcript={transcript} />
        </div>

        <div className="fixed bottom-4 right-4 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="4" fill="#00d4ff" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              L
            </text>
          </svg>
          <span
            className="text-sm font-medium"
            style={{color: COLORS.text.secondary}}
          >
            Lingo.dev
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
