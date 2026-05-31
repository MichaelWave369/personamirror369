import { useMemo, useState } from 'react';
import { masks } from '../data/masks';

type DeckMode = 'today' | 'manual';

const dailySeedPrefix = 'PersonaMirror369';

export function DailyMirrorDeck() {
  const [mode, setMode] = useState<DeckMode>('today');
  const [manualIndex, setManualIndex] = useState(0);
  const [status, setStatus] = useState('');

  const todayIndex = useMemo(() => getDailyIndex(), []);
  const activeIndex = mode === 'today' ? todayIndex : manualIndex;
  const activeMask = masks[activeIndex % masks.length] ?? masks[0];

  const insight = useMemo(
    () =>
      [
        `PersonaMirror369 Daily Mirror Card`,
        `Mask: ${activeMask.name}`,
        `Archetype: ${activeMask.archetype}`,
        `Gift: ${activeMask.protectiveFunction}`,
        `Risk: ${activeMask.shadowRisk}`,
        `Integration: ${activeMask.healthyIntegration}`,
        `Reflection: ${activeMask.reflectionQuestion}`,
        `Practice: ${activeMask.releasePractice}`,
        `Boundary: This is a reflection aid, not a diagnosis or identity label.`,
      ].join('\n'),
    [activeMask],
  );

  async function copyInsight() {
    try {
      await navigator.clipboard.writeText(insight);
      setStatus('Copied mirror card insight.');
    } catch {
      setStatus('Clipboard copy was blocked. You can still select and copy the card text.');
    }
  }

  function drawNextCard() {
    setMode('manual');
    setManualIndex((current) => (current + 1) % masks.length);
    setStatus('Drew the next mirror card.');
  }

  function drawRandomCard() {
    setMode('manual');
    const randomIndex = Math.floor(Math.random() * masks.length);
    setManualIndex(randomIndex);
    setStatus('Drew a random mirror card.');
  }

  function returnToToday() {
    setMode('today');
    setStatus('Returned to today’s deterministic mirror card.');
  }

  return (
    <section id="daily-deck" className="panel interactive-panel deck-panel">
      <div className="panel-heading">
        <p className="section-kicker">Daily Mirror Deck</p>
        <h2>Pull one card. Meet one mask with mercy.</h2>
        <p>
          A daily-return practice built from the Mask Atlas. Use today’s deterministic card, draw a
          random card, copy the insight, or carry it into the Local Vault.
        </p>
      </div>

      <div className="deck-grid">
        <article className="mirror-card-feature">
          <div className="mask-card-topline">
            <span>{mode === 'today' ? 'Today’s card' : 'Manual draw'}</span>
            <span>{activeMask.polarity}</span>
          </div>
          <h3>{activeMask.name}</h3>
          <p className="deck-archetype">{activeMask.archetype}</p>
          <p>{activeMask.shortDescription}</p>
          <blockquote>{activeMask.reflectionQuestion}</blockquote>

          <div className="deck-actions report-actions">
            <button type="button" onClick={drawRandomCard}>
              Draw random
            </button>
            <button type="button" onClick={drawNextCard}>
              Next card
            </button>
            <button type="button" onClick={returnToToday}>
              Today’s card
            </button>
            <button type="button" onClick={copyInsight}>
              Copy insight
            </button>
            <a href="#local-report">Carry to Vault</a>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>

        <aside className="deck-meaning-grid">
          <article className="deck-meaning-card">
            <h4>Gift</h4>
            <p>{activeMask.protectiveFunction}</p>
          </article>
          <article className="deck-meaning-card">
            <h4>Shadow risk</h4>
            <p>{activeMask.shadowRisk}</p>
          </article>
          <article className="deck-meaning-card">
            <h4>Integration</h4>
            <p>{activeMask.healthyIntegration}</p>
          </article>
          <article className="deck-meaning-card">
            <h4>Practice</h4>
            <p>{activeMask.releasePractice}</p>
          </article>
        </aside>
      </div>

      <div className="deck-strip" aria-label="Mask deck overview">
        {masks.map((mask, index) => (
          <button
            className={index === activeIndex ? 'deck-mini-card active' : 'deck-mini-card'}
            key={mask.id}
            onClick={() => {
              setMode('manual');
              setManualIndex(index);
              setStatus(`Selected ${mask.name}.`);
            }}
            type="button"
          >
            <span>{mask.name.replace('The ', '').replace(' Mask', '')}</span>
            <strong>{mask.archetype}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function getDailyIndex(): number {
  const today = new Date().toISOString().slice(0, 10);
  const seed = `${dailySeedPrefix}:${today}`;
  let hash = 0;

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 2147483647;
  }

  return hash % masks.length;
}
