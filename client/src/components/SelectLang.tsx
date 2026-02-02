import {COLORS} from "../const/colors";
import {languages} from "../const/langs";

type SelectLangProps = {
  sourceLanguage: string;
  setSourceLanguage: React.Dispatch<React.SetStateAction<string>>;
  targetLanguage: string;
  setTargetLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const SelectLang = ({
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
}: SelectLangProps) => {
  const selectStyles = `
    select {
      color: white;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 16px;
      outline: none;
      appearance: none;
      padding-right: 20px;
    }

    select option {
      background-color: #1a2332;
      color: white;
      padding: 8px;
    }

    select option:hover {
      background-color: #2a3f5f;
    }

    select:focus {
      outline: none;
    }

    /* Custom dropdown arrow */
    select {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300d4ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 20px;
      padding-right: 32px;
    }
  `;
  console.log(sourceLanguage,targetLanguage)

  return (
    <>
      <style>{selectStyles}</style>
      <div
        className="flex items-center gap-5 p-6 border-2 rounded-lg w-full max-w-xl transition-all duration-300"
        style={{
          borderColor: COLORS.border.primary,
          backgroundColor: "rgba(0, 212, 255, 0.05)",
          boxShadow: `0 0 15px ${COLORS.glow.cyan_glow}40`,
        }}
      >
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className="flex-1 px-4 py-3 rounded transition-all duration-200 hover:bg-opacity-10 focus:bg-opacity-20"
          style={{
            color: COLORS.text.primary,
            backgroundColor: "rgba(0, 212, 255, 0.1)",
          }}
        >
          <option value="" disabled>
            Select Source Language
          </option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label} ({lang.value})
            </option>
          ))}
        </select>

        <button
          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer font-bold transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
          style={{
            backgroundColor: COLORS.accent.cyan,
            color: COLORS.background.primary,
            boxShadow: `0 0 20px ${COLORS.glow.cyan_glow}`,
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.glow.cyan_glow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.glow.cyan_glow}`;
          }}
          onClick={() => {
            const temp = sourceLanguage;
            setSourceLanguage(targetLanguage);
            setTargetLanguage(temp);
          }}
          aria-label="Swap languages"
        >
          
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            rotate="90"
          >
            <line x1="1" y1="4" x2="15" y2="4" />
            <polyline points="10 10 15 4 20 10" />
            <line x1="23" y1="20" x2="9" y2="20" />
            <polyline points="14 14 9 20 4 14" />
          </svg>
        </button>

        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="flex-1 px-4 py-3 rounded  transition-all duration-200 hover:bg-opacity-10 focus:bg-opacity-20 text-right"
          style={{
            color: COLORS.text.primary,
            backgroundColor: "rgba(0, 212, 255, 0.1)",
          }}
        >
          <option value="" className="text-left ">
            Select Target Language
          </option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value} className="text-left ">
              {lang.label} ({lang.value})
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectLang;
