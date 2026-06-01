import { useMemo, useState } from 'react';

const liveUrl = 'https://michaelwave369.github.io/personamirror369/';
const repoUrl = 'https://github.com/MichaelWave369/personamirror369';
const doiUrl = 'https://doi.org/10.5281/zenodo.20483957';

type ShareTemplate = 'oneLine' | 'publicPost' | 'repoPitch' | 'safetyNote';

const templates: Record<ShareTemplate, { label: string; body: string }> = {
  oneLine: {
    label: 'One-line description',
    body: `PersonaMirror369 is a humane, local-first reflection app for noticing the masks we wear, mapping social pressure, and practicing safer truth without shame, coercion, or tracking. DOI: ${doiUrl}`,
  },
  publicPost: {
    label: 'Public post',
    body: `I just released PersonaMirror369 v2.0.0: a local-first reflection app for the masks we wear. It includes a daily mirror card, private browser-only journal, local insights, a gentle integration planner, consent language builder, continuity backup tools, and trust checks. It is not a diagnosis tool or a persuasion system — it is a consent-based mirror for safer truth.\n\nLive app: ${liveUrl}\nRepo: ${repoUrl}\nDOI: ${doiUrl}`,
  },
  repoPitch: {
    label: 'Repo pitch',
    body: `PersonaMirror369 is a Vite/React/TypeScript local-first reflection system featuring mask taxonomy, Pretending Force formulas, local journaling, insights, integration planning, consent language practice, PWA support, local continuity controls, and a Zenodo DOI: ${doiUrl}`,
  },
  safetyNote: {
    label: 'Safety note',
    body: 'PersonaMirror369 is a reflection and education tool. It is not therapy, diagnosis, surveillance, social scoring, coercive persuasion, or proof of any universal model of human behavior. The project is built around consent, privacy, mercy, and local-first user control.',
  },
};

export function PublicShareKit() {
  const [activeTemplate, setActiveTemplate] = useState<ShareTemplate>('publicPost');
  const [customNote, setCustomNote] = useState('Zenodo DOI minted for the v2.0.0 public release.');
  const [status, setStatus] = useState('');

  const selected = templates[activeTemplate];
  const shareText = useMemo(
    () => [selected.body, customNote.trim() ? `\n\nNote: ${customNote.trim()}` : ''].join('').trim(),
    [customNote, selected.body],
  );

  async function copyShareText() {
    try {
      await navigator.clipboard.writeText(shareText);
      setStatus('Copied public-safe share text.');
    } catch {
      setStatus('Clipboard copy was blocked. You can still select and copy the text.');
    }
  }

  async function copyLink(url: string, label: string) {
    try {
      await navigator.clipboard.writeText(url);
      setStatus(`Copied ${label}.`);
    } catch {
      setStatus('Clipboard copy was blocked.');
    }
  }

  function downloadLaunchNote() {
    const markdown = [
      '# PersonaMirror369 Public Share Kit',
      '',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      '## Share Text',
      shareText,
      '',
      '## Links',
      `- Live app: ${liveUrl}`,
      `- Repository: ${repoUrl}`,
      `- DOI: ${doiUrl}`,
      '',
      '## Boundary',
      templates.safetyNote.body,
    ].join('\n');

    downloadFile('personamirror369-public-share-kit.md', markdown, 'text/markdown;charset=utf-8');
    setStatus('Downloaded public share kit Markdown.');
  }

  return (
    <section id="share-kit" className="panel interactive-panel share-panel">
      <div className="panel-heading">
        <p className="section-kicker">Public Share Kit</p>
        <h2>Share the project clearly without overclaiming.</h2>
        <p>
          Copy public-safe descriptions, launch text, links, DOI, and safety boundaries for GitHub,
          social posts, portfolio notes, or project updates.
        </p>
      </div>

      <div className="share-grid">
        <article className="share-config-card">
          <div className="share-template-grid" aria-label="Share template selector">
            {Object.entries(templates).map(([key, value]) => (
              <button
                className={key === activeTemplate ? 'share-template-button active' : 'share-template-button'}
                key={key}
                onClick={() => setActiveTemplate(key as ShareTemplate)}
                type="button"
              >
                {value.label}
              </button>
            ))}
          </div>

          <label className="text-field">
            <span>Optional custom note</span>
            <textarea value={customNote} onChange={(event) => setCustomNote(event.target.value)} />
          </label>

          <div className="share-link-card">
            <h3>Project links</h3>
            <p>Live app, repo, and DOI links are included so the launch message is ready to paste.</p>
            <div className="report-actions">
              <button type="button" onClick={() => copyLink(liveUrl, 'live app link')}>
                Copy live link
              </button>
              <button type="button" onClick={() => copyLink(repoUrl, 'repo link')}>
                Copy repo link
              </button>
              <button type="button" onClick={() => copyLink(doiUrl, 'DOI link')}>
                Copy DOI link
              </button>
            </div>
          </div>
        </article>

        <article className="share-output-card">
          <div className="mask-card-topline">
            <span>{selected.label}</span>
            <span>public-safe</span>
          </div>
          <pre>{shareText}</pre>
          <div className="report-actions">
            <button type="button" onClick={copyShareText}>
              Copy share text
            </button>
            <button type="button" onClick={downloadLaunchNote}>
              Download .md
            </button>
            <a href="#trust-check">Review Trust Check</a>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>
      </div>
    </section>
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
