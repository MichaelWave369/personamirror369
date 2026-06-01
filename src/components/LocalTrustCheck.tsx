import { useMemo, useState } from 'react';

const APP_VERSION = '1.7.0';
const STORAGE_TEST_KEY = 'personamirror369.trustCheck.localStorageTest';

type CheckStatus = 'ok' | 'warn' | 'info';

interface TrustCheck {
  label: string;
  status: CheckStatus;
  value: string;
  note: string;
}

export function LocalTrustCheck() {
  const [lastCheckedAt, setLastCheckedAt] = useState(() => new Date());
  const [cacheCount, setCacheCount] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const checks = useMemo<TrustCheck[]>(
    () => [
      {
        label: 'App version',
        status: 'info',
        value: `v${APP_VERSION}`,
        note: 'This is the visible PersonaMirror369 release version for this build.',
      },
      {
        label: 'Secure context',
        status: window.isSecureContext ? 'ok' : 'warn',
        value: window.isSecureContext ? 'Available' : 'Unavailable',
        note: 'Service workers and some browser APIs require HTTPS or localhost.',
      },
      {
        label: 'Local storage',
        status: canUseLocalStorage() ? 'ok' : 'warn',
        value: canUseLocalStorage() ? 'Writable' : 'Blocked',
        note: 'Journal, reports, plans, and saved language depend on this browser storage.',
      },
      {
        label: 'Service worker',
        status: 'serviceWorker' in navigator ? 'ok' : 'warn',
        value: 'serviceWorker' in navigator ? 'Supported' : 'Unsupported',
        note: 'The offline-ready app shell uses this when the browser allows it.',
      },
      {
        label: 'Cache API',
        status: 'caches' in window ? 'ok' : 'warn',
        value: 'caches' in window ? 'Supported' : 'Unsupported',
        note: 'Cached public app files can improve return visits and basic offline access.',
      },
      {
        label: 'Clipboard API',
        status: navigator.clipboard ? 'ok' : 'warn',
        value: navigator.clipboard ? 'Supported' : 'May be blocked',
        note: 'Copy buttons use this when permissions and browser context allow it.',
      },
      {
        label: 'Network status',
        status: navigator.onLine ? 'ok' : 'info',
        value: navigator.onLine ? 'Online' : 'Offline',
        note: 'Offline mode may still show the cached app shell after a successful prior visit.',
      },
      {
        label: 'Detected app caches',
        status: cacheCount === null ? 'info' : 'ok',
        value: cacheCount === null ? 'Not scanned' : String(cacheCount),
        note: 'Counts Cache API entries whose names begin with personamirror369.',
      },
    ],
    [cacheCount, lastCheckedAt],
  );

  async function refreshChecks() {
    setLastCheckedAt(new Date());

    if ('caches' in window) {
      const keys = await caches.keys();
      setCacheCount(keys.filter((key) => key.startsWith('personamirror369')).length);
    } else {
      setCacheCount(null);
    }

    setStatus('Refreshed local trust checks.');
  }

  async function copyTrustSummary() {
    const summary = buildTrustSummary(checks, lastCheckedAt);
    try {
      await navigator.clipboard.writeText(summary);
      setStatus('Copied trust check summary.');
    } catch {
      setStatus('Clipboard copy was blocked.');
    }
  }

  return (
    <section id="trust-check" className="panel interactive-panel trust-panel">
      <div className="panel-heading">
        <p className="section-kicker">Local Trust Check</p>
        <h2>Verify the browser support this local-first app depends on.</h2>
        <p>
          This panel runs simple in-browser checks for local storage, service worker support, cache
          access, clipboard support, secure context, network status, and app version. Nothing is sent anywhere.
        </p>
      </div>

      <div className="trust-grid">
        <article className="trust-summary-card">
          <div className="mask-card-topline">
            <span>Trust diagnostics</span>
            <span>{lastCheckedAt.toLocaleTimeString()}</span>
          </div>
          <h3>Local-first readiness</h3>
          <p>
            These checks do not certify safety or privacy by themselves, but they make the browser
            environment visible so the user can understand what features are available.
          </p>
          <div className="report-actions">
            <button type="button" onClick={refreshChecks}>
              Refresh checks
            </button>
            <button type="button" onClick={copyTrustSummary}>
              Copy summary
            </button>
            <a href="#data-center">Open Continuity Center</a>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>

        <div className="trust-card-grid">
          {checks.map((check) => (
            <article className={`trust-check-card ${check.status}`} key={check.label}>
              <span>{check.label}</span>
              <strong>{check.value}</strong>
              <p>{check.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function canUseLocalStorage(): boolean {
  try {
    localStorage.setItem(STORAGE_TEST_KEY, 'ok');
    localStorage.removeItem(STORAGE_TEST_KEY);
    return true;
  } catch {
    return false;
  }
}

function buildTrustSummary(checks: TrustCheck[], checkedAt: Date): string {
  return [
    '# PersonaMirror369 Local Trust Check',
    '',
    `Generated: ${checkedAt.toLocaleString()}`,
    'Privacy: This summary was generated locally in the browser.',
    '',
    ...checks.map((check) => `- ${check.label}: ${check.value} — ${check.note}`),
    '',
    'Boundary: This is a browser capability check, not a security audit or privacy guarantee.',
  ].join('\n');
}
