import Home from './pages/Home'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className=' bg-slate-300 min-h-screen text-black flex flex-col'>
      <div className='container mx-auto flex flex-col flex-1'>
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
