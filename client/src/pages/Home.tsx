import {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import Heading from "../components/Heading";
import MicroPhone from "../components/MicroPhone";
import SelectLang from "../components/SelectLang";
import Transcript from "../components/Transcript";
import {ERROR_MESSAGE, TEXT, TRANSCRIPT} from "../const/events";

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [transcript, setTranscript] = useState<string>(
    "your translated text will appear here",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);

  const socketUrl: string = import.meta.env.VITE_SOCKET_URL;

  useEffect(() => {
    socketRef.current = io(socketUrl);
    socketRef.current.on(TRANSCRIPT, ({transcript}) => {
      if (!transcript) console.log("transcript is empty");
      setTranscript(transcript);
      setIsLoading(false);
    });
    socketRef.current.on(ERROR_MESSAGE, (err) => {
      console.error("Connection error:", err);
      setError("Connection error: " + err.message);
      setIsLoading(false);
    });

    return () => {
      socketRef.current?.off(TRANSCRIPT);
      socketRef.current?.off(ERROR_MESSAGE);
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSubmitText = (text: string) => {
    if (!sourceLanguage || !targetLanguage) {
      setError("Pick both source and target languages before sending.");
      return;
    }
    setError("");
    setIsLoading(true);
    socketRef.current?.emit(TEXT, {
      text,
      sourceLanguage,
      targetLanguage,
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="pointer-events-none absolute -top-32 right-10 h-72 w-72 rounded-full bg-amber-300/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-teal-300/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <Heading />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <SelectLang
              sourceLanguage={sourceLanguage}
              setSourceLanguage={setSourceLanguage}
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
            />

            <MicroPhone onSubmitText={handleSubmitText} isSending={isLoading} />

            {error && (
              <div className="rounded-2xl border border-rose-200/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="rounded-2xl border border-amber-200/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                started translating 
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs uppercase tracking-[0.2em] text-white/60">
              Real-time translation powered by your socket server
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Transcript
              targetLanguage={targetLanguage}
              transcript={transcript}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/40">
          <span>v1.0.0</span>
          <span> Lingo.dev</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
