
import { useEffect, useState } from 'react'
import './App.css'
import Taskbar from './components/taskbar'

// pages
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import BottomBar from './components/bottombar'
import "./pages/BusinessPage/BusinessStore"
import BusinessPage from './pages/BusinessPage/Business'
import { BusinessPayload } from './pages/BusinessPage/BusinessStore'
import usePageSwitch from './hooks/usePageSwitch'

const SelectionEnum = {
  1: "Home",
  2: "Explore",
  3: "Favorites",
  4: "Profile",
  5: "Business"
}

export type ChangePage_MiscData = {data? : BusinessPayload, scrollTo? : string}
export type ChangePage = ((newSection : number, miscData? : ChangePage_MiscData) => void)

type DeviceTypes = "win32" | "darwin" | "linux"

function App() {
  const {currentPage, setCurrentPage, currentData, setCurrentData} = usePageSwitch()
  const [curPlatform , setPlatform] = useState<DeviceTypes>("win32")

  useEffect(() => {
    window.electronAPI?.getDeviceType().then((platform) => {
      setPlatform(platform as DeviceTypes)
    })
  }, [])

  useEffect(() => {

  },[currentPage])

  function SwitchPage(newSection: 1 | 2 | 3 | 4 | 5 , data? : ChangePage_MiscData) {
    setCurrentPage(newSection)
    if(data) {
      setCurrentData(data.data as BusinessPayload)
    }
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
            SelectionEnum[currentPage] === "Home" && (
              <Home ChangePage={SwitchPage as ChangePage} />
            )
          }
          {
            SelectionEnum[currentPage] === "Explore" && (
              <Explore />
            )
          }
          {
            SelectionEnum[currentPage] === "Profile" && (
              <Profile SwitchPage={SwitchPage as ChangePage} />
            )
          }
          {
            SelectionEnum[currentPage] === "Favorites" && (
              <Profile SwitchPage={SwitchPage as ChangePage}/>
            )
          }
          {
            SelectionEnum[currentPage] === "Business" && (
              <BusinessPage businessData={currentData} />
            )
          }
        </div>

      </div>
    </>
  )
}

export default App
