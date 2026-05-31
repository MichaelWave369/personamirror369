import { useMemo, useState } from 'react';
import { RangeField } from './RangeField';

interface GroupFieldInputs {
  privateDisagreement: number;
  publicConformity: number;
  punishmentRisk: number;
  visibilityPressure: number;
  imitationPressure: number;
  trustDensity: number;
}

const defaultInputs: GroupFieldInputs = {
  privateDisagreement: 0.64,
  publicConformity: 0.72,
  punishmentRisk: 0.58,
  visibilityPressure: 0.66,
  imitationPressure: 0.61,
  trustDensity: 0.32,
};

const examples = [
  'A workplace where everyone says the project is fine, but privately knows it is failing.',
  'A family room where nobody challenges a harmful story because belonging feels at risk.',
  'An online crowd where disagreement is punished by ridicule, pile-ons, or exile.',
  'A community where people perform certainty because doubt is treated as betrayal.',
];

export function GroupPretendingSimulator() {
  const [inputs, setInputs] = useState<GroupFieldInputs>(defaultInputs);
  const score = useMemo(() => scoreGroupPretendingField(inputs), [inputs]);
  const interpretation = getGroupFieldInterpretation(score, inputs.trustDensity);

  function updateField(key: keyof GroupFieldInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <section id="group-field" className="panel interactive-panel">
      <div className="panel-heading">
        <p className="section-kicker">Group Pretending Simulator</p>
        <h2>False norms grow when private truth has nowhere safe to land.</h2>
        <p>
          This simulator models how a group can publicly perform agreement while privately carrying
          doubt, fear, resentment, or dissent. The goal is not exposure — it is safer truth design.
        </p>
      </div>

      <div className="society-grid">
        <div className="slider-column">
          <h3>Group pressure signals</h3>
          <RangeField
            label="Private Disagreement"
            symbol="PD"
            help="How many people may privately disagree, doubt, or feel uneasy?"
            value={inputs.privateDisagreement}
            onChange={(value) => updateField('privateDisagreement', value)}
          />
          <RangeField
            label="Public Conformity"
            symbol="PCF"
            help="How strongly does the group publicly perform agreement?"
            value={inputs.publicConformity}
            onChange={(value) => updateField('publicConformity', value)}
          />
          <RangeField
            label="Punishment Risk"
            symbol="PR"
            help="How costly is it to disagree, question, or clarify?"
            value={inputs.punishmentRisk}
            onChange={(value) => updateField('punishmentRisk', value)}
          />
          <RangeField
            label="Visibility Pressure"
            symbol="VP"
            help="How public is the performance?"
            value={inputs.visibilityPressure}
            onChange={(value) => updateField('visibilityPressure', value)}
          />
          <RangeField
            label="Imitation Pressure"
            symbol="IP"
            help="How much does everyone copy what everyone else appears to believe?"
            value={inputs.imitationPressure}
            onChange={(value) => updateField('imitationPressure', value)}
          />
          <RangeField
            label="Trust Density"
            symbol="TD"
            help="How much real trust, privacy, mercy, and repair exists in the group?"
            value={inputs.trustDensity}
            onChange={(value) => updateField('trustDensity', value)}
          />
        </div>

        <article className="society-score-card">
          <span className="score-label">Group Pretending Field</span>
          <strong>{Math.round(score * 100)}%</strong>
          <div className="score-bar" aria-hidden="true">
            <span style={{ width: `${Math.round(score * 100)}%` }} />
          </div>
          <h3>{interpretation.title}</h3>
          <p>{interpretation.body}</p>
          <blockquote>{interpretation.repair}</blockquote>
        </article>
      </div>

      <div className="scenario-strip" aria-label="Example group pretending scenarios">
        {examples.map((example) => (
          <article className="scenario-card" key={example}>
            <p>{example}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function scoreGroupPretendingField(inputs: GroupFieldInputs): number {
  const pressure =
    inputs.privateDisagreement * 0.18 +
    inputs.publicConformity * 0.2 +
    inputs.punishmentRisk * 0.22 +
    inputs.visibilityPressure * 0.14 +
    inputs.imitationPressure * 0.16 +
    (1 - inputs.trustDensity) * 0.1;

  return Math.max(0, Math.min(1, pressure));
}

function getGroupFieldInterpretation(score: number, trustDensity: number) {
  if (score < 0.3) {
    return {
      title: 'Low false-norm pressure',
      body: 'This group may have enough trust for disagreement, clarification, or course correction to surface naturally.',
      repair: 'Keep protecting dissent, privacy, and repair. Trust is a living infrastructure.',
    };
  }

  if (score < 0.55) {
    return {
      title: 'Moderate silence pressure',
      body: 'Some people may be editing themselves to preserve belonging. Start with low-risk questions and private check-ins.',
      repair: 'Ask: “What might we not be saying because it feels inconvenient or unsafe?”',
    };
  }

  if (score < 0.78) {
    return {
      title: 'High pretending field',
      body: 'The group may be publicly performing agreement while privately carrying doubt or fear.',
      repair: 'Create anonymous signals, no-punishment feedback, and repair paths before demanding open truth.',
    };
  }

  return {
    title: trustDensity < 0.25 ? 'Severe false consensus risk' : 'Severe public-performance pressure',
    body: 'Truth may be socially punished here. People may comply outwardly while disconnecting inwardly.',
    repair: 'Do not force confession. Reduce punishment, lower visibility, build trust cells, and make dissent survivable.',
  };
}
