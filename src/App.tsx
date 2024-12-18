import './App.css'
import './styles/NavComp.css'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavComp from './components/Shared/NavComp'
import { Routes , Route } from 'react-router-dom'
import Home from './components/Routes/Home'
import Login from './components/Routes/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      
        <NavComp/ >
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
       
    </div>
  )
}

export default App
