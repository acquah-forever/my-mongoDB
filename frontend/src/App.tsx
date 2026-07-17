import Home from './pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import LogInModel from './pages/LogInModel'
import SignUpModel from './pages/SignUpModel'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className=' bg-slate-300 min-h-screen text-black flex flex-col'>
      <div className='container mx-auto flex flex-col flex-1'>
        <NavBar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LogInModel />} />
            <Route path='/signup' element={<SignUpModel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
