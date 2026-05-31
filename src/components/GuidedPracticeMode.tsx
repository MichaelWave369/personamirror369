import { useMemo, useState } from 'react';

interface PracticePathway {
  id: string;
  title: string;
  duration: string;
  bestFor: string;
  intention: string;
  steps: Array<{
    title: string;
    prompt: string;
    microAction: string;
  }>;
  completion: string;
}

const pathways: PracticePathway[] = [
  {
    id: 'three-minute-mask-check',
    title: '3-Minute Mask Check',
    duration: '3 minutes',
    bestFor: 'Quick daily self-awareness without overthinking.',
    intention: 'Notice the active mask, thank it for protecting something, and choose one gentle next step.',
    steps: [
      {
        title: 'Name the room',
        prompt: 'Where am I right now: alone, family, work, online, faith/community, friends, or strangers?',
        microAction: 'Write one room name in your mind or report draft.',
      },
      {
        title: 'Name the mask',
        prompt: 'What mask seems active: pleasing, toughness, expertise, success, spirituality, rebellion, victim, savior, clown, ghost, chameleon, or judge?',
        microAction: 'Pick one mask without judging yourself for it.',
      },
      {
        title: 'Name the protection',
        prompt: 'What might this mask be protecting: belonging, safety, dignity, privacy, control, tenderness, or survival?',
        microAction: 'Say: “This mask may be trying to protect ____.”',
      },
      {
        title: 'Choose one soft move',
        prompt: 'What is one small action that keeps me safe while increasing truth by one percent?',
        microAction: 'Choose pause, journal, clarify, ask consent, set boundary, seek support, or rest.',
      },
    ],
    completion: 'I do not need to rip the mask off. I can bring one percent more truth with mercy.',
  },
  {
    id: 'family-room-reset',
    title: 'Family Room Reset',
    duration: '7 minutes',
    bestFor: 'Family systems, inherited roles, old expectations, and belonging pressure.',
    intention: 'Separate love from performance and find a truth step that does not require self-erasure.',
    steps: [
      {
        title: 'Identify the old role',
        prompt: 'What role do I automatically become in this family room?',
        microAction: 'Name the role as a pattern, not a prison.',
      },
      {
        title: 'Find the belonging risk',
        prompt: 'What am I afraid might happen if I stop performing this role?',
        microAction: 'Write the fear plainly without arguing with it yet.',
      },
      {
        title: 'Protect the inner truth',
        prompt: 'What is privately true that does not need to be announced dramatically?',
        microAction: 'Keep the truth small, clean, and self-owned.',
      },
      {
        title: 'Choose repairable language',
        prompt: 'What sentence could create clarity without accusation?',
        microAction: 'Start with “I notice,” “I feel,” “I need,” or “Can we slow down?”',
      },
    ],
    completion: 'Love does not require self-erasure. Truth can move at the speed of safety.',
  },
  {
    id: 'online-pressure-reset',
    title: 'Online Pressure Reset',
    duration: '5 minutes',
    bestFor: 'Posts, comments, outrage loops, pile-ons, approval bait, and public performance.',
    intention: 'Pause the reflex to perform certainty, outrage, cleverness, or belonging before responding.',
    steps: [
      {
        title: 'Detect the hook',
        prompt: 'Is this asking me to react from shame, fear, anger, status, or belonging pressure?',
        microAction: 'Name the hook before touching the keyboard.',
      },
      {
        title: 'Check consent and clarity',
        prompt: 'Do I understand the claim, context, and consequence clearly enough to respond?',
        microAction: 'If clarity is low, do not let urgency choose for you.',
      },
      {
        title: 'Choose the non-performance option',
        prompt: 'What would I say if I was not trying to win, prove, punish, or be approved?',
        microAction: 'Draft the calm version first, even if you never post it.',
      },
      {
        title: 'Keep agency online',
        prompt: 'Would silence, a question, a boundary, or a delayed response be wiser?',
        microAction: 'Wait one breath longer than the platform wants you to.',
      },
    ],
    completion: 'The feed does not get to decide my nervous system, my mask, or my truth.',
  },
  {
    id: 'work-truth-safety-check',
    title: 'Work Truth-Safety Check',
    duration: '8 minutes',
    bestFor: 'Projects, teams, leadership, false agreement, and “everything is fine” pressure.',
    intention: 'Find a truthful, low-risk signal that improves the work without creating unnecessary rupture.',
    steps: [
      {
        title: 'Name the performance',
        prompt: 'What is the team pretending is fine, clear, safe, done, aligned, or understood?',
        microAction: 'State the performance as a system signal, not a personal attack.',
      },
      {
        title: 'Map the cost of truth',
        prompt: 'What could happen if someone says the quiet part clearly?',
        microAction: 'Separate real risks from imagined embarrassment.',
      },
      {
        title: 'Lower the threat level',
        prompt: 'How can the truth be made easier to hear: private note, question, evidence, option, or prototype?',
        microAction: 'Choose the lowest-drama delivery method.',
      },
      {
        title: 'Offer a repair path',
        prompt: 'What next step lets people adjust without humiliation?',
        microAction: 'Frame truth as course correction, not blame.',
      },
    ],
    completion: 'Good systems make truth survivable before they demand it publicly.',
  },
  {
    id: 'coercive-pressure-first-aid',
    title: 'Coercive Pressure First Aid',
    duration: '6 minutes',
    bestFor: 'Shame hooks, urgency, isolation, false choices, and blocked repair.',
    intention: 'Slow down pressure before it becomes compliance, panic, or self-betrayal.',
    steps: [
      {
        title: 'Pause the countdown',
        prompt: 'Who benefits from me deciding before I can breathe, think, or ask for help?',
        microAction: 'Say: “I need time before I answer.”',
      },
      {
        title: 'Restore witness',
        prompt: 'Who is one safe person or source that can help me regain perspective?',
        microAction: 'Do not stay isolated with pressure if support is available.',
      },
      {
        title: 'Find the missing option',
        prompt: 'What reasonable middle path is being hidden, mocked, or forbidden?',
        microAction: 'Write at least one third option.',
      },
      {
        title: 'Check the no',
        prompt: 'Can I say no, ask questions, or leave without punishment?',
        microAction: 'If no is punished, treat yes as not fully free.',
      },
    ],
    completion: 'My agency comes back when shame, fear, and urgency slow down.',
  },
];

