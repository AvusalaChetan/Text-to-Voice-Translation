import {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import MicroPhone from "../components/MicroPhone";
import SelectLang from "../components/SelectLang";
import Transcript from "../components/Transcript";
import {COLORS} from "../const/colors";
import {AUDIO_MESSAGE} from "../const/events";

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("English");
  const [targetLanguage, setTargetLanguage] = useState<string>("Hindi");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [transcript, setTranscript] = useState<string>(
    "Namaste, how may I assist you today?",
  );

  // Use refs to persist across renders (don't reset on every render)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);

  async function startRecording(): Promise<void> {
    try {
      // If already listening, stop recording
      if (isListening && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsListening(false);
        return;
      }

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;

      // Create MediaRecorder instance and setting in ref --> mediaRecorderRef
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      // stop function
      mediaRecorder.onstop = async () => {
        //important to create blob here to capture all chunks
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        console.log("Recording stopped, audio blob created:", audioBlob);

        const buffer = await audioBlob.arrayBuffer();
        
        const payload = {
          buffer,
          mimeType: "audio/wav",
          sourceLanguage,
          targetLanguage,
        };
        socketRef.current?.emit(AUDIO_MESSAGE, payload);
        console.log("buffer sent via socket:", buffer);

        const audioUrl = URL.createObjectURL(audioBlob);
        setUrl(audioUrl);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      alert("Error accessing microphone: " + (error as Error).message);
      setIsListening(false);
    }
  }

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("transcript", ({transcript}) => {
      console.log("Received", transcript);
      if (!transcript) console.log("transcript is empty");
      setTranscript(transcript);
    });
    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setError("Connection error: " + err.message);
    });

    return () => {
      socketRef.current?.off("transcript");
      socketRef.current?.off("connect_error");
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-full px-5 ">
      {/* Title Section */}
      <div className="text-center mt-5">
        <h1
          className="text-4xl font-bold mb-2.5 tracking-wider"
          style={{
            color: COLORS.text.primary,
          }}
        >
          V2V Translate
        </h1>
        <p
          className="text-base font-light"
          style={{
            color: COLORS.text.secondary,
          }}
        >
          Powered by Gemini 2.5 Live
        </p>
      </div>

      {/* Language Selection */}
      <SelectLang
        sourceLanguage={sourceLanguage}
        setSourceLanguage={setSourceLanguage}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
      />

      {/* Microphone Button */}
      <MicroPhone
        isListening={isListening}
        setIsListening={setIsListening}
        onclick={startRecording}
      />

      {/* Audio Playback */}
      {url && (
        <audio
          controls
          src={url}
          className="w-full max-w-md  rounded-lg p-2 h-12 "
          style={{
            // borderColor: COLORS.border.primary,
            backgroundColor: `rgba(0, 212, 255, 0.05)`,
          }}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Transcript Display/// */}
      <Transcript transcript={transcript} />
    </div>
  );
};

export default Home;
