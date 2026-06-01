import { useEffect, useMemo, useState } from 'react';
import { masks } from '../data/masks';

const LOCAL_JOURNAL_KEY = 'personamirror369.localMirrorJournal.v1';

interface JournalEntry {
  id: string;
  createdAt: string;
  title: string;
  maskId: string;
  room: string;
  pressureSignal: string;
  reflection: string;
  nextStep: string;
}

const roomOptions = ['Alone', 'Family', 'Work', 'Online', 'Faith / Community', 'Friends', 'Strangers', 'Other'];
const pressureOptions = ['Low', 'Moderate', 'High', 'Severe', 'Group field', 'Manipulation pressure'];

export function LocalMirrorJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [maskId, setMaskId] = useState(masks[0]?.id ?? 'pleaser');
  const [room, setRoom] = useState(roomOptions[0]);
  const [pressureSignal, setPressureSignal] = useState(pressureOptions[1]);
  const [reflection, setReflection] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [query, setQuery] = useState('');
  const [maskFilter, setMaskFilter] = useState('all');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_JOURNAL_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as JournalEntry[];
      if (Array.isArray(parsed)) {
        setEntries(parsed.filter(isJournalEntry));
      }
    } catch {
      setStatus('Saved journal could not be loaded. It may be from an older version.');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_JOURNAL_KEY, JSON.stringify(entries));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesMask = maskFilter === 'all' || entry.maskId === maskFilter;
      const selectedMask = masks.find((mask) => mask.id === entry.maskId);
      const searchable = [
        entry.title,
        entry.room,
        entry.pressureSignal,
        entry.reflection,
        entry.nextStep,
        selectedMask?.name ?? '',
        selectedMask?.archetype ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return matchesMask && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [entries, maskFilter, query]);

  const markdownExport = useMemo(() => {
    if (entries.length === 0) {
      return '# PersonaMirror369 Local Mirror Journal\n\nNo entries yet.';
    }

    return [
      '# PersonaMirror369 Local Mirror Journal',
      '',
      'Privacy: This journal export was generated locally in the browser.',
      '',
      ...entries.map((entry) => {
        const selectedMask = masks.find((mask) => mask.id === entry.maskId);
        return [
          `## ${entry.title || 'Untitled reflection'}`,
          `Created: ${new Date(entry.createdAt).toLocaleString()}`,
          `Room: ${entry.room}`,
          `Mask: ${selectedMask?.name ?? entry.maskId}`,
          `Pressure: ${entry.pressureSignal}`,
          '',
          '### Reflection',
          entry.reflection || 'Not written.',
          '',
          '### Next Step',
          entry.nextStep || 'Not written.',
        ].join('\n');
      }),
    ].join('\n\n');
  }, [entries]);

  function addEntry() {
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      title: title.trim() || `Mirror entry ${entries.length + 1}`,
      maskId,
      room,
      pressureSignal,
      reflection: reflection.trim(),
      nextStep: nextStep.trim(),
    };

    setEntries((current) => [entry, ...current]);
    setTitle('');
    setReflection('');
    setNextStep('');
    setStatus('Saved local journal entry.');
  }

  function deleteEntry(id: string) {
    setEntries((current) => current.filter((entry) => entry.id !== id));
    setStatus('Deleted local journal entry.');
  }

  function clearJournal() {
    setEntries([]);
    localStorage.removeItem(LOCAL_JOURNAL_KEY);
    setStatus('Cleared all local journal entries in this browser.');
  }

  function downloadJson() {
    downloadFile('personamirror369-local-mirror-journal.json', JSON.stringify(entries, null, 2), 'application/json;charset=utf-8');
    setStatus('Downloaded local mirror journal JSON.');
  }

  function downloadMarkdown() {
    downloadFile('personamirror369-local-mirror-journal.md', markdownExport, 'text/markdown;charset=utf-8');
    setStatus('Downloaded local mirror journal Markdown.');
  }

  return (
    <section id="mirror-journal" className="panel interactive-panel journal-panel">
      <div className="panel-heading">
        <p className="section-kicker">Local Mirror Journal</p>
        <h2>Keep the thread. Watch the masks change over time.</h2>
        <p>
          Save short reflection entries in this browser only. Search, filter, delete, or export your
          journal whenever you want — no account, cloud storage, or tracking.
        </p>
      </div>

      <div className="journal-grid">
        <div className="journal-form">
          <label className="text-field">
            <span>Entry title</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Example: Monday family room check" />
          </label>

          <div className="journal-select-row">
            <label className="select-field">
              <span>Mask</span>
              <select value={maskId} onChange={(event) => setMaskId(event.target.value)}>
                {masks.map((mask) => (
                  <option key={mask.id} value={mask.id}>
                    {mask.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-field">
              <span>Room</span>
              <select value={room} onChange={(event) => setRoom(event.target.value)}>
                {roomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-field">
              <span>Pressure</span>
              <select value={pressureSignal} onChange={(event) => setPressureSignal(event.target.value)}>
                {pressureOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="text-field">
            <span>Reflection</span>
            <textarea
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
              placeholder="What mask appeared? What was it protecting? What felt true underneath?"
            />
          </label>

          <label className="text-field">
            <span>One safe next step</span>
            <textarea
              value={nextStep}
              onChange={(event) => setNextStep(event.target.value)}
              placeholder="Pause, journal, ask consent, clarify, set a boundary, seek support, repair, or rest."
            />
          </label>

          <div className="report-actions">
            <button type="button" onClick={addEntry}>
              Save entry
            </button>
            <button type="button" onClick={downloadMarkdown}>
              Export .md
            </button>
            <button type="button" onClick={downloadJson}>
              Export JSON
            </button>
            <button type="button" onClick={clearJournal}>
              Clear journal
            </button>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </div>

        <aside className="journal-list-card">
          <div className="mask-card-topline">
            <span>{entries.length} saved</span>
            <span>{filteredEntries.length} shown</span>
          </div>
          <div className="journal-tools">
            <label className="text-field">
              <span>Search entries</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search room, mask, phrase..." />
            </label>
            <label className="select-field">
              <span>Filter by mask</span>
              <select value={maskFilter} onChange={(event) => setMaskFilter(event.target.value)}>
                <option value="all">All masks</option>
                {masks.map((mask) => (
                  <option key={mask.id} value={mask.id}>
                    {mask.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="journal-entry-list">
            {filteredEntries.length === 0 ? (
              <p className="empty-journal">No journal entries match yet. Save one small reflection to begin the thread.</p>
            ) : (
              filteredEntries.map((entry) => {
                const selectedMask = masks.find((mask) => mask.id === entry.maskId);
                return (
                  <article className="journal-entry-card" key={entry.id}>
                    <div className="mask-card-topline">
                      <span>{entry.room}</span>
                      <span>{entry.pressureSignal}</span>
                    </div>
                    <h3>{entry.title}</h3>
                    <p className="journal-entry-meta">
                      {selectedMask?.name ?? entry.maskId} · {new Date(entry.createdAt).toLocaleString()}
                    </p>
                    <p>{entry.reflection || 'No reflection text yet.'}</p>
                    {entry.nextStep ? <blockquote>{entry.nextStep}</blockquote> : null}
                    <div className="report-actions">
                      <button type="button" onClick={() => deleteEntry(entry.id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function isJournalEntry(value: unknown): value is JournalEntry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Partial<JournalEntry>;
  return (
    typeof entry.id === 'string' &&
    typeof entry.createdAt === 'string' &&
    typeof entry.title === 'string' &&
    typeof entry.maskId === 'string' &&
    typeof entry.room === 'string' &&
    typeof entry.pressureSignal === 'string' &&
    typeof entry.reflection === 'string' &&
    typeof entry.nextStep === 'string'
  );
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
