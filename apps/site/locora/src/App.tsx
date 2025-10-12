import './App.css'


// comps
import TopBar from './components/topbar';
import Seacher from './components/seacher';

// assets
import clouds from "./assets/Clouds3.png"
import TypeWriter from './effects/Typewriter';

// pages
import Landing from './pages/landing';
import Waitlist from './pages/waitlist';

import { Routes , Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Landing />
        } />
        <Route path="/waitlist" element={
          <Waitlist />
        } />
      </Routes>
    </>
  )
}

export default App;
