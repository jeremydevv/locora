
import { useState } from 'react'
import './App.css'
import PageSwitch from './components/pageswitch'
import Taskbar from './components/taskbar'

// pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import BottomBar from './components/bottombar'

const SelectionEnum : Record<number, string> = {
    1 : "Home",
    2 : "Explore",
    3 : "Profile",
}

function App() {
  const [curSelection, setSelection] = useState<number>(1)

  function SwitchPage(newSection : number) {
    setSelection(newSection)
  }

  return (
    <>
      <div
        className='bg-bay-of-many-200 w-screen h-screen overflow-hidden relative'
      >
        
        <div
          className='justify-center items-center w-full flex z-30 top-0'
        >
          <Taskbar />
          <BottomBar
            homeActivated={() => SwitchPage(1)} 
            exploreActivate={() => SwitchPage(2)} 
            bookmarkActivate={() => SwitchPage(3)} 
          /> 
        </div>

        {
          SelectionEnum[curSelection] === "Home" && (
            <Home />
          )
        }
        {
          SelectionEnum[curSelection] === "Explore" && (
            <Explore />
          )
        }
        {
          SelectionEnum[curSelection] === "Profile" && (
            <Profile />
          )
        }
      </div>
    </>
  )
}

export default App
