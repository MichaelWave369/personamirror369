export interface PretendingForceInputs {
  shameRisk: number;
  belongingRisk: number;
  punishmentRisk: number;
  financialSurvivalRisk: number;
  approvalReward: number;
  egoReward: number;
  truthSafety: number;
  selfCompassion: number;
  privateCoherence: number;
  repairCapacity: number;
}

export interface MaskLoadInputs {
  intensity: number;
  frequency: number;
  rigidity: number;
  truthDistance: number;
  timeWorn: number;
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function scorePretendingForce(inputs: PretendingForceInputs): number {
  const pressure =
    inputs.shameRisk +
    inputs.belongingRisk +
    inputs.punishmentRisk +
    inputs.financialSurvivalRisk +
    inputs.approvalReward +
    inputs.egoReward;

  const stabilizers =
    inputs.truthSafety +
    inputs.selfCompassion +
    inputs.privateCoherence +
    inputs.repairCapacity;

  const normalized = (pressure / 6 - stabilizers / 4 + 1) / 2;
  return clamp01(normalized);
}

export function scoreMaskLoad(inputs: MaskLoadInputs): number {
  const raw =
    inputs.intensity *
    inputs.frequency *
    inputs.rigidity *
    inputs.truthDistance *
    inputs.timeWorn;

  return clamp01(raw);
}

export function describePretendingForce(score: number): string {
  if (score < 0.25) return 'Low pressure: truth appears relatively safe here.';
  if (score < 0.5) return 'Moderate pressure: some performance may be active.';
  if (score < 0.75) return 'High pressure: masking is likely protective or socially rewarded.';
  return 'Severe pressure: truth may feel costly, unsafe, or socially punished.';
}

export function describeMaskLoad(score: number): string {
  if (score < 0.25) return 'Light mask: likely temporary, conscious, or easy to remove.';
  if (score < 0.5) return 'Active mask: useful to examine with compassion.';
  if (score < 0.75) return 'Heavy mask: may be shaping behavior and relationships.';
  return 'Prison mask risk: may be rigid, chronic, fear-driven, or identity-fused.';
}
