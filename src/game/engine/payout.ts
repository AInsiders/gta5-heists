import type { PayoutResult, Heist, Player } from '../types'

export function calculatePayout(params: {
  heist: Heist
  success: boolean
  stealthBonus: number
  timeBonus: number
  damagePenalty: number
  crewCutPercent: number
}): PayoutResult {
  const {
    heist,
    success,
    stealthBonus,
    timeBonus,
    damagePenalty,
    crewCutPercent,
  } = params

  const basePayout = success ? heist.basePayout : Math.floor(heist.basePayout * 0.1)
  const totalBonus = stealthBonus + timeBonus - damagePenalty
  const grossPayout = Math.max(0, basePayout * (1 + totalBonus))
  const crewCuts = Math.floor(grossPayout * (crewCutPercent / 100))
  const playerTake = Math.max(0, grossPayout - crewCuts)

  return {
    basePayout,
    stealthBonus: Math.floor(basePayout * stealthBonus),
    timeBonus: Math.floor(basePayout * timeBonus),
    damagePenalty: Math.floor(basePayout * damagePenalty),
    crewCuts,
    playerTake,
    success,
  }
}

export function canAffordHeist(player: Player, heist: Heist): boolean {
  return player.money >= heist.buyInCost
}
