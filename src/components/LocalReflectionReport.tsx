import { useMemo, useState } from 'react';
import { masks } from '../data/masks';

const roomOptions = [
  'Alone',
  'Family',
  'Work',
  'Online',
  'Faith / Community',
  'Friends',
  'Strangers',
  'Other / custom room',
];

const pressureOptions = [
  'Low pressure: truth appears relatively safe.',
  'Moderate pressure: some performance may be active.',
  'High pressure: masking is likely protective or socially rewarded.',
  'Severe pressure: truth may feel costly, unsafe, or socially punished.',
  'Group pretending field: public agreement may be hiding private disagreement.',
  'Manipulation pressure: shame, urgency, isolation, or blocked repair may be active.',
];

const nextStepOptions = [
  'Pause and gather safety.',
  'Journal privately first.',
  'Ask for consent to share.',
  'Speak one small truth.',
  'Set a boundary.',
  'Repair a rupture.',
  'Seek trusted support.',
  'Leave the unsafe room.',
];

export function LocalReflectionReport() {
  const [reportTitle, setReportTitle] = useState('PersonaMirror369 Local Reflection Report');
  const [primaryRoom, setPrimaryRoom] = useState(roomOptions[1]);
  const [primaryMaskId, setPrimaryMaskId] = useState(masks[0]?.id ?? 'pleaser');
  const [pressureSignal, setPressureSignal] = useState(pressureOptions[2]);
  const [nextStep, setNextStep] = useState(nextStepOptions[0]);
  const [frontstageSummary, setFrontstageSummary] = useState('');
  const [backstageSummary, setBackstageSummary] = useState('');
  const [truthSafetyNeed, setTruthSafetyNeed] = useState('');
  const [supportPlan, setSupportPlan] = useState('');
  const [status, setStatus] = useState('');

  const selectedMask = masks.find((mask) => mask.id === primaryMaskId) ?? masks[0];

  const report = useMemo(() => {
    const today = new Date().toLocaleDateString();

    return [
      `# ${reportTitle}`,
      '',
      `Generated: ${today}`,
      'Privacy: This report was generated locally in the browser. No account, cloud storage, or tracking is required by PersonaMirror369.',
      '',
      '## Session Snapshot',
      `Primary room / context: ${primaryRoom}`,
      `Primary mask signal: ${selectedMask.name}`,
      `Mask archetype: ${selectedMask.archetype}`,
      `Pressure signal: ${pressureSignal}`,
      `Suggested next step: ${nextStep}`,
      '',
      '## Frontstage',
      frontstageSummary || 'Not written yet.',
      '',
      '## Backstage',
      backstageSummary || 'Not written yet.',
      '',
      '## What This Mask May Be Protecting',
      selectedMask.protectiveFunction,
      '',
      '## Shadow Risk to Watch Gently',
      selectedMask.shadowRisk,
      '',
      '## Healthy Integration',
      selectedMask.healthyIntegration,
      '',
      '## Reflection Question',
      selectedMask.reflectionQuestion,
      '',
      '## Truth Safety Need',
      truthSafetyNeed || 'Not written yet.',
      '',
      '## Support / Repair Plan',
      supportPlan || 'Not written yet.',
      '',
      '## Prime Directive',
      'We do not rip masks off people. We help people feel safe enough to set them down.',
      '',
      '## Claim Boundary',
      'This report is a reflection aid, not a diagnosis, therapy replacement, lie detector, or social score.',
    ].join('\n');
  }, [
    backstageSummary,
    frontstageSummary,
    nextStep,
    pressureSignal,
    primaryRoom,
    reportTitle,
    selectedMask,
    supportPlan,
    truthSafetyNeed,
  ]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report);
      setStatus('Copied report to clipboard.');
    } catch {
      setStatus('Clipboard copy was blocked. You can still select and copy the report preview.');
    }
  }

  function downloadReport() {
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'personamirror369-local-reflection-report.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus('Downloaded local reflection report.');
  }

  return (
    <section id="local-report" className="panel interactive-panel report-panel">
      <div className="panel-heading">
        <p className="section-kicker">Local Reflection Report</p>
        <h2>Turn the session into a private, copyable report.</h2>
        <p>
          Nothing is uploaded here. The report is generated in your browser so you can copy it,
          download it, or delete it without creating an account.
        </p>
      </div>

      <div className="report-grid">
        <div className="report-form">
          <label className="text-field">
            <span>Report title</span>
            <input value={reportTitle} onChange={(event) => setReportTitle(event.target.value)} />
          </label>

          <label className="select-field">
            <span>Primary room / context</span>
            <select value={primaryRoom} onChange={(event) => setPrimaryRoom(event.target.value)}>
              {roomOptions.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Primary mask signal</span>
            <select value={primaryMaskId} onChange={(event) => setPrimaryMaskId(event.target.value)}>
              {masks.map((mask) => (
                <option key={mask.id} value={mask.id}>
                  {mask.name}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Pressure signal</span>
            <select value={pressureSignal} onChange={(event) => setPressureSignal(event.target.value)}>
              {pressureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Safe next step</span>
            <select value={nextStep} onChange={(event) => setNextStep(event.target.value)}>
              {nextStepOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="text-field-grid">
            <label className="text-field">
              <span>Frontstage summary</span>
              <textarea
                value={frontstageSummary}
                onChange={(event) => setFrontstageSummary(event.target.value)}
                placeholder="What did I show, perform, hide, or over-explain?"
              />
            </label>
            <label className="text-field">
              <span>Backstage summary</span>
              <textarea
                value={backstageSummary}
                onChange={(event) => setBackstageSummary(event.target.value)}
                placeholder="What was privately true underneath the mask?"
              />
            </label>
          </div>

          <label className="text-field">
            <span>Truth safety need</span>
            <textarea
              value={truthSafetyNeed}
              onChange={(event) => setTruthSafetyNeed(event.target.value)}
              placeholder="What safety, privacy, consent, mercy, or timing would help?"
            />
          </label>

          <label className="text-field">
            <span>Support / repair plan</span>
            <textarea
              value={supportPlan}
              onChange={(event) => setSupportPlan(event.target.value)}
              placeholder="Who or what supports the next step? What repair path is available?"
            />
          </label>
        </div>

        <article className="report-preview-card">
          <div className="mask-card-topline">
            <span>Preview</span>
            <span>Local only</span>
          </div>
          <pre className="report-preview">{report}</pre>
          <div className="report-actions">
            <button type="button" onClick={copyReport}>
              Copy report
            </button>
            <button type="button" onClick={downloadReport}>
              Download .txt
            </button>
          </div>
          {status ? <p className="report-status">{status}</p> : null}
        </article>
      </div>
    </section>
  );
}
