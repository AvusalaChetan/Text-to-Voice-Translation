import type {JSX} from "react";
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
  const selectSourceLang = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSourceLanguage(e.target.value);
  };
  const selectTargetLang = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:grid-cols-[1fr_auto_1fr]">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
          From
        </span>
        <div className="relative">
          <select
            value={sourceLanguage}
            onChange={selectSourceLang}
            className="h-12 w-full appearance-none rounded-2xl border border-transparent bg-white/90 px-4 pr-10 text-sm text-black focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <option value="" disabled>
              Select source language
            </option>
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/60">
            v
          </span>
        </div>
      </div>

      <button
        className="mx-auto mt-3 h-12 w-12 rounded-2xl border border-white/10 bg-white/10 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:-translate-y-0.5 hover:bg-white/20 sm:mt-6"
        onClick={() => {
          const temp = sourceLanguage;
          setSourceLanguage(targetLanguage);
          setTargetLanguage(temp);
        }}
        aria-label="Swap languages"
      >
        Swap
      </button>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
          To
        </span>
        <div className="relative">
          <select
            value={targetLanguage}
            onChange={selectTargetLang}
            className="h-12 w-full appearance-none rounded-2xl border border-transparent bg-white/90 px-4 pr-10 text-sm text-black focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <option value="">Select target language</option>
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/60">
            v
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectLang;
