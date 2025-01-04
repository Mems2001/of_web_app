import { NavLink, useNavigate } from "react-router-dom"

function AdminConsole () {
    const navigate = useNavigate();

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