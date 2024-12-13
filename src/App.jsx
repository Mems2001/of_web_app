import { Routes , Route } from 'react-router-dom'

import './App.css'
import './styles/NavComp.css'
import './styles/Login.css'

import NavComp from './components/Shared/NavComp'
import Login from './components/Routes/Login'
import Home from './components/Routes/Home'
import SignUp from './components/Routes/SignUp'

function App() {

  return (
    <div className='App'> 
      <NavComp />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
