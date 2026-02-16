import { Button, Card } from '@/components/ui'
import { useGameStore } from '@/store'

export function RoleAssignmentScreen() {
  const {
    selectedHeist,
    player,
    startFinalHeist,
    setGameState,
  } = useGameStore()

  if (!selectedHeist) return null

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Button variant="secondary" onClick={() => setGameState('SETUP_PHASE')}>
          ← Back
        </Button>

        <Card>
          <h2 className="text-xl font-bold text-white">Role Assignment</h2>
          <p className="text-gray-400 mt-2">
            {selectedHeist.name} — Assign crew (placeholder)
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-heist-border p-4">
              <p className="text-heist-skill font-semibold">Hacker</p>
              <p className="text-gray-400 text-sm">Lvl {player.crewSkill.hacker}</p>
            </div>
            <div className="rounded-lg border border-heist-border p-4">
              <p className="text-heist-skill font-semibold">Driver</p>
              <p className="text-gray-400 text-sm">Lvl {player.crewSkill.driver}</p>
            </div>
            <div className="rounded-lg border border-heist-border p-4">
              <p className="text-heist-skill font-semibold">Gunman</p>
              <p className="text-gray-400 text-sm">Lvl {player.crewSkill.gunman}</p>
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            className="mt-6"
            onClick={startFinalHeist}
          >
            Execute Heist →
          </Button>
        </Card>
      </div>
    </div>
  )
}
