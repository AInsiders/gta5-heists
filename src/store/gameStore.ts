import { create } from 'zustand'
import type { GameState, Player, Heist, SetupTask, PayoutResult } from '@/game/types'
import { HEISTS } from '@/game/data/heists'
import {
  calculateSuccess,
  crewSkillToModifier,
  setupsToSuccessRate,
  calculatePayout,
  canAffordHeist,
} from '@/game/engine'

const INITIAL_PLAYER: Player = {
  level: 1,
  money: 50000,
  reputation: 0,
  xp: 0,
  completedHeists: [],
  crewSkill: { hacker: 2, driver: 2, gunman: 2 },
}

const XP_PER_LEVEL = 1000

interface GameStore {
  // State
  gameState: GameState
  player: Player
  selectedHeist: Heist | null
  currentSetupIndex: number
  alarmLevel: number
  riskAccumulated: number
  setupSuccessRate: number
  payoutResult: PayoutResult | null

  // Derived
  availableHeists: () => Heist[]
  currentSetup: () => SetupTask | null
  allSetupsComplete: () => boolean

  // Actions
  setGameState: (state: GameState) => void
  selectHeist: (heist: Heist) => void
  buyHeist: () => boolean
  completeSetup: (index: number, success: boolean) => void
  startFinalHeist: () => void
  runFinalHeist: (alarmLevel: number, stealthBonus: number) => void
  applyPayout: () => void
  resetHeist: () => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'IDLE',
  player: INITIAL_PLAYER,
  selectedHeist: null,
  currentSetupIndex: 0,
  alarmLevel: 0,
  riskAccumulated: 0,
  setupSuccessRate: 0,
  payoutResult: null,

  availableHeists: () => {
    const { player } = get()
    return HEISTS.filter((h) => player.level >= h.unlockLevel)
  },

  currentSetup: () => {
    const { selectedHeist, currentSetupIndex } = get()
    if (!selectedHeist) return null
    return selectedHeist.setups[currentSetupIndex] ?? null
  },

  allSetupsComplete: () => {
    const { selectedHeist } = get()
    if (!selectedHeist) return false
    return selectedHeist.setups.every((s) => s.completed)
  },

  setGameState: (gameState) => set({ gameState }),

  selectHeist: (heist) => {
    const heistCopy: Heist = JSON.parse(JSON.stringify(heist))
    heistCopy.setups = heistCopy.setups.map((s) => ({
      ...s,
      completed: false,
      result: null,
    }))
    set({
      selectedHeist: heistCopy,
      gameState: 'SELECT_HEIST',
      currentSetupIndex: 0,
      alarmLevel: 0,
      riskAccumulated: 0,
      setupSuccessRate: 0,
      payoutResult: null,
    })
  },

  buyHeist: () => {
    const { player, selectedHeist } = get()
    if (!selectedHeist || !canAffordHeist(player, selectedHeist)) return false
    set({
      player: {
        ...player,
        money: player.money - selectedHeist.buyInCost,
      },
      gameState: 'SETUP_PHASE',
      currentSetupIndex: 0,
    })
    return true
  },

  completeSetup: (index, success) => {
    const { selectedHeist, riskAccumulated } = get()
    if (!selectedHeist) return

    const setups = [...selectedHeist.setups]
    const task = setups[index]
    if (!task) return

    task.completed = true
    task.result = success ? 'success' : 'fail'

    const newRisk = success
      ? riskAccumulated
      : riskAccumulated + task.riskImpact

    const successfulSetups = setups.filter((s) => s.result === 'success').length
    const successImpacts = setups
      .filter((s) => s.result === 'success')
      .map((s) => s.successImpact)
    const setupSuccessRate = setupsToSuccessRate(
      setups.length,
      successfulSetups,
      successImpacts
    )

    const nextIndex =
      index + 1 < setups.length ? index + 1 : index

    set({
      selectedHeist: { ...selectedHeist, setups },
      currentSetupIndex: nextIndex,
      riskAccumulated: newRisk,
      setupSuccessRate,
      gameState:
        nextIndex === index && index + 1 >= setups.length
          ? 'ROLE_ASSIGNMENT'
          : 'SETUP_PHASE',
    })
  },

  startFinalHeist: () => {
    set({ gameState: 'FINAL_HEIST' })
  },

  runFinalHeist: (alarmLevel, stealthBonus) => {
    const { selectedHeist, player, setupSuccessRate, riskAccumulated } = get()
    if (!selectedHeist) return

    const crewSkillModifier = crewSkillToModifier(
      player.crewSkill.hacker,
      player.crewSkill.driver,
      player.crewSkill.gunman
    )

    const result = calculateSuccess({
      setupSuccessRate,
      crewSkillModifier,
      alarmLevel,
      riskAccumulated,
    })

    const crewCutPercent = 25 // TODO: derive from role assignment
    const timeBonus = result.success ? 0.1 : 0
    const damagePenalty = alarmLevel > 50 ? 0.1 : 0

    const payout = calculatePayout({
      heist: selectedHeist,
      success: result.success,
      stealthBonus,
      timeBonus,
      damagePenalty,
      crewCutPercent,
    })

    set({
      gameState: 'RESULT',
      payoutResult: payout,
      alarmLevel,
    })
  },

  applyPayout: () => {
    const { player, payoutResult, selectedHeist } = get()
    if (!payoutResult || !selectedHeist) return

    const newMoney = player.money + payoutResult.playerTake
    const xpGain = payoutResult.success ? 500 : 100
    const newXp = player.xp + xpGain
    const levelsGained = Math.floor(newXp / XP_PER_LEVEL) - Math.floor(player.xp / XP_PER_LEVEL)
    const newLevel = player.level + levelsGained
    const newCompleted = payoutResult.success
      ? [...player.completedHeists, selectedHeist.id]
      : player.completedHeists

    set({
      player: {
        ...player,
        money: newMoney,
        xp: newXp,
        level: Math.max(1, newLevel),
        completedHeists: newCompleted,
      },
      gameState: 'IDLE',
    })
  },

  resetHeist: () => {
    set({
      selectedHeist: null,
      currentSetupIndex: 0,
      alarmLevel: 0,
      riskAccumulated: 0,
      setupSuccessRate: 0,
      payoutResult: null,
      gameState: 'IDLE',
    })
  },

  resetGame: () => {
    set({
      player: INITIAL_PLAYER,
      selectedHeist: null,
      currentSetupIndex: 0,
      alarmLevel: 0,
      riskAccumulated: 0,
      setupSuccessRate: 0,
      payoutResult: null,
      gameState: 'IDLE',
    })
  },
}))
