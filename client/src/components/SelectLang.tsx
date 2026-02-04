import type {JSX} from "@emotion/react/jsx-runtime";
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
}: SelectLangProps): JSX.Element => {
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

  const selectSourceLang = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSourceLanguage(e.target.value);
  };
  const selectTargetLang = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTargetLanguage(e.target.value);
  };

  return (
    <>
      <style>{selectStyles}</style>
      <div
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-4 sm:p-6 border-2 rounded-lg w-full transition-all duration-300"
        style={{
          borderColor: COLORS.border.primary,
          backgroundColor: "rgba(0, 212, 255, 0.05)",
          boxShadow: `0 0 15px ${COLORS.glow.cyan_glow}40`,
        }}
      >
        <select
          value={sourceLanguage}
          onChange={selectSourceLang}
          className="w-full sm:flex-1 px-4 py-3 rounded transition-all duration-200 hover:bg-opacity-10 focus:bg-opacity-20"
          style={{
            color: COLORS.text.primary,
            backgroundColor: "rgba(0, 212, 255, 0.1)",
          }}
        >
          <option value="" disabled>
            English (Source)
          </option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 16V4M7 4L3 8M7 4L11 8" />
            <path d="M17 8V20M17 20L21 16M17 20L13 16" />
          </svg>
        </button>

        <select
          value={targetLanguage}
          onChange={selectTargetLang}
          className="w-full sm:flex-1 px-4 py-3 rounded transition-all duration-200 hover:bg-opacity-10 focus:bg-opacity-20"
          style={{
            color: COLORS.text.primary,
            backgroundColor: "rgba(0, 212, 255, 0.1)",
          }}
        >
          <option value="" className="text-left">
            Hindi (Target)
          </option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value} className="text-left ">
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectLang;
