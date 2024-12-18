import { Routes , Route } from 'react-router-dom'

import './App.css'
import './styles/NavComp.css'
import './styles/Login.css'
import './styles/UserInfo.css'
import './styles/Admin.css'
import './styles/CrearPedido.css'
import './styles/MisPedidos.css'

import NavComp from './components/Shared/NavComp'
import Login from './components/Routes/Login'
import Home from './components/Routes/Home'
import SignUp from './components/Routes/SignUp'
import UserInfo from './components/Routes/userInfo'

import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from './store/slices/profile.slice'
import axios from 'axios'
import ProtectedRoutes from './components/Routes/ProtectedRoutes'
import ProtectedRoutesAdmin from './components/Routes/ProtectedRoutesAdmin'
import AdminConsole from './components/Routes/AdminConsole'
import CrearPedido from './components/Routes/CrearPedido'
import MisPedidos from './components/Routes/MisPedidos'
import PedidoPage from './components/Routes/PedidoPage'

function App() {

  const profile = useSelector(state => state.profileSlice)

  return (
    <div className='App'> 
      <NavComp profile={profile}/>
      <Routes>
        <Route path='/' element={<Home profile={profile}/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/user' element={<UserInfo profile={profile}/>}/>
        </Route>
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path='/admin' element={<AdminConsole />}/>
          <Route path='/admin/pedidos' element={<CrearPedido />}/>
          <Route path='/admin/mis_pedidos' element={<MisPedidos />}/>
          <Route path='/admin/mis_pedidos/:order_id' element={<PedidoPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
