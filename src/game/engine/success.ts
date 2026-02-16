import type { SuccessFactors } from '../types'

const SUCCESS_THRESHOLD = 50
const RANDOM_RANGE = 20

/**
 * Calculates final heist success based on all factors
 */
export function calculateSuccess(params: {
  setupSuccessRate: number
  crewSkillModifier: number
  alarmLevel: number
  riskAccumulated: number
  seed?: number
}): SuccessFactors {
  const randomFactor =
    typeof params.seed === 'number'
      ? seededRandom(params.seed, -RANDOM_RANGE, RANDOM_RANGE)
      : randomInRange(-RANDOM_RANGE, RANDOM_RANGE)

  const finalScore =
    params.setupSuccessRate +
    params.crewSkillModifier -
    params.alarmLevel -
    params.riskAccumulated +
    randomFactor

  return {
    setupSuccessRate: params.setupSuccessRate,
    crewSkillModifier: params.crewSkillModifier,
    alarmLevel: params.alarmLevel,
    riskAccumulated: params.riskAccumulated,
    randomFactor,
    finalScore,
    threshold: SUCCESS_THRESHOLD,
    success: finalScore >= SUCCESS_THRESHOLD,
  }
}

/**
 * Maps crew skill levels to modifier
 */
export function crewSkillToModifier(
  hacker: number,
  driver: number,
  gunman: number
): number {
  const avg = (hacker + driver + gunman) / 3
  return Math.min(30, Math.floor(avg * 5))
}

/**
 * Maps setup completion to success rate (0–100)
 */
export function setupsToSuccessRate(
  totalSetups: number,
  successfulSetups: number,
  successImpacts: number[]
): number {
  if (totalSetups === 0) return 0
  const baseRate = (successfulSetups / totalSetups) * 60
  const impactBonus = successImpacts.reduce((a, b) => a + b, 0) * 100
  return Math.min(80, baseRate + impactBonus)
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function seededRandom(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000
  const normalized = x - Math.floor(x)
  return normalized * (max - min) + min
}
