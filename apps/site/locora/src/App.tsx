import './App.css'
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
