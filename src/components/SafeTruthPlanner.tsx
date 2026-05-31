import { useMemo, useState } from 'react';
import { RangeField } from './RangeField';

interface TruthPlanInputs {
  urgency: number;
  safety: number;
  consent: number;
  support: number;
  repairPath: number;
  consequenceRisk: number;
}

const defaultInputs: TruthPlanInputs = {
  urgency: 0.48,
  safety: 0.46,
  consent: 0.5,
  support: 0.42,
  repairPath: 0.36,
  consequenceRisk: 0.52,
};

const actionCards = [
  {
    title: 'Pause and gather safety',
    body: 'Use when truth feels urgent but the room may punish honesty. Delay is not dishonesty when it protects safety.',
  },
  {
    title: 'Journal privately first',
    body: 'Use when the truth is real but not yet clean. Let the first draft be messy and private.',
  },
  {
    title: 'Ask for consent to share',
    body: 'Use when the person may be open, but timing matters. “Is now a good time for something honest?”',
  },
  {
    title: 'Speak one small truth',
    body: 'Use when safety is moderate. Choose the smallest honest sentence that does not create unnecessary rupture.',
  },
  {
    title: 'Set a boundary',
    body: 'Use when the issue is repeated pressure. Boundaries protect connection from resentment.',
  },
  {
    title: 'Repair a rupture',
    body: 'Use when something already broke. Repair does not require self-erasure; it requires accountable clarity.',
  },
  {
    title: 'Seek trusted support',
    body: 'Use when the truth involves fear, dependence, danger, or a pattern that feels too heavy to hold alone.',
  },
  {
    title: 'Leave the unsafe room',
    body: 'Use when truth is being used against you. Safety outranks performance, persuasion, and approval.',
  },
];

export function SafeTruthPlanner() {
  const [inputs, setInputs] = useState<TruthPlanInputs>(defaultInputs);
  const readiness = useMemo(() => scoreTruthReadiness(inputs), [inputs]);
  const recommendation = getTruthRecommendation(readiness, inputs);

  function updateField(key: keyof TruthPlanInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <section id="truth-planner" className="panel interactive-panel">
      <div className="panel-heading">
        <p className="section-kicker">Safe Truth Planner</p>
        <h2>Truth needs timing, consent, safety, and repair.</h2>
        <p>
          This planner does not push confession. It helps choose a humane next step when a mask is
          ready to soften but the room still matters.
        </p>
      </div>

      <div className="planner-grid">
        <div className="slider-column">
          <h3>Truth conditions</h3>
          <RangeField
            label="Urgency"
            symbol="U"
            help="How strongly does this truth want attention now?"
            value={inputs.urgency}
            onChange={(value) => updateField('urgency', value)}
          />
          <RangeField
            label="Safety"
            symbol="S"
            help="How safe is the setting for honest expression?"
            value={inputs.safety}
            onChange={(value) => updateField('safety', value)}
          />
          <RangeField
            label="Consent"
            symbol="C"
            help="Has the other person or group shown openness to hear it?"
            value={inputs.consent}
            onChange={(value) => updateField('consent', value)}
          />
          <RangeField
            label="Support"
            symbol="SP"
            help="How much trusted support is available before or after?"
            value={inputs.support}
            onChange={(value) => updateField('support', value)}
          />
          <RangeField
            label="Repair Path"
            symbol="R"
            help="Is there a way to clarify, apologize, renegotiate, or reconnect?"
            value={inputs.repairPath}
            onChange={(value) => updateField('repairPath', value)}
          />
          <RangeField
            label="Consequence Risk"
            symbol="CR"
            help="How much could honesty trigger punishment, instability, or harm?"
            value={inputs.consequenceRisk}
            onChange={(value) => updateField('consequenceRisk', value)}
          />
        </div>

        <article className="truth-result-card">
          <span className="score-label">Truth Readiness</span>
          <strong>{Math.round(readiness * 100)}%</strong>
          <div className="score-bar" aria-hidden="true">
            <span style={{ width: `${Math.round(readiness * 100)}%` }} />
          </div>
          <h3>{recommendation.title}</h3>
          <p>{recommendation.body}</p>
          <blockquote>{recommendation.mantra}</blockquote>
        </article>
      </div>

      <div className="action-grid" aria-label="Safe truth action menu">
        {actionCards.map((card) => (
          <article className="action-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function scoreTruthReadiness(inputs: TruthPlanInputs): number {
  const readiness =
    inputs.urgency * 0.16 +
    inputs.safety * 0.22 +
    inputs.consent * 0.18 +
    inputs.support * 0.16 +
    inputs.repairPath * 0.18 +
    (1 - inputs.consequenceRisk) * 0.1;

  return Math.max(0, Math.min(1, readiness));
}

function getTruthRecommendation(readiness: number, inputs: TruthPlanInputs) {
  if (inputs.consequenceRisk > 0.75 && inputs.safety < 0.45) {
    return {
      title: 'Protect safety before speaking',
      body: 'This may be an unsafe room for direct truth. Do not force disclosure. Build distance, support, documentation, or a safer setting first.',
      mantra: 'Safety is not avoidance. Safety is the ground truth stands on.',
    };
  }

  if (readiness < 0.35) {
    return {
      title: 'Pause and prepare',
      body: 'The truth may be real, but the conditions are not ready. Journal privately, clarify the core truth, and strengthen support.',
      mantra: 'Not yet can be wisdom, not cowardice.',
    };
  }

  if (readiness < 0.58) {
    return {
      title: 'Ask for consent, then share one small truth',
      body: 'The room has partial safety. Start with consent and keep the truth specific, gentle, and repairable.',
      mantra: 'Small truth, clean tone, open repair path.',
    };
  }

  if (readiness < 0.78) {
    return {
      title: 'Speak clearly with mercy',
      body: 'The conditions look supportive enough for honest expression. Stay humble, avoid accusation, and name what repair would help.',
      mantra: 'Truth without mercy becomes exposure; mercy without truth becomes avoidance.',
    };
  }

  return {
    title: 'Invite repair or deeper honesty',
    body: 'This appears to be a high-readiness truth moment. Speak with clarity, ask questions, and make room for mutual repair.',
    mantra: 'Truth plus mercy creates release.',
  };
}