export function GuidedPracticeMode() {
  const [activeId, setActiveId] = useState(pathways[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const activePathway = pathways.find((pathway) => pathway.id === activeId) ?? pathways[0];
  const completedCount = useMemo(
    () => activePathway.steps.filter((_, index) => completedSteps[`${activePathway.id}:${index}`]).length,
    [activePathway, completedSteps],
  );
  const progress = Math.round((completedCount / activePathway.steps.length) * 100);

  function toggleStep(index: number) {
    const key = `${activePathway.id}:${index}`;
    setCompletedSteps((current) => ({ ...current, [key]: !current[key] }));
  }

  function resetActivePathway() {
    setCompletedSteps((current) => {
      const next = { ...current };
      activePathway.steps.forEach((_, index) => {
        delete next[`${activePathway.id}:${index}`];
      });
      return next;
    });
  }

  return (
    <section id="guided-practice" className="panel interactive-panel guided-panel">
      <div className="panel-heading">
        <p className="section-kicker">Guided Practice Mode</p>
        <h2>Start with a pathway, not a blank page.</h2>
        <p>
          These short practices help first-time users move from mask awareness into one safe, concrete
          next step. They are reflection prompts, not diagnosis or forced disclosure.
        </p>
      </div>

      <div className="guided-grid">
        <aside className="pathway-list" aria-label="Guided practice pathways">
          {pathways.map((pathway) => (
            <button
              className={pathway.id === activeId ? 'pathway-button active' : 'pathway-button'}
              key={pathway.id}
              onClick={() => setActiveId(pathway.id)}
              type="button"
            >
              <span>{pathway.title}</span>
              <strong>{pathway.duration}</strong>
            </button>
          ))}
        </aside>

        <article className="guided-card">
          <div className="mask-card-topline">
            <span>{activePathway.duration}</span>
            <span>{progress}% complete</span>
          </div>
          <h3>{activePathway.title}</h3>
          <p>{activePathway.bestFor}</p>
          <blockquote>{activePathway.intention}</blockquote>

          <div className="score-bar guided-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="guided-step-list">
            {activePathway.steps.map((step, index) => {
              const key = `${activePathway.id}:${index}`;
              const isComplete = Boolean(completedSteps[key]);

              return (
                <article className={isComplete ? 'guided-step complete' : 'guided-step'} key={step.title}>
                  <button type="button" onClick={() => toggleStep(index)}>
                    {isComplete ? '✓' : index + 1}
                  </button>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.prompt}</p>
                    <em>{step.microAction}</em>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="guided-completion-card">
            <h4>Completion line</h4>
            <p>{activePathway.completion}</p>
          </div>

          <div className="report-actions">
            <button type="button" onClick={resetActivePathway}>
              Reset this pathway
            </button>
            <a href="#local-report">Send insight to the Vault</a>
          </div>
        </article>
      </div>
    </section>
  );
}
