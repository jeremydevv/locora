
import { useEffect, useState } from 'react'
import './App.css'
import Taskbar from './components/taskbar'

// pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import BottomBar from './components/bottombar'
import Favorites from './pages/Favorites'

const SelectionEnum: Record<number, string> = {
  1: "Home",
  2: "Explore",
  3: "Favorites",
  4: "Profile",
}

type DeviceTypes = "win32" | "darwin" | "linux"

function App() {
  const [curSelection, setSelection] = useState<number>(1)
  const [curPlatform , setPlatform] = useState<DeviceTypes>("win32")

  window.electronAPI?.onPlatform((_,platform) => {
    setPlatform(platform as DeviceTypes)
  }) 

  useEffect(() => {
    window.electronAPI?.getDeviceType().then((platform) => {
      setPlatform(platform as DeviceTypes)
    })
  }, [])

  function SwitchPage(newSection: number) {
    setSelection(newSection)
  }

  return (
    <>
      <div
        className='w-screen h-screen'
      >

        <div
          className='flex bg-bay-of-many-200 w-full h-full'
        >
          <div
            className='absolute justify-center items-center w-full flex z-30 top-0'
          >
            <Taskbar platform={curPlatform || "win32"}/>
            <BottomBar
              homeActivated={() => SwitchPage(1)}
              exploreActivate={() => SwitchPage(2)}
              bookmarkActivate={() => SwitchPage(3)}
              profileActivate={() => SwitchPage(4)}
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
          {
            SelectionEnum[curSelection] === "Favorites" && (
              <Favorites />
            )
          }
          {
            SelectionEnum[curSelection] === "Business" && (
              <Favorites />
            )
          }
        </div>

      </div>
    </>
  )
}

export default App
