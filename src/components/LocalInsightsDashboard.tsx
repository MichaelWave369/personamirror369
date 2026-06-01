import { useMemo, useState } from 'react';
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

interface CountItem {
  label: string;
  count: number;
}

export function LocalInsightsDashboard() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntries());
  const [status, setStatus] = useState('');

  const insights = useMemo(() => buildInsights(entries), [entries]);
  const summaryMarkdown = useMemo(() => buildSummaryMarkdown(entries, insights), [entries, insights]);

  function refresh() {
    setEntries(loadEntries());
    setStatus('Refreshed local journal insights.');
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryMarkdown);
      setStatus('Copied local insights summary.');
    } catch {
      setStatus('Clipboard copy was blocked. You can still download the summary.');
    }
  }

  function downloadSummary() {
    downloadFile('personamirror369-local-insights-summary.md', summaryMarkdown, 'text/markdown;charset=utf-8');
    setStatus('Downloaded local insights summary.');
  }

  return (
    <section id="local-insights" className="panel interactive-panel insights-panel">
      <div className="panel-heading">
        <p className="section-kicker">Local Insights Dashboard</p>
        <h2>Notice patterns without turning yourself into a score.</h2>
        <p>
          This dashboard reads only your browser-local journal entries. It highlights repeated masks,
          rooms, pressure signals, and recent next steps so you can reflect with mercy instead of judgment.
        </p>
      </div>

      <div className="insights-grid">
        <article className="insight-hero-card">
          <div className="mask-card-topline">
            <span>{entries.length} journal entries</span>
            <span>local only</span>
          </div>
          <h3>{insights.headline}</h3>
          <p>{insights.body}</p>
          <blockquote>{insights.prompt}</blockquote>
          <div className="report-actions">
            <button type="button" onClick={refresh}>
              Refresh insights
            </button>
            <button type="button" onClick={copySummary}>
              Copy summary
            </button>
            <button type="button" onClick={downloadSummary}>
              Download .md
            </button>
            <a href="#mirror-journal">Add journal entry</a>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>

        <aside className="insight-stat-grid" aria-label="Local insight statistics">
          <StatCard label="Most common mask" value={insights.topMask?.label ?? 'None yet'} count={insights.topMask?.count ?? 0} />
          <StatCard label="Most common room" value={insights.topRoom?.label ?? 'None yet'} count={insights.topRoom?.count ?? 0} />
          <StatCard label="Most common pressure" value={insights.topPressure?.label ?? 'None yet'} count={insights.topPressure?.count ?? 0} />
          <StatCard label="Recent next steps" value={String(insights.nextStepCount)} count={insights.nextStepCount} />
        </aside>
      </div>

      <div className="insight-lists-grid">
        <InsightList title="Mask patterns" items={insights.maskCounts} empty="No mask patterns yet." />
        <InsightList title="Room patterns" items={insights.roomCounts} empty="No room patterns yet." />
        <InsightList title="Pressure patterns" items={insights.pressureCounts} empty="No pressure patterns yet." />
      </div>

      <div className="recent-thread-card">
        <div className="mask-card-topline">
          <span>Recent thread</span>
          <span>{Math.min(entries.length, 5)} shown</span>
        </div>
        {insights.recentEntries.length === 0 ? (
          <p>No journal entries yet. Add one local entry to begin seeing a thread.</p>
        ) : (
          <div className="recent-entry-list">
            {insights.recentEntries.map((entry) => {
              const selectedMask = masks.find((mask) => mask.id === entry.maskId);
              return (
                <article className="recent-entry-card" key={entry.id}>
                  <h3>{entry.title || 'Untitled reflection'}</h3>
                  <p>
                    {selectedMask?.name ?? entry.maskId} · {entry.room} · {entry.pressureSignal} ·{' '}
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  {entry.nextStep ? <blockquote>{entry.nextStep}</blockquote> : null}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value, count }: { label: string; value: string; count: number }) {
  return (
    <article className="insight-stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{count === 1 ? '1 entry' : `${count} entries`}</em>
    </article>
  );
}

function InsightList({ title, items, empty }: { title: string; items: CountItem[]; empty: string }) {
  return (
    <article className="insight-list-card">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>{empty}</p>
      ) : (
        <ul>
          {items.slice(0, 6).map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.count}</strong>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function buildInsights(entries: JournalEntry[]) {
  const sortedEntries = [...entries].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const maskCounts = countBy(
    entries.map((entry) => masks.find((mask) => mask.id === entry.maskId)?.name ?? entry.maskId),
  );
  const roomCounts = countBy(entries.map((entry) => entry.room));
  const pressureCounts = countBy(entries.map((entry) => entry.pressureSignal));
  const nextStepCount = entries.filter((entry) => entry.nextStep.trim().length > 0).length;
  const topMask = maskCounts[0];
  const topRoom = roomCounts[0];
  const topPressure = pressureCounts[0];

  if (entries.length === 0) {
    return {
      headline: 'No pattern needs to be solved yet.',
      body: 'The dashboard will begin once the Local Mirror Journal has at least one saved entry.',
      prompt: 'Start with one gentle entry: what mask appeared, what did it protect, and what is one safe next step?',
      maskCounts,
      roomCounts,
      pressureCounts,
      topMask,
      topRoom,
      topPressure,
      nextStepCount,
      recentEntries: [],
    };
  }

  return {
    headline: topMask ? `${topMask.label} is appearing most often.` : 'Your journal has started a thread.',
    body: buildPatternBody(topMask, topRoom, topPressure),
    prompt: 'Ask gently: is this mask asking for more safety, more truth, more rest, or more support?',
    maskCounts,
    roomCounts,
    pressureCounts,
    topMask,
    topRoom,
    topPressure,
    nextStepCount,
    recentEntries: sortedEntries.slice(0, 5),
  };
}

function buildPatternBody(topMask?: CountItem, topRoom?: CountItem, topPressure?: CountItem): string {
  const maskText = topMask ? `${topMask.label} appears ${topMask.count} time${topMask.count === 1 ? '' : 's'}` : 'No repeated mask yet';
  const roomText = topRoom ? `${topRoom.label} is the most common room` : 'no room pattern yet';
  const pressureText = topPressure ? `${topPressure.label} is the most common pressure signal` : 'no pressure pattern yet';
  return `${maskText}. ${roomText}, and ${pressureText}. This is not a diagnosis — it is a local reflection pattern.`;
}

function countBy(values: string[]): CountItem[] {
  const counts = values.reduce<Record<string, number>>((accumulator, value) => {
    const label = value || 'Unknown';
    accumulator[label] = (accumulator[label] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function loadEntries(): JournalEntry[] {
  const saved = localStorage.getItem(LOCAL_JOURNAL_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isJournalEntry) : [];
  } catch {
    return [];
  }
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

function buildSummaryMarkdown(entries: JournalEntry[], insights: ReturnType<typeof buildInsights>): string {
  return [
    '# PersonaMirror369 Local Insights Summary',
    '',
    `Generated: ${new Date().toLocaleString()}`,
    'Privacy: This summary was generated locally from this browser’s Local Mirror Journal.',
    '',
    '## Snapshot',
    `Journal entries: ${entries.length}`,
    `Most common mask: ${insights.topMask?.label ?? 'None yet'}`,
    `Most common room: ${insights.topRoom?.label ?? 'None yet'}`,
    `Most common pressure: ${insights.topPressure?.label ?? 'None yet'}`,
    `Entries with next steps: ${insights.nextStepCount}`,
    '',
    '## Reflection Prompt',
    insights.prompt,
    '',
    '## Boundary',
    'This is a reflection aid, not a diagnosis, therapy replacement, prediction engine, or social score.',
  ].join('\n');
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
