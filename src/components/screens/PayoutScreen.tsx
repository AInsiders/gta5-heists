import { Button, Card } from '@/components/ui'
import { useGameStore } from '@/store'

export function PayoutScreen() {
  const { payoutResult, player, applyPayout } = useGameStore()

  if (!payoutResult) return null

  const { success, basePayout, stealthBonus, timeBonus, damagePenalty, crewCuts, playerTake } =
    payoutResult

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <Card glow={success ? 'success' : 'alarm'}>
        <h2 className="text-2xl font-bold text-white">
          {success ? 'HEIST SUCCESSFUL' : 'HEIST FAILED'}
        </h2>
        <div className="mt-6 space-y-2 text-gray-300">
          <p>Base payout: ${basePayout.toLocaleString()}</p>
          {stealthBonus > 0 && (
            <p className="text-heist-success">Stealth bonus: +${stealthBonus.toLocaleString()}</p>
          )}
          {timeBonus > 0 && (
            <p className="text-heist-success">Time bonus: +${timeBonus.toLocaleString()}</p>
          )}
          {damagePenalty > 0 && (
            <p className="text-heist-alarm">Damage penalty: -${damagePenalty.toLocaleString()}</p>
          )}
          <p>Crew cuts: -${crewCuts.toLocaleString()}</p>
          <p className="text-heist-success text-xl font-bold pt-4 border-t border-heist-border">
            Your take: ${playerTake.toLocaleString()}
          </p>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          New balance: ${(player.money + playerTake).toLocaleString()}
        </p>
      </Card>

      <Button variant="primary" onClick={applyPayout}>
        Continue (Collect & Return Home)
      </Button>
    </div>
  )
}
