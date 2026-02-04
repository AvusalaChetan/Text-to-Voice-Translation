import {useRef} from "react";
import type {Socket} from "socket.io-client";
import {TEXT} from "../../const/events";
import {languages} from "../../const/langs";

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  start(): void;
  stop(): void;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

type TranslationFeatProp = {
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  sourceLanguage: string;
  targetLanguage: string;
  setError: (value: string) => void;
  socketRef: React.MutableRefObject<Socket | null>;
  setIsLoading: (value: boolean) => void;
};

const TranslationFeat = ({
  isListening,
  setIsListening,
  sourceLanguage,
  targetLanguage,
  setIsLoading,
  setError,
  socketRef,
}: TranslationFeatProp) => {
  // Define refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const useWebSpeechRef = useRef<boolean>(true);
  const shouldBeListeningRef = useRef<boolean>(false);
  const restartTimeoutRef = useRef<number | null>(null);
  const accumulatedTextRef = useRef<string>("");

  async function startRecording(): Promise<void> {
    try {
      // If already listening, stop
      if (isListening) {
        shouldBeListeningRef.current = false;
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = null;
        }
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        }
        
        // Send accumulated text when stopping
        if (accumulatedTextRef.current && accumulatedTextRef.current.trim()) {
          const payload = {
            text: accumulatedTextRef.current,
            sourceLanguage,
            targetLanguage,
          };
          socketRef.current?.emit(TEXT, payload);
          console.log("sending final...", payload.text, sourceLanguage, targetLanguage);
        }
        
        // Reset accumulated text
        accumulatedTextRef.current = "";
        setIsListening(false);
        setIsLoading(true);
        return;
      }

      // Reset accumulated text when starting new recording
      accumulatedTextRef.current = "";
      shouldBeListeningRef.current = true;

      // Try Web Speech API first
      const SpeechRecognitionConstructor =
        (window as unknown as {SpeechRecognition?: typeof SpeechRecognition})
          .SpeechRecognition ||
        (
          window as unknown as {
            webkitSpeechRecognition?: typeof SpeechRecognition;
          }
        ).webkitSpeechRecognition;

      if (SpeechRecognitionConstructor && useWebSpeechRef.current) {
        // Use Web Speech API
        const recognition = new SpeechRecognitionConstructor();
        recognitionRef.current = recognition;

        const langCode =
          languages.find((lang) => lang.label === sourceLanguage)?.value ||
          "en-US";

        recognition.lang = langCode;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setError("");
          setIsLoading(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          // Accumulate final results instead of sending immediately
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const text = event.results[i][0].transcript;
              accumulatedTextRef.current += (accumulatedTextRef.current ? " " : "") + text;
              console.log("Accumulated text:", accumulatedTextRef.current);
            }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Web Speech error:", event.error);
          if (event.error === "network" || event.error === "not-allowed") {
            // Fallback to MediaRecorder
            useWebSpeechRef.current = false;
            setIsListening(false);
            setTimeout(() => startRecording(), 100);
          } else {
            setError(`Error: ${event.error}`);
            setIsListening(false);
          }
        };

        recognition.onend = () => {
          // Only stop if we actually want to stop
          if (!shouldBeListeningRef.current) {
            setIsListening(false);
            setIsLoading(false);
          } else {
            // Restart recognition if it stopped but we still want to listen
            console.log("Recognition ended unexpectedly, restarting...");
            setTimeout(() => {
              if (shouldBeListeningRef.current && recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (e) {
                  console.error("Failed to restart recognition:", e);
                  setIsListening(false);
                  setIsLoading(false);
                  shouldBeListeningRef.current = false;
                }
              }
            }, 100);
          }
        };

        recognition.start();
      } else {
        // Fallback to MediaRecorder
        console.log("Using MediaRecorder (Web Speech not available)");

        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const buffer = await audioBlob.arrayBuffer();
          console.log("Audio blob size:", audioBlob.size, buffer);
          stream.getTracks().forEach((track) => track.stop());
          setIsListening(false);
        };

        mediaRecorder.start();
        setIsListening(true);
        setError("");
        console.log("MediaRecorder: Recording started");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error: " + (error as Error).message);
    }
  }

  return {startRecording};
};

export default TranslationFeat;
