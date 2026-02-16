import { Button, Card } from '@/components/ui'
import { useGameStore } from '@/store'

export function HomeScreen() {
  const { player, setGameState } = useGameStore()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-white tracking-wider">
        GTA HEISTS
      </h1>
      <p className="text-heist-premium text-sm uppercase tracking-[0.3em]">
        WebUI Mini-Game
      </p>

      <Card className="text-center max-w-md">
        <p className="text-heist-skill mb-1">Level {player.level}</p>
        <p className="text-heist-success text-2xl font-bold">
          ${player.money.toLocaleString()}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Heists completed: {player.completedHeists.length}
        </p>
      </Card>

      <Button
        variant="primary"
        onClick={() => setGameState('SELECT_HEIST')}
        className="text-lg px-12 py-4"
      >
        Start Heist
      </Button>

      <div className="absolute bottom-8 text-gray-600 text-sm">
        Risk vs Reward • Decisions Matter
      </div>
    </div>
  )
}
