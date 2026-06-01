import { useMemo, useState } from 'react';

const STORAGE_KEYS = [
  {
    key: 'personamirror369.localMirrorJournal.v1',
    label: 'Local Mirror Journal',
    description: 'Saved journal entries stored in this browser.',
  },
  {
    key: 'personamirror369.localReflectionReport.v1',
    label: 'Local Report Vault Draft',
    description: 'One saved report draft stored in this browser.',
  },
];

interface StorageRow {
  key: string;
  label: string;
  description: string;
  exists: boolean;
  bytes: number;
  summary: string;
}

interface PersonaMirrorBackup {
  schemaVersion: 1;
  app: 'PersonaMirror369';
  exportedAt: string;
  localStorage: Record<string, string | null>;
}

export function LocalDataCenter() {
  const [rows, setRows] = useState<StorageRow[]>(() => scanLocalStorage());
  const [importText, setImportText] = useState('');
  const [status, setStatus] = useState('');

  const totalBytes = useMemo(() => rows.reduce((sum, row) => sum + row.bytes, 0), [rows]);
  const backup = useMemo<PersonaMirrorBackup>(
    () => ({
      schemaVersion: 1,
      app: 'PersonaMirror369',
      exportedAt: new Date().toISOString(),
      localStorage: Object.fromEntries(STORAGE_KEYS.map((item) => [item.key, localStorage.getItem(item.key)])),
    }),
    [rows],
  );

  function refresh() {
    setRows(scanLocalStorage());
  }

  async function copyBackup() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(backup, null, 2));
      setStatus('Copied local data backup JSON.');
    } catch {
      setStatus('Clipboard copy was blocked. Use Download Backup instead.');
    }
  }

  function downloadBackup() {
    downloadFile(
      'personamirror369-local-data-backup.json',
      JSON.stringify(backup, null, 2),
      'application/json;charset=utf-8',
    );
    setStatus('Downloaded local data backup JSON.');
  }

  function importBackup() {
    try {
      const parsed = JSON.parse(importText) as Partial<PersonaMirrorBackup>;
      if (parsed.app !== 'PersonaMirror369' || !parsed.localStorage || typeof parsed.localStorage !== 'object') {
        setStatus('Import rejected. This does not look like a PersonaMirror369 backup.');
        return;
      }

      STORAGE_KEYS.forEach((item) => {
        const value = parsed.localStorage?.[item.key];
        if (typeof value === 'string') {
          localStorage.setItem(item.key, value);
        }
      });

      refresh();
      setStatus('Imported known PersonaMirror369 local data keys. Reload the page to sync all visible modules.');
    } catch {
      setStatus('Could not import backup. Check that the pasted text is valid JSON.');
    }
  }

  function clearKey(key: string) {
    localStorage.removeItem(key);
    refresh();
    setStatus('Cleared one local data key. Reload the page to sync all visible modules.');
  }

  function clearAllLocalData() {
    STORAGE_KEYS.forEach((item) => localStorage.removeItem(item.key));
    refresh();
    setStatus('Cleared PersonaMirror369 journal/report local data in this browser. Reload to sync all modules.');
  }

  async function clearAppCaches() {
    if (!('caches' in window)) {
      setStatus('Cache API is not available in this browser.');
      return;
    }

    const keys = await caches.keys();
    const personaKeys = keys.filter((key) => key.startsWith('personamirror369'));
    await Promise.all(personaKeys.map((key) => caches.delete(key)));
    setStatus(`Cleared ${personaKeys.length} PersonaMirror369 app-shell cache(s).`);
  }

  return (
    <section id="data-center" className="panel interactive-panel data-center-panel">
      <div className="panel-heading">
        <p className="section-kicker">Local Data Center</p>
        <h2>See, export, import, or clear what this browser stores.</h2>
        <p>
          PersonaMirror369 stores journal and report drafts locally in your browser only. This panel
          makes that storage visible and gives you direct control over backups and cleanup.
        </p>
      </div>

      <div className="data-center-grid">
        <article className="data-control-card">
          <div className="mask-card-topline">
            <span>Local inventory</span>
            <span>{formatBytes(totalBytes)}</span>
          </div>
          <div className="data-row-list">
            {rows.map((row) => (
              <article className={row.exists ? 'data-row exists' : 'data-row'} key={row.key}>
                <div>
                  <h3>{row.label}</h3>
                  <p>{row.description}</p>
                  <em>{row.summary}</em>
                </div>
                <div className="data-row-actions">
                  <strong>{row.exists ? formatBytes(row.bytes) : 'empty'}</strong>
                  <button type="button" onClick={() => clearKey(row.key)} disabled={!row.exists}>
                    Clear
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="report-actions">
            <button type="button" onClick={refresh}>
              Refresh scan
            </button>
            <button type="button" onClick={downloadBackup}>
              Download backup
            </button>
            <button type="button" onClick={copyBackup}>
              Copy backup
            </button>
            <button type="button" onClick={clearAllLocalData}>
              Clear journal/report data
            </button>
            <button type="button" onClick={clearAppCaches}>
              Clear app cache
            </button>
          </div>
        </article>

        <aside className="data-control-card">
          <div className="mask-card-topline">
            <span>Portable restore</span>
            <span>JSON</span>
          </div>
          <p>
            Paste a backup created by this panel to restore known PersonaMirror369 localStorage keys.
            Reload after importing so every module refreshes its visible state.
          </p>
          <label className="text-field">
            <span>Import local data backup</span>
            <textarea
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              placeholder="Paste personamirror369-local-data-backup.json contents here."
            />
          </label>
          <div className="report-actions">
            <button type="button" onClick={importBackup}>
              Import backup
            </button>
          </div>
          <div className="data-safety-note">
            <h3>Boundary note</h3>
            <p>
              Clearing app cache removes cached public app files. Clearing journal/report data removes
              private local drafts and entries from this browser. Neither action touches exported files
              you saved elsewhere.
            </p>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </aside>
      </div>
    </section>
  );
}

function scanLocalStorage(): StorageRow[] {
  return STORAGE_KEYS.map((item) => {
    const value = localStorage.getItem(item.key);
    return {
      ...item,
      exists: value !== null,
      bytes: value ? new Blob([value]).size : 0,
      summary: summarizeValue(item.key, value),
    };
  });
}

function summarizeValue(key: string, value: string | null): string {
  if (!value) return 'No local data found for this key.';

  try {
    const parsed = JSON.parse(value) as unknown;
    if (key.includes('localMirrorJournal') && Array.isArray(parsed)) {
      return `${parsed.length} journal entr${parsed.length === 1 ? 'y' : 'ies'} stored locally.`;
    }

    if (key.includes('localReflectionReport') && parsed && typeof parsed === 'object') {
      const savedAt = 'savedAt' in parsed && typeof parsed.savedAt === 'string' ? parsed.savedAt : 'unknown time';
      return `One report draft saved locally at ${savedAt}.`;
    }
  } catch {
    return 'Local data exists, but could not be summarized as JSON.';
  }

  return 'Local data exists for this key.';
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
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
