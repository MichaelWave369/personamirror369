import { useMemo, useState } from 'react';

const LOCAL_CONSENT_LANGUAGE_KEY = 'personamirror369.consentLanguageBuilder.v1';

type LanguageMode = 'boundary' | 'repair' | 'clarify' | 'ask-consent' | 'slow-down';
type ToneMode = 'gentle' | 'clear' | 'firm';

const modes: Array<{ id: LanguageMode; label: string; help: string }> = [
  { id: 'boundary', label: 'Boundary', help: 'Name a limit without attacking.' },
  { id: 'repair', label: 'Repair', help: 'Own your part and reopen care.' },
  { id: 'clarify', label: 'Clarify', help: 'Ask for shared understanding.' },
  { id: 'ask-consent', label: 'Ask Consent', help: 'Check whether now is a good time.' },
  { id: 'slow-down', label: 'Slow Down', help: 'Create time before responding.' },
];

const tones: Array<{ id: ToneMode; label: string }> = [
  { id: 'gentle', label: 'Gentle' },
  { id: 'clear', label: 'Clear' },
  { id: 'firm', label: 'Firm' },
];

interface SavedLanguage {
  id: string;
  createdAt: string;
  mode: LanguageMode;
  tone: ToneMode;
  text: string;
}

export function ConsentLanguageBuilder() {
  const [mode, setMode] = useState<LanguageMode>('boundary');
  const [tone, setTone] = useState<ToneMode>('clear');
  const [observation, setObservation] = useState('I notice this conversation is moving faster than I can process.');
  const [feeling, setFeeling] = useState('I feel tense and want to stay respectful.');
  const [need, setNeed] = useState('I need a little time and a calmer pace.');
  const [request, setRequest] = useState('Can we pause and return to this later?');
  const [savedItems, setSavedItems] = useState<SavedLanguage[]>(() => loadSavedItems());
  const [status, setStatus] = useState('');

  const language = useMemo(
    () => buildLanguage({ mode, tone, observation, feeling, need, request }),
    [feeling, mode, need, observation, request, tone],
  );

  const markdown = useMemo(() => buildMarkdown(language, mode, tone), [language, mode, tone]);

  async function copyLanguage() {
    try {
      await navigator.clipboard.writeText(language);
      setStatus('Copied consent language.');
    } catch {
      setStatus('Clipboard copy was blocked. You can still select and copy the text.');
    }
  }

  function saveLanguage() {
    const nextItem: SavedLanguage = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      mode,
      tone,
      text: language,
    };
    const next = [nextItem, ...savedItems].slice(0, 20);
    setSavedItems(next);
    localStorage.setItem(LOCAL_CONSENT_LANGUAGE_KEY, JSON.stringify(next));
    setStatus('Saved language locally in this browser.');
  }

  function deleteSavedItem(id: string) {
    const next = savedItems.filter((item) => item.id !== id);
    setSavedItems(next);
    localStorage.setItem(LOCAL_CONSENT_LANGUAGE_KEY, JSON.stringify(next));
    setStatus('Deleted saved language.');
  }

  function clearSavedItems() {
    setSavedItems([]);
    localStorage.removeItem(LOCAL_CONSENT_LANGUAGE_KEY);
    setStatus('Cleared saved consent language in this browser.');
  }

  function downloadMarkdown() {
    downloadFile('personamirror369-consent-language.md', markdown, 'text/markdown;charset=utf-8');
    setStatus('Downloaded consent language Markdown.');
  }

  function downloadJson() {
    downloadFile('personamirror369-consent-language.json', JSON.stringify(savedItems, null, 2), 'application/json;charset=utf-8');
    setStatus('Downloaded saved consent language JSON.');
  }

  return (
    <section id="consent-language" className="panel interactive-panel language-panel">
      <div className="panel-heading">
        <p className="section-kicker">Consent Language Builder</p>
        <h2>Use self-owned words for safer truth.</h2>
        <p>
          Build a small “I” statement for boundaries, repair, clarification, consent, or slowing down.
          This tool supports dignity and choice; it does not promise agreement or control outcomes.
        </p>
      </div>

      <div className="language-grid">
        <article className="language-config-card">
          <div className="language-mode-grid" aria-label="Language mode selector">
            {modes.map((option) => (
              <button
                className={option.id === mode ? 'language-mode-button active' : 'language-mode-button'}
                key={option.id}
                onClick={() => setMode(option.id)}
                type="button"
              >
                <span>{option.label}</span>
                <em>{option.help}</em>
              </button>
            ))}
          </div>

          <label className="select-field">
            <span>Tone</span>
            <select value={tone} onChange={(event) => setTone(event.target.value as ToneMode)}>
              {tones.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-field">
            <span>Observation</span>
            <textarea value={observation} onChange={(event) => setObservation(event.target.value)} />
          </label>
          <label className="text-field">
            <span>Feeling</span>
            <textarea value={feeling} onChange={(event) => setFeeling(event.target.value)} />
          </label>
          <label className="text-field">
            <span>Need / boundary</span>
            <textarea value={need} onChange={(event) => setNeed(event.target.value)} />
          </label>
          <label className="text-field">
            <span>Request</span>
            <textarea value={request} onChange={(event) => setRequest(event.target.value)} />
          </label>
        </article>

        <article className="language-output-card">
          <div className="mask-card-topline">
            <span>Draft</span>
            <span>{mode}</span>
          </div>
          <blockquote>{language}</blockquote>
          <p>
            Before using it, check safety, timing, and consent. Smaller and slower is allowed.
          </p>
          <div className="report-actions">
            <button type="button" onClick={copyLanguage}>Copy text</button>
            <button type="button" onClick={saveLanguage}>Save local text</button>
            <button type="button" onClick={downloadMarkdown}>Download .md</button>
            <button type="button" onClick={downloadJson}>Export saved JSON</button>
            <a href="#integration-planner">Back to Integration</a>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>
      </div>

      <article className="saved-language-card">
        <div className="mask-card-topline">
          <span>Saved local language</span>
          <span>{savedItems.length}/20</span>
        </div>
        {savedItems.length === 0 ? (
          <p>No saved language yet.</p>
        ) : (
          <div className="saved-language-list">
            {savedItems.map((item) => (
              <article className="saved-language-item" key={item.id}>
                <div>
                  <strong>{item.mode} · {item.tone}</strong>
                  <p>{item.text}</p>
                  <em>{new Date(item.createdAt).toLocaleString()}</em>
                </div>
                <button type="button" onClick={() => deleteSavedItem(item.id)}>Delete</button>
              </article>
            ))}
          </div>
        )}
        <div className="report-actions">
          <button type="button" onClick={clearSavedItems}>Clear saved language</button>
        </div>
      </article>
    </section>
  );
}

