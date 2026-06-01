import type { ReactNode } from 'react';
import { Eye, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { AntiManipulationMode } from './components/AntiManipulationMode';
import { ConsentLanguageBuilder } from './components/ConsentLanguageBuilder';
import { DailyMirrorDeck } from './components/DailyMirrorDeck';
import { FrontstageBackstageMap } from './components/FrontstageBackstageMap';
import { GentleIntegrationPlanner } from './components/GentleIntegrationPlanner';
import { GroupPretendingSimulator } from './components/GroupPretendingSimulator';
import { GuidedPracticeMode } from './components/GuidedPracticeMode';
import { LaunchCompass } from './components/LaunchCompass';
import { LocalDataCenter } from './components/LocalDataCenter';
import { LocalInsightsDashboard } from './components/LocalInsightsDashboard';
import { LocalMirrorJournal } from './components/LocalMirrorJournal';
import { LocalReflectionReport } from './components/LocalReflectionReport';
import { LocalTrustCheck } from './components/LocalTrustCheck';
import { MaskLoadCalculator } from './components/MaskLoadCalculator';
import { OfflineReadyPanel } from './components/OfflineReadyPanel';
import { PretendingForceMeter } from './components/PretendingForceMeter';
import { SafeTruthPlanner } from './components/SafeTruthPlanner';
import { masks } from './data/masks';

export function App() {
  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="#launch-compass">Start</a>
        <a href="#trust-check">Trust</a>
        <a href="#data-center">Data</a>
        <a href="#daily-deck">Daily Card</a>
        <a href="#mirror-journal">Journal</a>
        <a href="#local-insights">Insights</a>
        <a href="#integration-planner">Integrate</a>
        <a href="#consent-language">Language</a>
        <a href="#guided-practice">Practice</a>
        <a href="#offline-ready">Offline</a>
        <a href="#engine">Pretending Force</a>
        <a href="#mask-load">Mask Load</a>
        <a href="#frontstage">Rooms</a>
        <a href="#truth-planner">Truth Planner</a>
        <a href="#group-field">Group Field</a>
        <a href="#anti-manipulation">Anti-Manipulation</a>
        <a href="#local-report">Vault</a>
        <a href="#atlas">Mask Atlas</a>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <Sparkles size={18} />
          v1.7 local trust check
        </div>
        <h1>PersonaMirror369</h1>
        <p className="subtitle">A humane atlas for the masks we wear.</p>
        <p className="hero-copy">
          Verify local browser support, protect your continuity data, and keep the reflection loop
          transparent, local-first, and consent-centered.
        </p>
        <div className="hero-actions">
          <a href="#trust-check">Open Trust Check</a>
          <a href="#data-center" className="secondary">Open Continuity Center</a>
        </div>
      </section>

      <section id="ethics" className="principles-grid" aria-label="Ethical principles">
        <PrincipleCard
          icon={<ShieldCheck />}
          title="Consent First"
          body="No forced disclosure, no social scoring, no profiling without permission."
        />
        <PrincipleCard
          icon={<HeartHandshake />}
          title="Mercy Before Exposure"
          body="The work is not to rip masks off. The work is to make truth safer."
        />
        <PrincipleCard
          icon={<Eye />}
          title="Discernment Without Shame"
          body="A mask is not automatically a lie. Many masks began as protection."
        />
      </section>

      <LaunchCompass />
      <LocalTrustCheck />
      <LocalDataCenter />
      <OfflineReadyPanel />
      <DailyMirrorDeck />
      <LocalMirrorJournal />
      <LocalInsightsDashboard />
      <GentleIntegrationPlanner />
      <ConsentLanguageBuilder />
      <GuidedPracticeMode />
      <PretendingForceMeter />
      <MaskLoadCalculator />
      <FrontstageBackstageMap />
      <SafeTruthPlanner />
      <GroupPretendingSimulator />
      <AntiManipulationMode />
      <LocalReflectionReport />

      <section id="atlas" className="atlas-section">
        <p className="section-kicker">Mask Atlas</p>
        <h2>12 starter masks</h2>
        <div className="mask-grid">
          {masks.map((mask) => (
            <article className="mask-card" key={mask.id}>
              <div className="mask-card-topline">
                <span>{mask.archetype}</span>
                <span>{mask.polarity}</span>
              </div>
              <h3>{mask.name}</h3>
              <p>{mask.shortDescription}</p>
              <dl>
                <div>
                  <dt>Gift</dt>
                  <dd>{mask.protectiveFunction}</dd>
                </div>
                <div>
                  <dt>Risk</dt>
                  <dd>{mask.shadowRisk}</dd>
                </div>
                <div>
                  <dt>Integration</dt>
                  <dd>{mask.healthyIntegration}</dd>
                </div>
              </dl>
              <blockquote>{mask.reflectionQuestion}</blockquote>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function PrincipleCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <article className="principle-card">
      <div className="principle-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}
