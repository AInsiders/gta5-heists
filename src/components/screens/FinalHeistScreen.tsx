import { Button, Card } from '@/components/ui'
import { useGameStore } from '@/store'

export function FinalHeistScreen() {
  const {
    selectedHeist,
    setupSuccessRate,
    runFinalHeist,
  } = useGameStore()

  if (!selectedHeist) return null

  const handleSuccess = () => {
    runFinalHeist(20, 0.15)
  }

  const handleFail = () => {
    runFinalHeist(80, 0)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-lg space-y-6">
        <Card>
          <h2 className="text-xl font-bold text-white">Final Heist</h2>
          <p className="text-gray-400 mt-2">{selectedHeist.name}</p>
          <p className="text-heist-skill mt-2">
            Setup success rate: {Math.round(setupSuccessRate)}%
          </p>
          <p className="text-gray-500 text-sm mt-4">
            (Placeholder: phased heist UI — Entry → Vault → Escape)
          </p>
          <div className="mt-8 flex gap-4">
            <Button variant="success" onClick={handleSuccess}>
              Success
            </Button>
            <Button variant="danger" onClick={handleFail}>
              Fail
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
