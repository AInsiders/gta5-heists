/**
 * GTA Heists WebUI — Core Type Definitions
 */

// ─── Game State Machine ─────────────────────────────────────────────
export type GameState =
  | 'IDLE'
  | 'SELECT_HEIST'
  | 'SETUP_PHASE'
  | 'ROLE_ASSIGNMENT'
  | 'FINAL_HEIST'
  | 'RESULT'
  | 'PAYOUT'
  | 'UNLOCK_NEXT'

// ─── Player ─────────────────────────────────────────────────────────
export interface Player {
  level: number
  money: number
  reputation: number
  xp: number
  completedHeists: string[]
  crewSkill: CrewSkill
}

export interface CrewSkill {
  hacker: number
  driver: number
  gunman: number
}

// ─── Heist ──────────────────────────────────────────────────────────
export interface Heist {
  id: string
  name: string
  unlockLevel: number
  buyInCost: number
  basePayout: number
  difficulty: number
  riskFactor: number
  setups: SetupTask[]
  finalMission: FinalMission
}

export interface SetupTask {
  id: string
  name: string
  type: 'timing' | 'decision' | 'hack' | 'resource'
  riskImpact: number
  successImpact: number
  rewardBonus: number
  completed: boolean
  result?: 'success' | 'fail' | null
}

export interface FinalMission {
  phases: HeistPhase[]
  alarmThreshold: number
  stealthBonus: number
}

export type HeistPhase = 'ENTRY' | 'VAULT' | 'ESCAPE'

// ─── Role Assignment ────────────────────────────────────────────────
export type RoleType = 'hacker' | 'driver' | 'gunman'

export interface Role {
  type: RoleType
  skillLevel: number
  cutPercent: number
  riskImpact: number
  specialAbility: string
  assigned: boolean
}

// ─── Heist Execution ────────────────────────────────────────────────
export interface HeistExecution {
  alarmLevel: number
  stealthMeter: number
  crewMorale: number
  currentPhase: HeistPhase
  phaseResults: Record<HeistPhase, 'success' | 'fail' | null>
}

// ─── Payout ─────────────────────────────────────────────────────────
export interface PayoutResult {
  basePayout: number
  stealthBonus: number
  timeBonus: number
  damagePenalty: number
  crewCuts: number
  playerTake: number
  success: boolean
}

// ─── Success Calculation ────────────────────────────────────────────
export interface SuccessFactors {
  setupSuccessRate: number
  crewSkillModifier: number
  alarmLevel: number
  riskAccumulated: number
  randomFactor: number
  finalScore: number
  threshold: number
  success: boolean
}
