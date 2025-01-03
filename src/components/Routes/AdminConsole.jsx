import { NavLink, useNavigate } from "react-router-dom"

function AdminConsole () {
    const navigate = useNavigate();

    const createOrder = () => {
        navigate('/admin/orders')
    }

    const navMyOrders = () => {
        navigate('/admin/my_orders')
    }

    const registrarProducto = () => {
        navigate('/admin/product_registration')
    }

    return (
        <div role="tablist" className="tabs tabs-boxed">
            
                <NavLink role="tab" className='tab' to={'/admin/my_orders'}>
                    Mis pedidos
                </NavLink>
                <NavLink role="tab" className='tab' to={'/admin/orders'}>
                    Añadir Pedido
                </NavLink>
                <NavLink role="tab" className='tab' to={'/admin/product_registration'}>
                    Registrar Producto
                </NavLink>
            
        </div>
    )
}

export default AdminConsole