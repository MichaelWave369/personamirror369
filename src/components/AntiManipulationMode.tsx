import { useMemo, useState } from 'react';
import { RangeField } from './RangeField';

interface ManipulationInputs {
  shamePressure: number;
  fearUrgency: number;
  isolationPressure: number;
  approvalBait: number;
  falseChoice: number;
  repairBlocked: number;
  consentPresent: number;
  clarityPresent: number;
}

const defaultInputs: ManipulationInputs = {
  shamePressure: 0.58,
  fearUrgency: 0.62,
  isolationPressure: 0.38,
  approvalBait: 0.48,
  falseChoice: 0.52,
  repairBlocked: 0.44,
  consentPresent: 0.34,
  clarityPresent: 0.42,
};

const redFlags = [
  {
    title: 'Shame hook',
    body: 'You are pushed to comply because refusing would make you bad, selfish, disloyal, weak, or unloving.',
  },
  {
    title: 'False urgency',
    body: 'You are told you must decide now before you can think, rest, research, or ask someone safe.',
  },
  {
    title: 'Isolation pressure',
    body: 'You are discouraged from talking to trusted people who might help you regain perspective.',
  },
  {
    title: 'Approval bait',
    body: 'You are offered belonging, praise, status, or love only if you perform the expected mask.',
  },
  {
    title: 'False choice',
    body: 'You are given two extreme options while reasonable middle paths are hidden or mocked.',
  },
  {
    title: 'Repair blocked',
    body: 'Questions, boundaries, clarification, or repair attempts are treated as betrayal.',
  },
];

export function AntiManipulationMode() {
  const [inputs, setInputs] = useState<ManipulationInputs>(defaultInputs);
  const score = useMemo(() => scoreManipulationPressure(inputs), [inputs]);
  const guidance = getManipulationGuidance(score, inputs);

  function updateField(key: keyof ManipulationInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <section id="anti-manipulation" className="panel interactive-panel">
      <div className="panel-heading">
        <p className="section-kicker">Anti-Manipulation Mode</p>
        <h2>Detect pressure without becoming paranoid.</h2>
        <p>
          This mode helps users notice when a person, group, feed, or institution may be pressuring
          them into a mask. It is a protective literacy tool, not a mind-reading machine.
        </p>
      </div>

      <div className="society-grid">
        <div className="slider-column">
          <h3>Pressure tactics</h3>
          <RangeField
            label="Shame Pressure"
            symbol="SP"
            help="Am I being made to feel bad, impure, weak, selfish, or disloyal for pausing?"
            value={inputs.shamePressure}
            onChange={(value) => updateField('shamePressure', value)}
          />
          <RangeField
            label="Fear / Urgency"
            symbol="FU"
            help="Am I being rushed by fear before I can reflect?"
            value={inputs.fearUrgency}
            onChange={(value) => updateField('fearUrgency', value)}
          />
          <RangeField
            label="Isolation Pressure"
            symbol="IP"
            help="Am I being pulled away from trusted witnesses or outside information?"
            value={inputs.isolationPressure}
            onChange={(value) => updateField('isolationPressure', value)}
          />
          <RangeField
            label="Approval Bait"
            symbol="AB"
            help="Is praise, status, love, or belonging being used as bait?"
            value={inputs.approvalBait}
            onChange={(value) => updateField('approvalBait', value)}
          />
          <RangeField
            label="False Choice"
            symbol="FC"
            help="Are reasonable middle paths being hidden, mocked, or forbidden?"
            value={inputs.falseChoice}
            onChange={(value) => updateField('falseChoice', value)}
          />
          <RangeField
            label="Repair Blocked"
            symbol="RB"
            help="Are questions, boundaries, or clarification treated as betrayal?"
            value={inputs.repairBlocked}
            onChange={(value) => updateField('repairBlocked', value)}
          />
        </div>

        <article className="society-score-card protective-card">
          <span className="score-label">Manipulation Pressure</span>
          <strong>{Math.round(score * 100)}%</strong>
          <div className="score-bar" aria-hidden="true">
            <span style={{ width: `${Math.round(score * 100)}%` }} />
          </div>
          <h3>{guidance.title}</h3>
          <p>{guidance.body}</p>
          <blockquote>{guidance.nextStep}</blockquote>
        </article>

        <div className="slider-column">
          <h3>Protective stabilizers</h3>
          <RangeField
            label="Consent Present"
            symbol="CP"
            help="Can I say no, pause, ask questions, or leave without punishment?"
            value={inputs.consentPresent}
            onChange={(value) => updateField('consentPresent', value)}
          />
          <RangeField
            label="Clarity Present"
            symbol="CL"
            help="Are the claims, motives, consequences, and options clear enough to examine?"
            value={inputs.clarityPresent}
            onChange={(value) => updateField('clarityPresent', value)}
          />
          <div className="mini-summary-card">
            <h3>Consent Gate</h3>
            <p>
              A healthy influence attempt preserves your ability to pause, question, decline, seek
              support, and repair misunderstanding.
            </p>
            <blockquote>If no is punished, yes is not fully free.</blockquote>
          </div>
        </div>
      </div>

      <div className="action-grid" aria-label="Manipulation red flags">
        {redFlags.map((flag) => (
          <article className="action-card" key={flag.title}>
            <h3>{flag.title}</h3>
            <p>{flag.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function scoreManipulationPressure(inputs: ManipulationInputs): number {
  const pressure =
    inputs.shamePressure * 0.16 +
    inputs.fearUrgency * 0.16 +
    inputs.isolationPressure * 0.15 +
    inputs.approvalBait * 0.13 +
    inputs.falseChoice * 0.14 +
    inputs.repairBlocked * 0.14 +
    (1 - inputs.consentPresent) * 0.07 +
    (1 - inputs.clarityPresent) * 0.05;

  return Math.max(0, Math.min(1, pressure));
}

function getManipulationGuidance(score: number, inputs: ManipulationInputs) {
  if (inputs.consentPresent < 0.25 && score > 0.6) {
    return {
      title: 'Consent may be compromised',
      body: 'This pressure pattern may be limiting your ability to pause, ask questions, say no, or seek outside support.',
      nextStep: 'Slow down. Bring in a trusted witness, document the pressure, and avoid irreversible decisions.',
    };
  }

  if (score < 0.3) {
    return {
      title: 'Low pressure pattern',
      body: 'This situation may allow reflection, consent, and disagreement. Stay aware, but do not assume bad intent.',
      nextStep: 'Ask clarifying questions and keep your agency online.',
    };
  }

  if (score < 0.55) {
    return {
      title: 'Mixed influence pattern',
      body: 'Some pressure cues are present. The situation may still be workable if consent, clarity, and repair remain available.',
      nextStep: 'Pause, ask for time, and look for whether questions are welcomed or punished.',
    };
  }

  if (score < 0.78) {
    return {
      title: 'High steering pressure',
      body: 'This may be pushing you toward a mask, decision, belief, or performance before your full agency is online.',
      nextStep: 'Do not rush. Seek trusted perspective and reduce shame/fear before choosing.',
    };
  }

  return {
    title: 'Severe coercive pressure risk',
    body: 'This pattern may be using shame, fear, isolation, false choice, or blocked repair to steer behavior.',
    nextStep: 'Prioritize safety and support. Distance yourself from irreversible commitments until clarity returns.',
  };
}
