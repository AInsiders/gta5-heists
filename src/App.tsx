import { useGameStore } from '@/store'
import {
  HomeScreen,
  HeistSelectionScreen,
  SetupPhaseScreen,
  RoleAssignmentScreen,
  FinalHeistScreen,
  PayoutScreen,
} from '@/components/screens'

function App() {
  const gameState = useGameStore((s) => s.gameState)

  switch (gameState) {
    case 'IDLE':
      return <HomeScreen />
    case 'SELECT_HEIST':
      return <HeistSelectionScreen />
    case 'SETUP_PHASE':
      return <SetupPhaseScreen />
    case 'ROLE_ASSIGNMENT':
      return <RoleAssignmentScreen />
    case 'FINAL_HEIST':
      return <FinalHeistScreen />
    case 'RESULT':
    case 'PAYOUT':
      return <PayoutScreen />
    case 'UNLOCK_NEXT':
      return <HomeScreen />
    default:
      return <HomeScreen />
  }
}

export default App
