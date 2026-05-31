import { Brain, Eye, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { masks } from './data/masks';
import { describePretendingForce, scorePretendingForce } from './data/formulas';

const starterScore = scorePretendingForce({
  shameRisk: 0.72,
  belongingRisk: 0.68,
  punishmentRisk: 0.42,
  financialSurvivalRisk: 0.36,
  approvalReward: 0.7,
  egoReward: 0.55,
  truthSafety: 0.38,
  selfCompassion: 0.44,
  privateCoherence: 0.5,
  repairCapacity: 0.31,
});

export function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="eyebrow">
          <Sparkles size={18} />
          v0.1 genesis scaffold
        </div>
        <h1>PersonaMirror369</h1>
        <p className="subtitle">A humane atlas for the masks we wear.</p>
        <p className="hero-copy">
          Map social masks, measure pretending pressure, and practice safer truth without shame,
          coercion, exposure, or manipulation.
        </p>
        <div className="hero-actions">
          <a href="#atlas">Explore the Mask Atlas</a>
          <a href="#engine" className="secondary">View the Pretending Force Engine</a>
        </div>
      </section>

      <section className="principles-grid" aria-label="Ethical principles">
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

      <section id="engine" className="panel engine-panel">
        <div>
          <p className="section-kicker">Pretending Force Engine</p>
          <h2>When pressure rises, the mask tightens.</h2>
          <p>
            Pretending Force estimates the pressure pushing a person away from private truth and
            into performance, silence, conformity, or false certainty.
          </p>
          <pre>{'PF = (SR + BR + PR + FR + AR + ER) - (TS + SC + PC + RC)'}</pre>
        </div>
        <div className="score-card">
          <Brain size={34} />
          <span className="score-label">Demo Pretending Force</span>
          <strong>{Math.round(starterScore * 100)}%</strong>
          <p>{describePretendingForce(starterScore)}</p>
        </div>
      </section>

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

function PrincipleCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="principle-card">
      <div className="principle-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}
