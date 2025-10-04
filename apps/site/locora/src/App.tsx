import './App.css'
import BaseButton from './components/button'
import TopBar from './components/topbar';

function App() {
  return (
    <>

      <TopBar />

      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <BaseButton text="Click Me!" shape="square"/>
      </div>
    </>
  )
}

export default App;
