import { Button, Card } from '@/components/ui'
import { useGameStore } from '@/store'
import type { Heist } from '@/game/types'

function HeistCard({ heist }: { heist: Heist }) {
  const { player, selectHeist } = useGameStore()
  const unlocked = player.level >= heist.unlockLevel
  const canAfford = player.money >= heist.buyInCost

  const handleClick = () => {
    if (!unlocked) return
    selectHeist(heist)
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-[1.02] ${
        !unlocked ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-white">{heist.name}</h3>
          <p className="text-gray-400 text-sm">
            Lvl {heist.unlockLevel} • Difficulty {heist.difficulty}/5
          </p>
          <p className="text-heist-success mt-1">
            Payout: ${heist.basePayout.toLocaleString()}
          </p>
          <p className="text-heist-risk text-sm">
            Buy-in: ${heist.buyInCost.toLocaleString()}
          </p>
        </div>
        {!unlocked ? (
          <span className="text-heist-alarm text-2xl">🔒</span>
        ) : null}
      </div>
      {unlocked && (
        <Button
          variant="secondary"
          fullWidth
          className="mt-4"
          onClick={handleClick}
          disabled={!canAfford}
        >
          {canAfford ? 'Select' : 'Not enough money'}
        </Button>
      )}
    </Card>
  )
}

export function HeistSelectionScreen() {
  const { availableHeists, setGameState } = useGameStore()

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="secondary" onClick={() => setGameState('IDLE')}>
          ← Back
        </Button>
        <h1 className="text-2xl font-bold text-white">Select Heist</h1>
        <div className="w-24" />
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {availableHeists().map((heist) => (
          <HeistCard key={heist.id} heist={heist} />
        ))}
      </div>
    </div>
  )
}
