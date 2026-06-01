export function OfflineReadyPanel() {
  return (
    <section id="offline-ready" className="panel interactive-panel offline-panel">
      <div className="panel-heading">
        <p className="section-kicker">Offline Ready</p>
        <h2>Local-first means the mirror can travel with you.</h2>
        <p>
          PersonaMirror369 now includes a lightweight app manifest and service worker. After a first
          successful visit, the app shell can be cached by the browser for faster return visits and
          basic offline access.
        </p>
      </div>

      <div className="offline-grid">
        <article className="offline-card">
          <h3>Installable app shell</h3>
          <p>
            Supported browsers may offer an install option so PersonaMirror369 can launch like a
            standalone local-first app.
          </p>
        </article>
        <article className="offline-card">
          <h3>Cached public files</h3>
          <p>
            The service worker caches the app shell and visited assets. Your journal/report data is
            still controlled by your browser storage and exports.
          </p>
        </article>
        <article className="offline-card">
          <h3>No account required</h3>
          <p>
            Offline support does not add accounts, analytics, cloud sync, or tracking. It simply makes
            the public app more available.
          </p>
        </article>
      </div>
    </section>
  );
}
