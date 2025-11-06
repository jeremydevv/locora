import './App.css'
// pages
import Landing from './pages/landing';
import Waitlist from './pages/waitlist';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AuthenticationPage from './pages/auth';

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
            <Route path="/auth" element={
              <AuthenticationPage />
            } />
          </Routes>
      </HelmetProvider>
    </>
  )
}

export default App;
