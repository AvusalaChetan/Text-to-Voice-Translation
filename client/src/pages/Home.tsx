import {useState} from "react";
import SelectLang from "../components/SelectLang";
import {COLORS} from "../const/colors";
import MicroPhone from "../components/MicroPhone";
import Transcript from "../components/Transcript";

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Hindi");
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState(
    "Namaste, how may I assist you today?",
  );

// creating web audio fn 

const startRecording = async () => {
  try {
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  } catch (error) {
    console.log("Error accessing audio input:", error);
  }
}
const stopReacording = () => {}




  return (
    <div className="flex flex-col items-center justify-center h-full px-5 py-10 gap-10">
      {/* Title Section */}
      <div className="text-center mt-5">
        <h1
          className="text-6xl font-bold mb-2.5 tracking-wider"
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

      <SelectLang
        sourceLanguage={sourceLanguage}
        setSourceLanguage={setSourceLanguage}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
      />

      <MicroPhone isListening={isListening} setIsListening={setIsListening} />

      <Transcript transcript={transcript} />
    </div>
  );
};

export default Home;
