import { useMemo, useState } from 'react';
import { masks } from '../data/masks';
import { RangeField } from './RangeField';

interface ContextEntry {
  id: string;
  label: string;
  prompt: string;
  maskId: string;
  publicPerformance: string;
  privateTruth: string;
  neededSafety: string;
  performanceIntensity: number;
  truthClarity: number;
  truthSafety: number;
}

const contextSeeds: ContextEntry[] = [
  {
    id: 'alone',
    label: 'Alone',
    prompt: 'Who appears when nobody is watching?',
    maskId: 'ghost',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.2,
    truthClarity: 0.72,
    truthSafety: 0.78,
  },
  {
    id: 'family',
    label: 'Family',
    prompt: 'What role do I fall into around family history and expectation?',
    maskId: 'pleaser',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.64,
    truthClarity: 0.46,
    truthSafety: 0.34,
  },
  {
    id: 'work',
    label: 'Work',
    prompt: 'What version of me performs competence, control, or agreement?',
    maskId: 'expert',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.72,
    truthClarity: 0.5,
    truthSafety: 0.42,
  },
  {
    id: 'online',
    label: 'Online',
    prompt: 'What part of me performs for visibility, approval, or defense?',
    maskId: 'rebel',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.68,
    truthClarity: 0.55,
    truthSafety: 0.38,
  },
  {
    id: 'faith',
    label: 'Faith / Community',
    prompt: 'Where do I perform goodness, certainty, or belonging?',
    maskId: 'spiritual',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.62,
    truthClarity: 0.48,
    truthSafety: 0.36,
  },
  {
    id: 'friends',
    label: 'Friends',
    prompt: 'Which mask keeps connection easy, funny, or familiar?',
    maskId: 'clown',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.52,
    truthClarity: 0.58,
    truthSafety: 0.6,
  },
  {
    id: 'strangers',
    label: 'Strangers',
    prompt: 'What automatic interface appears before trust is built?',
    maskId: 'chameleon',
    publicPerformance: '',
    privateTruth: '',
    neededSafety: '',
    performanceIntensity: 0.58,
    truthClarity: 0.4,
    truthSafety: 0.44,
  },
];

export function FrontstageBackstageMap() {
  const [contexts, setContexts] = useState<ContextEntry[]>(contextSeeds);
  const [activeId, setActiveId] = useState(contextSeeds[1]?.id ?? 'family');

  const activeContext = contexts.find((context) => context.id === activeId) ?? contexts[0];
  const selectedMask = masks.find((mask) => mask.id === activeContext.maskId) ?? masks[0];

  const coherenceDelta = useMemo(() => scoreCoherenceDelta(activeContext), [activeContext]);
  const roomSummary = getRoomSummary(coherenceDelta, activeContext.truthSafety);

  function updateActive<K extends keyof ContextEntry>(key: K, value: ContextEntry[K]) {
    setContexts((current) =>
      current.map((context) => (context.id === activeId ? { ...context, [key]: value } : context)),
    );
  }

  return (
    <section id="frontstage" className="panel interactive-panel">
      <div className="panel-heading">
        <p className="section-kicker">Frontstage / Backstage Map</p>
        <h2>Different rooms call different masks forward.</h2>
        <p>
          Map the public performance, private truth, and safety conditions for each room. Nothing is
          sent anywhere — this is a local reflection surface inside the browser session.
        </p>
      </div>

      <div className="reflection-grid">
        <aside className="room-list" aria-label="Reflection contexts">
          {contexts.map((context) => {
            const roomScore = scoreCoherenceDelta(context);
            return (
              <button
                className={context.id === activeId ? 'room-button active' : 'room-button'}
                key={context.id}
                onClick={() => setActiveId(context.id)}
                type="button"
              >
                <span>{context.label}</span>
                <strong>{Math.round(roomScore * 100)}%</strong>
              </button>
            );
          })}
        </aside>

        <article className="reflection-card">
          <div className="mask-card-topline">
            <span>{activeContext.label}</span>
            <span>Coherence Delta {Math.round(coherenceDelta * 100)}%</span>
          </div>
          <h3>{activeContext.prompt}</h3>
          <p>{roomSummary}</p>

          <label className="select-field">
            <span>Likely mask in this room</span>
            <select value={activeContext.maskId} onChange={(event) => updateActive('maskId', event.target.value)}>
              {masks.map((mask) => (
                <option key={mask.id} value={mask.id}>
                  {mask.name}
                </option>
              ))}
            </select>
          </label>

          <div className="text-field-grid">
            <label className="text-field">
              <span>Frontstage: what do I show here?</span>
              <textarea
                value={activeContext.publicPerformance}
                onChange={(event) => updateActive('publicPerformance', event.target.value)}
                placeholder="Example: I act like everything is fine, I agree quickly, I make jokes..."
              />
            </label>
            <label className="text-field">
              <span>Backstage: what is privately true?</span>
              <textarea
                value={activeContext.privateTruth}
                onChange={(event) => updateActive('privateTruth', event.target.value)}
                placeholder="Example: I actually feel unsure, tired, hurt, excited, afraid..."
              />
            </label>
          </div>

          <label className="text-field">
            <span>What would make truth safer here?</span>
            <textarea
              value={activeContext.neededSafety}
              onChange={(event) => updateActive('neededSafety', event.target.value)}
              placeholder="Example: privacy, no interrupting, repair path, trusted witness, more time..."
            />
          </label>
        </article>

        <aside className="slider-column">
          <h3>Room signals</h3>
          <RangeField
            label="Performance Intensity"
            symbol="PI"
            help="How strongly do I perform in this room?"
            value={activeContext.performanceIntensity}
            onChange={(value) => updateActive('performanceIntensity', value)}
          />
          <RangeField
            label="Private Truth Clarity"
            symbol="PT"
            help="How clear is the truth underneath the performance?"
            value={activeContext.truthClarity}
            onChange={(value) => updateActive('truthClarity', value)}
          />
          <RangeField
            label="Truth Safety"
            symbol="TS"
            help="How safe does honest expression feel in this room?"
            value={activeContext.truthSafety}
            onChange={(value) => updateActive('truthSafety', value)}
          />

          <div className="mini-summary-card">
            <h3>{selectedMask.name}</h3>
            <p>{selectedMask.shortDescription}</p>
            <blockquote>{selectedMask.reflectionQuestion}</blockquote>
          </div>
        </aside>
      </div>
    </section>
  );
}

function scoreCoherenceDelta(context: ContextEntry): number {
  const performanceGap = Math.abs(context.performanceIntensity - context.truthClarity);
  const safetyPressure = 1 - context.truthSafety;
  return Math.max(0, Math.min(1, performanceGap * 0.65 + safetyPressure * 0.35));
}

function getRoomSummary(delta: number, truthSafety: number): string {
  if (delta < 0.25 && truthSafety > 0.65) {
    return 'This room appears relatively coherent. Truth may be close to the surface, but consent still matters.';
  }

  if (delta < 0.5) {
    return 'There may be a manageable gap between public performance and private truth. Try one small, safe clarification.';
  }

  if (delta < 0.75) {
    return 'This room may ask for a strong performance. Build safety and support before making a larger truth move.';
  }

  return 'This room may carry heavy pressure. Do not force disclosure; protect safety and look for repair or distance first.';
}
