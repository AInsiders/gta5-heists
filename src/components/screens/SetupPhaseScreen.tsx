import { Button, Card, Panel } from '@/components/ui'
import { useGameStore } from '@/store'

export function SetupPhaseScreen() {
  const {
    selectedHeist,
    currentSetup,
    currentSetupIndex,
    setupSuccessRate,
    riskAccumulated,
    buyHeist,
    completeSetup,
    allSetupsComplete,
    setGameState,
  } = useGameStore()

  if (!selectedHeist) return null

  const needsBuyIn = selectedHeist.buyInCost > 0

  if (needsBuyIn && selectedHeist.setups.every((s) => !s.completed)) {
    return (
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-lg space-y-6">
          <Button variant="secondary" onClick={() => setGameState('IDLE')}>
            ← Cancel
          </Button>
          <Card>
            <h2 className="text-xl font-bold text-white">{selectedHeist.name}</h2>
            <p className="text-gray-400 mt-2">
              Buy-in cost: ${selectedHeist.buyInCost.toLocaleString()}
            </p>
            <div className="mt-6 flex gap-4">
              <Button variant="primary" onClick={buyHeist}>
                Pay & Start Setup
              </Button>
              <Button
                variant="secondary"
                onClick={() => setGameState('SELECT_HEIST')}
              >
                Back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (allSetupsComplete()) {
    return (
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-lg space-y-6">
          <Card glow="success">
            <h2 className="text-xl font-bold text-heist-success">
              All Setups Complete
            </h2>
            <p className="text-gray-400 mt-2">
              Success rate: {Math.round(setupSuccessRate)}% • Risk:{' '}
              {Math.round(riskAccumulated * 100)}%
            </p>
            <Button
              variant="success"
              fullWidth
              className="mt-6"
              onClick={() => setGameState('ROLE_ASSIGNMENT')}
            >
              Assign Roles →
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const setup = currentSetup()
  if (!setup) return null

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="secondary" onClick={() => setGameState('IDLE')}>
            ← Abort
          </Button>
          <h1 className="text-xl font-bold text-white">{selectedHeist.name}</h1>
          <div className="text-sm text-gray-400">
            {setupSuccessRate.toFixed(0)}% success • {Math.round(riskAccumulated * 100)}% risk
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Setup Tasks">
            <ul className="space-y-2">
              {selectedHeist.setups.map((s, i) => (
                <li
                  key={s.id}
                  className={`flex items-center justify-between rounded px-3 py-2 ${
                    i === currentSetupIndex ? 'bg-heist-border/50' : ''
                  }`}
                >
                  <span className={s.completed ? 'text-gray-500' : ''}>
                    {s.completed ? '✓' : '○'} {s.name}
                  </span>
                  {s.result && (
                    <span
                      className={
                        s.result === 'success' ? 'text-heist-success' : 'text-heist-alarm'
                      }
                    >
                      {s.result === 'success' ? 'PASS' : 'FAIL'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={setup.name}>
            <p className="text-gray-400 text-sm mb-4">
              Type: {setup.type} • Risk impact: {setup.riskImpact * 100}%
            </p>
            <p className="text-heist-skill text-sm">
              Success impact: +{setup.successImpact * 100}% • Reward bonus: $
              {setup.rewardBonus.toLocaleString()}
            </p>
            <div className="mt-8 flex gap-4">
              <Button
                variant="success"
                onClick={() => completeSetup(currentSetupIndex, true)}
              >
                Success
              </Button>
              <Button
                variant="danger"
                onClick={() => completeSetup(currentSetupIndex, false)}
              >
                Fail
              </Button>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              (Placeholder: full mini-game UI will replace these buttons)
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
