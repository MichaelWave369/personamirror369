const quickStartSteps = [
  {
    title: 'Pull one mirror card',
    href: '#daily-deck',
    body: 'Start gently. One mask, one reflection question, one practice line.',
  },
  {
    title: 'Write one journal entry',
    href: '#mirror-journal',
    body: 'Keep the thread local. Notice what changed without turning it into a diagnosis.',
  },
  {
    title: 'Use a guided pathway',
    href: '#guided-practice',
    body: 'Pick a short practice when the blank page feels too wide.',
  },
  {
    title: 'Export what you control',
    href: '#local-report',
    body: 'Copy, download, print, save locally, or delete your reflections.',
  },
];

const boundaryCards = [
  {
    title: 'Local-first by design',
    body: 'Journal entries and report drafts stay in the browser unless the user chooses to export them.',
  },
  {
    title: 'Reflection, not diagnosis',
    body: 'Scores, cards, and prompts are mirrors for self-awareness. They are not clinical labels or proof of identity.',
  },
  {
    title: 'Consent before truth',
    body: 'The system never asks users to force disclosure. Safety, timing, consent, and repair come first.',
  },
  {
    title: 'Anti-manipulation stance',
    body: 'PersonaMirror369 is for recognizing pressure patterns, not creating pressure patterns.',
  },
];

const moduleMap = [
  ['Daily Card', 'One-card daily reflection'],
  ['Journal', 'Private continuity thread'],
  ['Practice', 'Short guided pathways'],
  ['Meters', 'Pretending Force + Mask Load'],
  ['Rooms', 'Frontstage / Backstage mapping'],
  ['Truth Planner', 'Safe next-step choice'],
  ['Group Field', 'False-norm simulation'],
  ['Anti-Manipulation', 'Pressure-pattern literacy'],
  ['Vault', 'Local report export/import'],
];

export function LaunchCompass() {
  return (
    <section id="launch-compass" className="panel interactive-panel launch-panel">
      <div className="panel-heading">
        <p className="section-kicker">Launch Compass</p>
        <h2>Start safely. Stay sovereign. Leave with your own words.</h2>
        <p>
          PersonaMirror369 is a public-safe reflection tool for mask awareness, truth-safety mapping,
          and anti-manipulation literacy. This compass explains how to begin and what the boundaries are.
        </p>
      </div>

      <div className="launch-grid">
        <article className="launch-feature-card">
          <div className="mask-card-topline">
            <span>v1.0 ready path</span>
            <span>local-first</span>
          </div>
          <h3>Suggested first visit</h3>
          <ol className="launch-steps">
            {quickStartSteps.map((step) => (
              <li key={step.title}>
                <a href={step.href}>{step.title}</a>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </article>

        <aside className="launch-boundary-grid">
          {boundaryCards.map((card) => (
            <article className="launch-boundary-card" key={card.title}>
              <h4>{card.title}</h4>
              <p>{card.body}</p>
            </article>
          ))}
        </aside>
      </div>

      <div className="module-map-strip" aria-label="PersonaMirror369 module map">
        {moduleMap.map(([name, body]) => (
          <a className="module-map-card" href={getModuleHref(name)} key={name}>
            <span>{name}</span>
            <strong>{body}</strong>
          </a>
        ))}
      </div>

      <div className="release-note-card">
        <h3>Prime directive</h3>
        <p>We do not rip masks off people. We help people feel safe enough to set them down.</p>
      </div>
    </section>
  );
}

function getModuleHref(name: string): string {
  const map: Record<string, string> = {
    'Daily Card': '#daily-deck',
    Journal: '#mirror-journal',
    Practice: '#guided-practice',
    Meters: '#engine',
    Rooms: '#frontstage',
    'Truth Planner': '#truth-planner',
    'Group Field': '#group-field',
    'Anti-Manipulation': '#anti-manipulation',
    Vault: '#local-report',
  };

  return map[name] ?? '#launch-compass';
}
