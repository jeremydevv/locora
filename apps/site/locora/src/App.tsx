import './App.css'
// pages
import Landing from './pages/landing';
import Waitlist from './pages/waitlist';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

function App() {

  return (
    <>
      <HelmetProvider>
          <Routes>
            <Route path="/" element={
              <Landing />
            } />
            <Route path="/waitlist" element={
              <Waitlist />
            } />
          </Routes>
      </HelmetProvider>
    </>
  )
}

export default App;
