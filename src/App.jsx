import { Routes , Route } from 'react-router-dom'

import '@fortawesome/fontawesome-free/css/all.css';
import './App.css'
import './styles/NavComp.css'
import './styles/Login.css'
import './styles/UserInfo.css'
import './styles/Admin.css'
import './styles/CreateOrder.css'
import './styles/MyOrders.css'
import './styles/ProductRegistration.css'
import './styles/Home.css'
import './styles/ProductPage.css'

import NavComp from './components/Shared/NavComp'
import Login from './components/Routes/Login'
import Home from './components/Routes/Home'
import SignUp from './components/Routes/SignUp'
import UserInfo from './components/Routes/UserInfo'

import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/Routes/ProtectedRoutes'
import ProtectedRoutesAdmin from './components/Routes/ProtectedRoutesAdmin'
import AdminConsole from './components/Routes/AdminConsole'
import CreateOrder from './components/Routes/CreateOrder'
import MyOrders from './components/Routes/MyOrders'
import OrderPage from './components/Routes/OrderPage'
import ProductRegistration from './components/Routes/ProductRegistration'
import ProductPage from './components/Routes/ProductPage';

function App() {

  const profile = useSelector(state => state.profileSlice)

  return (
    <div className='App'> 
      <NavComp profile={profile}/>
      <Routes>
        <Route path='/' element={<Home profile={profile}/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<SignUp />} />
        <Route path='/products/:product_id' element={<ProductPage />}/>

        <Route element={<ProtectedRoutes />}>
          <Route path='/user' element={<UserInfo />}/>
        </Route>
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path='/admin' element={<AdminConsole />}/>
          <Route path='/admin/create_order' element={<CreateOrder />}/>
          <Route path='/admin/my_orders' element={<MyOrders />}/>
          <Route path='/admin/my_orders/:order_id' element={<OrderPage />}/>
          <Route path='/admin/product_registration' element={<ProductRegistration />}/> 
        </Route>
      </Routes>
    </div>
  )
}

export default App
