import Header from '@/components/header/header';
import Loadouts from '@/components/loadouts/loadouts';
import Roulette from '@/components/roulette/roulette';

export default function App() {
  return (
    <>
      <Header></Header>
      
      <Roulette></Roulette>
      <Loadouts></Loadouts>
    </>
  )
}
