import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';

interface AutoFillDialogProps {
  /** Resolves to true when the answer was correct and the form was filled. */
  onSubmit: (answer: string) => Promise<boolean>;
  onClose: () => void;
}

function AutoFillDialog({ onSubmit, onClose }: AutoFillDialogProps) {
  const { ui } = useTranslation();
  const [answer, setAnswer] = useState('');
  const [checking, setChecking] = useState(false);
  const [wrong, setWrong] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || checking) return;
    setChecking(true);
    setWrong(false);
    const ok = await onSubmit(answer);
    setChecking(false);
    if (!ok) setWrong(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="autofill-title"
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 text-gray-900 shadow-xl [color-scheme:light]"
      >
        <h2 id="autofill-title" className="text-xl font-bold text-primary">
          {ui.autoFillTitle}
        </h2>
        <p className="text-sm text-gray-600">{ui.autoFillIntro}</p>
        <div>
          <label
            htmlFor="autofill-answer"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            {ui.autoFillQuestion}
          </label>
          <input
            id="autofill-answer"
            ref={inputRef}
            type="text"
            autoComplete="off"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setWrong(false);
            }}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {wrong && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {ui.autoFillWrong}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
          >
            {ui.cancel}
          </button>
          <button
            type="submit"
            disabled={checking}
            className="rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {checking ? ui.checking : ui.unlock}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AutoFillDialog;
