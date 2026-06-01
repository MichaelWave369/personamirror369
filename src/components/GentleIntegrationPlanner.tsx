import { useMemo, useState } from 'react';
import { masks } from '../data/masks';

const LOCAL_PLAN_KEY = 'personamirror369.gentleIntegrationPlan.v1';

const roomOptions = ['Alone', 'Family', 'Work', 'Online', 'Faith / Community', 'Friends', 'Strangers', 'Other'];

const practiceTemplates = [
  'Notice the mask without arguing with it. Write one sentence: “This mask may be protecting ____.”',
  'Lower the pressure by one percent. Choose pause, breath, privacy, or a smaller conversation.',
  'Name one safety condition that would make truth easier to carry.',
  'Practice one clean sentence with no accusation: “I notice…”, “I feel…”, “I need…”, or “Can we slow down?”',
  'Seek one trusted witness, note, or resource that helps the nervous system settle.',
  'Choose one repairable action: clarify, apologize, renegotiate, rest, or set a boundary.',
  'Review the week with mercy. What became safer? What still needs time?',
];

interface PlanDay {
  day: number;
  title: string;
  practice: string;
  isComplete: boolean;
}

interface IntegrationPlan {
  schemaVersion: 1;
  savedAt: string;
  focusMaskId: string;
  focusRoom: string;
  intention: string;
  safetyNeed: string;
  supportAnchor: string;
  days: PlanDay[];
}

