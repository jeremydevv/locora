
import { useState } from 'react'
import './App.css'
import PageSwitch from './components/pageswitch'
import Taskbar from './components/taskbar'

// pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'

const SelectionEnum : Record<number, string> = {
    1 : "Home",
    2 : "Explore",
    3 : "Profile",
}

function App() {
  const [curSelection, setSelection] = useState<number>(1)

  return (
    <>
      <div
        className='bg-bay-of-many-200 w-full h-full'
      >
        <Taskbar />
        // This is where the page the user is on will go
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
        <PageSwitch />
      </div>
    </>
  )
}

export default App
