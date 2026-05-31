import { useMemo, useState } from 'react';
import { masks } from '../data/masks';
import { describeMaskLoad, scoreMaskLoad, type MaskLoadInputs } from '../data/formulas';
import { RangeField } from './RangeField';

const defaultInputs: MaskLoadInputs = {
  intensity: 0.58,
  frequency: 0.56,
  rigidity: 0.42,
  truthDistance: 0.5,
  timeWorn: 0.48,
};

const loadFields: Array<{
  key: keyof MaskLoadInputs;
  label: string;
  symbol: string;
  help: string;
}> = [
  {
    key: 'intensity',
    label: 'Intensity',
    symbol: 'I',
    help: 'How strongly does this mask take over?',
  },
  {
    key: 'frequency',
    label: 'Frequency',
    symbol: 'F',
    help: 'How often does this mask appear?',
  },
  {
    key: 'rigidity',
    label: 'Rigidity',
    symbol: 'R',
    help: 'How hard is it to soften or remove?',
  },
  {
    key: 'truthDistance',
    label: 'Truth Distance',
    symbol: 'D',
    help: 'How far is the mask from private truth?',
  },
  {
    key: 'timeWorn',
    label: 'Time Worn',
    symbol: 'T',
    help: 'How much time is spent wearing it?',
  },
];

export function MaskLoadCalculator() {
  const [selectedMaskId, setSelectedMaskId] = useState(masks[0]?.id ?? '');
  const [inputs, setInputs] = useState<MaskLoadInputs>(defaultInputs);

  const selectedMask = masks.find((mask) => mask.id === selectedMaskId) ?? masks[0];
  const score = useMemo(() => scoreMaskLoad(inputs), [inputs]);
  const guidance = getMaskLoadGuidance(score);

  function updateField(key: keyof MaskLoadInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <section id="mask-load" className="panel interactive-panel">
      <div className="panel-heading">
        <p className="section-kicker">Mask Load Calculator</p>
        <h2>Is the mask light, active, heavy, or becoming a prison?</h2>
        <p>
          Choose a mask, then estimate how intensely and rigidly it shows up. The result is a
          compassionate reflection signal — not a verdict.
        </p>
      </div>

      <div className="calculator-grid">
        <div className="slider-column">
          <label className="select-field">
            <span>Mask to examine</span>
            <select value={selectedMaskId} onChange={(event) => setSelectedMaskId(event.target.value)}>
              {masks.map((mask) => (
                <option key={mask.id} value={mask.id}>
                  {mask.name}
                </option>
              ))}
            </select>
          </label>

          {loadFields.map((field) => (
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

        <article className="mask-load-card">
          <div className="mask-card-topline">
            <span>{selectedMask.archetype}</span>
            <span>{selectedMask.polarity}</span>
          </div>
          <h3>{selectedMask.name}</h3>
          <p>{selectedMask.shortDescription}</p>
          <div className="score-card compact-score">
            <span className="score-label">Mask Load</span>
            <strong>{Math.round(score * 100)}%</strong>
            <p>{describeMaskLoad(score)}</p>
          </div>
          <dl>
            <div>
              <dt>Healthy integration</dt>
              <dd>{selectedMask.healthyIntegration}</dd>
            </div>
            <div>
              <dt>Gentle release practice</dt>
              <dd>{selectedMask.releasePractice}</dd>
            </div>
          </dl>
          <blockquote>{guidance}</blockquote>
        </article>
      </div>
    </section>
  );
}

function getMaskLoadGuidance(score: number): string {
  if (score < 0.25) {
    return 'This mask may be light enough to use consciously. Keep it chosen, temporary, and removable.';
  }

  if (score < 0.5) {
    return 'This mask is worth noticing. Ask what it is protecting before trying to change it.';
  }

  if (score < 0.75) {
    return 'This mask may be carrying real pressure. Try reducing shame and increasing repair capacity first.';
  }

  return 'This mask may feel identity-fused or hard to set down. Move slowly, privately, and with safe support.';
}