export function GentleIntegrationPlanner() {
  const [focusMaskId, setFocusMaskId] = useState(masks[0]?.id ?? 'pleaser');
  const [focusRoom, setFocusRoom] = useState(roomOptions[1]);
  const [intention, setIntention] = useState('Bring one percent more truth with mercy.');
  const [safetyNeed, setSafetyNeed] = useState('More time, privacy, and a repair path.');
  const [supportAnchor, setSupportAnchor] = useState('Journal first, then choose one trusted witness if needed.');
  const [days, setDays] = useState<PlanDay[]>(() => makeDefaultDays());
  const [status, setStatus] = useState('');

  const selectedMask = masks.find((mask) => mask.id === focusMaskId) ?? masks[0];
  const completedCount = days.filter((day) => day.isComplete).length;
  const progress = Math.round((completedCount / days.length) * 100);

  const plan = useMemo<IntegrationPlan>(
    () => ({
      schemaVersion: 1,
      savedAt: new Date().toISOString(),
      focusMaskId,
      focusRoom,
      intention,
      safetyNeed,
      supportAnchor,
      days,
    }),
    [days, focusMaskId, focusRoom, intention, safetyNeed, supportAnchor],
  );

  const markdown = useMemo(() => buildMarkdown(plan, selectedMask), [plan, selectedMask]);

  function regeneratePlan() {
    setDays(makeDefaultDays(selectedMask.name));
    setStatus('Regenerated a gentle 7-day integration plan.');
  }

  function toggleDay(dayNumber: number) {
    setDays((current) =>
      current.map((day) => (day.day === dayNumber ? { ...day, isComplete: !day.isComplete } : day)),
    );
  }

  function updateDay(dayNumber: number, practice: string) {
    setDays((current) => current.map((day) => (day.day === dayNumber ? { ...day, practice } : day)));
  }

  function savePlan() {
    localStorage.setItem(LOCAL_PLAN_KEY, JSON.stringify(plan));
    setStatus('Saved gentle integration plan locally in this browser.');
  }

  function loadPlan() {
    const saved = localStorage.getItem(LOCAL_PLAN_KEY);
    if (!saved) {
      setStatus('No saved integration plan found in this browser.');
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<IntegrationPlan>;
      setFocusMaskId(typeof parsed.focusMaskId === 'string' ? parsed.focusMaskId : masks[0]?.id ?? 'pleaser');
      setFocusRoom(typeof parsed.focusRoom === 'string' ? parsed.focusRoom : roomOptions[0]);
      setIntention(typeof parsed.intention === 'string' ? parsed.intention : 'Bring one percent more truth with mercy.');
      setSafetyNeed(typeof parsed.safetyNeed === 'string' ? parsed.safetyNeed : 'More time, privacy, and a repair path.');
      setSupportAnchor(typeof parsed.supportAnchor === 'string' ? parsed.supportAnchor : 'Journal first.');
      setDays(Array.isArray(parsed.days) ? parsed.days.filter(isPlanDay) : makeDefaultDays());
      setStatus('Loaded saved local integration plan.');
    } catch {
      setStatus('Saved integration plan could not be read.');
    }
  }

  function clearPlan() {
    localStorage.removeItem(LOCAL_PLAN_KEY);
    setStatus('Cleared saved local integration plan. The on-screen plan was not erased.');
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus('Copied integration plan summary.');
    } catch {
      setStatus('Clipboard copy was blocked. Use Download .md instead.');
    }
  }

  function downloadMarkdown() {
    downloadFile('personamirror369-gentle-integration-plan.md', markdown, 'text/markdown;charset=utf-8');
    setStatus('Downloaded gentle integration plan Markdown.');
  }

  function downloadJson() {
    downloadFile('personamirror369-gentle-integration-plan.json', JSON.stringify(plan, null, 2), 'application/json;charset=utf-8');
    setStatus('Downloaded gentle integration plan JSON.');
  }

  return (
    <section id="integration-planner" className="panel interactive-panel integration-panel">
      <div className="panel-heading">
        <p className="section-kicker">Gentle Integration Planner</p>
        <h2>Turn one pattern into seven tiny, humane practice steps.</h2>
        <p>
          This planner does not create streak pressure or self-improvement shame. It helps you choose
          one mask, one room, one safety need, and a small week of repairable practice.
        </p>
      </div>

      <div className="integration-grid">
        <article className="integration-config-card">
          <div className="mask-card-topline">
            <span>Focus</span>
            <span>{progress}% complete</span>
          </div>

          <div className="score-bar integration-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          <label className="select-field">
            <span>Focus mask</span>
            <select value={focusMaskId} onChange={(event) => setFocusMaskId(event.target.value)}>
              {masks.map((mask) => (
                <option key={mask.id} value={mask.id}>
                  {mask.name}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Focus room</span>
            <select value={focusRoom} onChange={(event) => setFocusRoom(event.target.value)}>
              {roomOptions.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </label>

          <label className="text-field">
            <span>Intention</span>
            <textarea value={intention} onChange={(event) => setIntention(event.target.value)} />
          </label>

          <label className="text-field">
            <span>Truth safety need</span>
            <textarea value={safetyNeed} onChange={(event) => setSafetyNeed(event.target.value)} />
          </label>

          <label className="text-field">
            <span>Support anchor</span>
            <textarea value={supportAnchor} onChange={(event) => setSupportAnchor(event.target.value)} />
          </label>

          <div className="integration-mask-note">
            <h3>{selectedMask.name}</h3>
            <p>{selectedMask.shortDescription}</p>
            <blockquote>{selectedMask.reflectionQuestion}</blockquote>
          </div>
        </article>

        <article className="integration-plan-card">
          <div className="mask-card-topline">
            <span>7-day gentle plan</span>
            <span>{completedCount}/{days.length}</span>
          </div>

          <div className="integration-day-list">
            {days.map((day) => (
              <article className={day.isComplete ? 'integration-day complete' : 'integration-day'} key={day.day}>
                <button type="button" onClick={() => toggleDay(day.day)}>
                  {day.isComplete ? '✓' : day.day}
                </button>
                <div>
                  <h3>{day.title}</h3>
                  <textarea value={day.practice} onChange={(event) => updateDay(day.day, event.target.value)} />
                </div>
              </article>
            ))}
          </div>

          <div className="report-actions">
            <button type="button" onClick={regeneratePlan}>
              Regenerate plan
            </button>
            <button type="button" onClick={savePlan}>
              Save local plan
            </button>
            <button type="button" onClick={loadPlan}>
              Load local plan
            </button>
            <button type="button" onClick={clearPlan}>
              Clear saved plan
            </button>
            <button type="button" onClick={copyPlan}>
              Copy summary
            </button>
            <button type="button" onClick={downloadMarkdown}>
              Download .md
            </button>
            <button type="button" onClick={downloadJson}>
              Export JSON
            </button>
            <a href="#local-insights">Back to Insights</a>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>
      </div>
    </section>
  );
}

function makeDefaultDays(maskName = 'the selected mask'): PlanDay[] {
  return practiceTemplates.map((practice, index) => ({
    day: index + 1,
    title: `Day ${index + 1}: ${getDayTitle(index)}`,
    practice: practice.replace('the mask', maskName),
    isComplete: false,
  }));
}

function getDayTitle(index: number): string {
  return ['Notice', 'Lower pressure', 'Name safety', 'Practice language', 'Find support', 'Repair gently', 'Review with mercy'][index] ?? 'Practice';
}

function isPlanDay(value: unknown): value is PlanDay {
  if (!value || typeof value !== 'object') return false;
  const day = value as Partial<PlanDay>;
  return typeof day.day === 'number' && typeof day.title === 'string' && typeof day.practice === 'string' && typeof day.isComplete === 'boolean';
}

function buildMarkdown(plan: IntegrationPlan, selectedMask: (typeof masks)[number]): string {
  return [
    '# PersonaMirror369 Gentle Integration Plan',
    '',
    `Generated: ${new Date().toLocaleString()}`,
    'Privacy: This plan was generated locally in the browser.',
    '',
    '## Focus',
    `Mask: ${selectedMask.name}`,
    `Room: ${plan.focusRoom}`,
    `Intention: ${plan.intention}`,
    `Truth safety need: ${plan.safetyNeed}`,
    `Support anchor: ${plan.supportAnchor}`,
    '',
    '## Mask Reflection',
    selectedMask.reflectionQuestion,
    '',
    '## 7-Day Practice',
    ...plan.days.map((day) => `- [${day.isComplete ? 'x' : ' '}] ${day.title}: ${day.practice}`),
    '',
    '## Boundary',
    'This is a reflection aid, not a diagnosis, treatment plan, performance score, or moral ranking.',
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
