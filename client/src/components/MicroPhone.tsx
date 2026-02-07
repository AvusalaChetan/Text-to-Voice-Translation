import {useState, type JSX} from "react";

type MicroPhoneProps = {
  onSubmitText: (text: string) => void;
  isSending: boolean;
};

const MicroPhone = ({
  onSubmitText,
  isSending,
}: MicroPhoneProps): JSX.Element => {
  const [sourceText, setSourceText] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSubmit = () => {
    const trimmed = sourceText.trim();

    if (!trimmed || isSending) {
      setHasInteracted(true);
      return;
    }
    onSubmitText(trimmed);
    setSourceText("");
    setHasInteracted(false);
  };

  const hasError = hasInteracted && sourceText.trim().length === 0;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative rounded-3xl border border-white/10 bg-black/40 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
        <div className="absolute -top-3 left-6 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
          Text input
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="Write a sentence to translate"
            className="h-12 w-full rounded-2xl border border-transparent bg-white/90 px-4 text-sm text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
            aria-invalid={hasError}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSending}
            className="h-12 shrink-0 rounded-2xl bg-amber-300 px-5 text-sm font-semibold uppercase tracking-wide text-black shadow-[0_12px_30px_-16px_rgba(251,191,36,0.9)] transition hover:-translate-y-0.5 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Sending" : "Translate"}
          </button>
        </div>
        {hasError && (
          <p className="mt-3 text-xs text-rose-200">Add text before sending.</p>
        )}
      </div>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/50">
        <span>Press Enter to send</span>
        <span>{sourceText.length} chars</span>
      </div>
    </div>
  );
};

export default MicroPhone;