function buildLanguage({
  mode,
  tone,
  observation,
  feeling,
  need,
  request,
}: {
  mode: LanguageMode;
  tone: ToneMode;
  observation: string;
  feeling: string;
  need: string;
  request: string;
}): string {
  const opening = getOpening(tone);
  const parts = [clean(opening), clean(observation), clean(feeling), clean(need), clean(request)];

  if (mode === 'repair') {
    return [clean(opening), 'I want to repair my part without rushing either of us.', clean(feeling), clean(need), clean(request)].join(' ').replace(/\s+/g, ' ').trim();
  }

  if (mode === 'clarify') {
    return [clean(opening), 'I may be missing something.', clean(observation), clean(request)].join(' ').replace(/\s+/g, ' ').trim();
  }

  if (mode === 'ask-consent') {
    return [clean(opening), 'I have something honest to share.', clean(need), clean(request)].join(' ').replace(/\s+/g, ' ').trim();
  }

  if (mode === 'slow-down') {
    return [clean(opening), clean(observation), clean(need), clean(request)].join(' ').replace(/\s+/g, ' ').trim();
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function getOpening(tone: ToneMode): string {
  if (tone === 'gentle') return 'Can I say this gently?';
  if (tone === 'firm') return 'I need to be direct and respectful.';
  return 'I want to be clear and kind.';
}

function clean(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function loadSavedItems(): SavedLanguage[] {
  const saved = localStorage.getItem(LOCAL_CONSENT_LANGUAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isSavedLanguage).slice(0, 20) : [];
  } catch {
    return [];
  }
}

function isSavedLanguage(value: unknown): value is SavedLanguage {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SavedLanguage>;
  return (
    typeof item.id === 'string' &&
    typeof item.createdAt === 'string' &&
    typeof item.mode === 'string' &&
    typeof item.tone === 'string' &&
    typeof item.text === 'string'
  );
}

function buildMarkdown(text: string, mode: LanguageMode, tone: ToneMode): string {
  return [
    '# PersonaMirror369 Consent Language',
    '',
    `Generated: ${new Date().toLocaleString()}`,
    'Privacy: This text was generated locally in the browser.',
    '',
    `Mode: ${mode}`,
    `Tone: ${tone}`,
    '',
    '## Text',
    text,
    '',
    '## Boundary',
    'This is a reflection aid for self-owned language, not a guarantee, diagnosis, or instruction to pressure another person.',
  ].join('\n');
}

function makeId(): string {
  if ('crypto' in window && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `language-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
