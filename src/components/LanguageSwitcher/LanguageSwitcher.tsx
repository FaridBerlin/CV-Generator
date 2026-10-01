import type { Lang } from '../../i18n/translations';

interface LanguageSwitcherProps {
  lang: Lang;
  langs: Lang[];
  onChange: (lang: Lang) => void;
  label: string;
}

// Inline SVG flags: emoji flags don't render on Windows.
const UsFlag = () => (
  <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true" className="rounded-sm">
    <rect width="28" height="20" fill="#fff" />
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
    ))}
    <rect width="12" height={(20 * 7) / 13} fill="#3c3b6e" />
    {[1.5, 4.5, 7.5, 10.5].flatMap((x) =>
      [1.5, 3.5, 5.5, 7.5].map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.6" fill="#fff" />
      ))
    )}
  </svg>
);

const DeFlag = () => (
  <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true" className="rounded-sm">
    <rect width="28" height="20" fill="#ffce00" />
    <rect width="28" height="13.34" fill="#dd0000" />
    <rect width="28" height="6.67" fill="#000" />
  </svg>
);

const options: Record<Lang, { name: string; Flag: () => React.JSX.Element }> = {
  en: { name: 'English', Flag: UsFlag },
  de: { name: 'Deutsch', Flag: DeFlag },
};

function LanguageSwitcher({ lang, langs, onChange, label }: LanguageSwitcherProps) {
  return (
    <div role="group" aria-label={label} className="flex justify-end gap-2">
      {langs.map((code) => {
        const { name, Flag } = options[code];
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            title={name}
            aria-label={name}
            aria-pressed={active}
            onClick={() => onChange(code)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 ${
              active
                ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Flag />
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
