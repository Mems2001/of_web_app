import { Routes , Route } from 'react-router-dom'

import './App.css'
import NavComp from './components/Shared/NavComp'
import Login from './components/Routes/Login'
import Home from './components/Routes/Home'

function App() {

  return (
    <div className='App'> 
      <NavComp />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
