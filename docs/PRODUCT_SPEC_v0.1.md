# PersonaMirror369 Product Spec v0.1

## Product Name

PersonaMirror369

## Subtitle

A humane atlas for the masks we wear.

## Internal Engine Name

Pretending Force Engine

## Purpose

PersonaMirror369 helps people identify the masks they wear, understand what pressures created them, and find safer ways to return toward truthful coherence.

The product is a public-facing React app, research paper, formula atlas, and ethical reflection framework.

## Primary Users

- individuals doing self-reflection
- writers and designers building character systems
- educators teaching social pressure and media literacy
- families and communities exploring truth-safety
- AI companion designers building humane reflection tools
- teams discussing psychological safety and performance pressure

## Non-Users / Rejected Use Cases

PersonaMirror369 is not for:

- employers ranking authenticity
- interrogating partners
- diagnosing personality disorders
- detecting lies
- surveillance
- manipulative persuasion
- social scoring

## Core User Journey

1. User lands on the homepage.
2. User learns the project boundary: masks are protective interfaces, not moral failures.
3. User explores the Mask Atlas.
4. User uses sliders to estimate Pretending Force in a context.
5. User maps frontstage and backstage selves.
6. User receives reflection prompts, not accusations.
7. User chooses a safe next step: pause, journal, speak, ask for support, set boundary, or repair.

## MVP Screens

### 1. Home

Explains the thesis, ethics, and project structure.

### 2. Mask Atlas

Displays mask cards with:

- name
- archetype
- protective function
- shadow risk
- healthy integration
- reflection question
- release practice

### 3. Pretending Force Meter

Interactive sliders:

- Shame Risk
- Belonging Risk
- Punishment Risk
- Financial / Survival Risk
- Approval Reward
- Ego Reward
- Truth Safety
- Self-Compassion
- Private Coherence
- Repair Capacity

Output:

- Pretending Force score
- interpretation
- gentle reflection prompt

### 4. Mask Load Calculator

Interactive sliders:

- Intensity
- Frequency
- Rigidity
- Truth Distance
- Time Worn

Output:

- Mask Load score
- protective/adaptive/prison risk framing

### 5. Frontstage / Backstage Map

Contexts:

- Alone
- Family
- Work
- Online
- Faith/community
- Friends
- Strangers

For each context:

- What mask appears?
- What is it protecting?
- What truth is underneath?
- What would make truth safer?

### 6. Safe Truth Planner

Possible next steps:

- Say nothing yet; gather safety.
- Journal privately.
- Speak a small truth.
- Ask for consent to share.
- Set a boundary.
- Repair a rupture.
- Leave an unsafe context.
- Seek trusted support.

### 7. Group Pretending Simulator

Shows how false norms form when people privately disagree but publicly conform.

## Data Model

```ts
interface MaskDefinition {
  id: string;
  name: string;
  archetype: string;
  shortDescription: string;
  protectiveFunction: string;
  shadowRisk: string;
  healthyIntegration: string;
  reflectionQuestion: string;
  releasePractice: string;
  polarity: 'protective' | 'adaptive' | 'prison';
}
```

## Scoring Boundaries

Scores are reflection aids only. They must not be presented as diagnostic, final, or objective truth.

Preferred wording:

```txt
This may suggest...
This could indicate...
You might reflect on...
Consider whether...
```

Avoid:

```txt
You are...
This proves...
Your real identity is...
This diagnosis means...
```

## v0.2 Build Targets

- Build interactive Pretending Force Meter component.
- Build Mask Load Calculator component.
- Add navigation tabs.
- Add formula explainer docs.
- Add local-only reflection state.
- Add GitHub Pages deployment workflow.
- Add literature map with sources.
- Add workshop sheet.

## v0.3 Build Targets

- Add Group Pretending Simulator.
- Add Safe Truth Planner.
- Add exportable reflection summary.
- Add privacy-first local storage toggle.
- Add printable PDF worksheet.

## Core Design Tone

The app should feel:

- warm
- lucid
- non-shaming
- slightly mythic
- emotionally intelligent
- visually beautiful
- serious without being clinical
- protective without being paranoid

## Closing Product Law

```txt
Mask awareness without mercy becomes exposure.
Mercy without truth becomes avoidance.
Truth plus mercy creates release.
```
