import './App.css'
// pages
import Landing from './pages/landing';
import Waitlist from './pages/waitlist';
import NotFound from './pages/notfound';
import AuthenticationPage from './pages/auth';

import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DownloadPage from './pages/download';

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
            <Route path="/download" element={
              <DownloadPage />
            } />
            <Route path="*" element={
              <NotFound />
            } />
          </Routes>
      </HelmetProvider>
    </>
  )
}

export default App;
