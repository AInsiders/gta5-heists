import { describe, it, expect } from 'vitest'
import { calculateSuccess, crewSkillToModifier, setupsToSuccessRate } from './success'

describe('calculateSuccess', () => {
  it('returns success when score >= threshold', () => {
    const result = calculateSuccess({
      setupSuccessRate: 70,
      crewSkillModifier: 20,
      alarmLevel: 5,
      riskAccumulated: 0,
      seed: 0.5,
    })
    expect(result.finalScore).toBeGreaterThanOrEqual(50)
    expect(result.success).toBe(true)
  })

  it('returns failure when score < threshold', () => {
    const result = calculateSuccess({
      setupSuccessRate: 10,
      crewSkillModifier: 5,
      alarmLevel: 50,
      riskAccumulated: 30,
      seed: 1,
    })
    expect(result.success).toBe(false)
  })
})

describe('crewSkillToModifier', () => {
  it('returns modifier from avg crew skill', () => {
    expect(crewSkillToModifier(2, 2, 2)).toBe(10)
    expect(crewSkillToModifier(5, 5, 5)).toBe(25)
    expect(crewSkillToModifier(10, 10, 10)).toBe(30) // capped
  })
})

describe('setupsToSuccessRate', () => {
  it('returns 0 for no setups', () => {
    expect(setupsToSuccessRate(0, 0, [])).toBe(0)
  })

  it('returns higher rate for more successful setups', () => {
    const all = setupsToSuccessRate(4, 4, [0.2, 0.2, 0.2, 0.2])
    const half = setupsToSuccessRate(4, 2, [0.2, 0.2])
    expect(all).toBeGreaterThan(half)
  })
})
