import { useMemo, useState } from 'react';
import {
  describePretendingForce,
  scorePretendingForce,
  type PretendingForceInputs,
} from '../data/formulas';
import { RangeField } from './RangeField';

const defaultInputs: PretendingForceInputs = {
  shameRisk: 0.62,
  belongingRisk: 0.6,
  punishmentRisk: 0.35,
  financialSurvivalRisk: 0.28,
  approvalReward: 0.58,
  egoReward: 0.45,
  truthSafety: 0.42,
  selfCompassion: 0.44,
  privateCoherence: 0.5,
  repairCapacity: 0.34,
};

const pressureFields: Array<{
  key: keyof PretendingForceInputs;
  label: string;
  symbol: string;
  help: string;
}> = [
  {
    key: 'shameRisk',
    label: 'Shame Risk',
    symbol: 'SR',
    help: 'How much shame might appear if truth is expressed?',
  },
  {
    key: 'belongingRisk',
    label: 'Belonging Risk',
    symbol: 'BR',
    help: 'How much belonging feels at stake?',
  },
  {
    key: 'punishmentRisk',
    label: 'Punishment Risk',
    symbol: 'PR',
    help: 'How likely are retaliation, conflict, or consequence?',
  },
  {
    key: 'financialSurvivalRisk',
    label: 'Financial / Survival Risk',
    symbol: 'FR',
    help: 'How much survival, money, housing, work, or stability is involved?',
  },
  {
    key: 'approvalReward',
    label: 'Approval Reward',
    symbol: 'AR',
    help: 'How much praise or status comes from keeping the mask?',
  },
  {
    key: 'egoReward',
    label: 'Ego Reward',
    symbol: 'ER',
    help: 'How much identity payoff comes from performing this version of self?',
  },
];

const stabilizerFields: Array<{
  key: keyof PretendingForceInputs;
  label: string;
  symbol: string;
  help: string;
}> = [
  {
    key: 'truthSafety',
    label: 'Truth Safety',
    symbol: 'TS',
    help: 'How safe does honest expression feel here?',
  },
  {
    key: 'selfCompassion',
    label: 'Self-Compassion',
    symbol: 'SC',
    help: 'How much internal mercy is available if truth appears?',
  },
  {
    key: 'privateCoherence',
    label: 'Private Coherence',
    symbol: 'PC',
    help: 'How clear is the private truth underneath the performance?',
  },
  {
    key: 'repairCapacity',
    label: 'Repair Capacity',
    symbol: 'RC',
    help: 'How possible are apology, renegotiation, boundaries, or reconnection?',
  },
];

export function PretendingForceMeter() {
  const [inputs, setInputs] = useState<PretendingForceInputs>(defaultInputs);

  const score = useMemo(() => scorePretendingForce(inputs), [inputs]);
  const guidance = getPretendingForceGuidance(score);

  function updateField(key: keyof PretendingForceInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <section id="engine" className="panel interactive-panel">
      <div className="panel-heading">
        <p className="section-kicker">Pretending Force Meter</p>
        <h2>Move the sliders. Watch the mask pressure change.</h2>
        <p>
          This is a reflection aid, not a diagnosis. It estimates how much a situation may reward
          performance or make truth feel costly.
        </p>
      </div>

      <div className="meter-layout">
        <div className="slider-column">
          <h3>Pressure inputs</h3>
          {pressureFields.map((field) => (
            <RangeField
              key={field.key}
              label={field.label}
              symbol={field.symbol}
              help={field.help}
              value={inputs[field.key]}
              onChange={(value) => updateField(field.key, value)}
            />
          ))}
        </div>

        <div className="score-card sticky-score">
          <span className="score-label">Pretending Force</span>
          <strong>{Math.round(score * 100)}%</strong>
          <p>{describePretendingForce(score)}</p>
          <div className="score-bar" aria-hidden="true">
            <span style={{ width: `${Math.round(score * 100)}%` }} />
          </div>
          <p className="guidance-text">{guidance}</p>
        </div>

        <div className="slider-column">
          <h3>Stabilizers</h3>
          {stabilizerFields.map((field) => (
            <RangeField
              key={field.key}
              label={field.label}
              symbol={field.symbol}
              help={field.help}
              value={inputs[field.key]}
              onChange={(value) => updateField(field.key, value)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function getPretendingForceGuidance(score: number): string {
  if (score < 0.25) {
    return 'Gentle truth may be available here. Still move with consent, timing, and care.';
  }

  if (score < 0.5) {
    return 'Some mask pressure may be active. Consider one small truth, not a dramatic reveal.';
  }

  if (score < 0.75) {
    return 'Truth may need preparation. Strengthen safety, support, and repair paths before speaking.';
  }

  return 'Pause before disclosure. This setting may punish truth; prioritize safety, support, and distance from coercion.';
}
