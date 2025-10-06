import './App.css'

// assets
import Window from "./assets/window.png";

// comps
import Seacher from './components/seacher';
import BaseButton from './components/button'
import TopBar from './components/topbar';

function App() {
  return (
    <>

      <TopBar />

      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <BaseButton text="Click Me!" type="default" shape="square" />
        <BaseButton text="Download for Windows" type="black" shape="square" preChildren={
          <img src={Window} alt="Windows Logo for Download" className="h-5 gap-1 mr-2" />
        } />

        <div>
          <Seacher />
        </div>

      </div>
    </>
  )
}

export default App;
