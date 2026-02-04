import {COLORS} from "../const/colors";

const Heading = () => {
  return (
    <div className="text-center mt-4 mb-2">
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tracking-wider"
        style={{
          color: COLORS.text.primary,
        }}
      >
        V2V Translate
      </h1>
      <p
        className="text-sm sm:text-base font-light"
        style={{
          color: COLORS.text.secondary,
        }}
      >
      version 1.0.0 - Real-time Voice-to-Voice Translation App
      </p>
    </div>
  );
};

export default Heading;
