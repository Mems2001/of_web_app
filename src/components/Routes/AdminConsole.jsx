import { NavLink, useNavigate } from "react-router-dom"

function AdminConsole () {
    const navigate = useNavigate();
    const location = window.location.href.split('#')[1];
    console.log(location);

    return (
        <div role="tablist" className="tabs tabs-boxed">
            
                <NavLink role="tab" className={location?.includes('my_orders') ? 'tab bg-gray-300' : 'tab'} to={'/admin/my_orders'}>
                    Mis pedidos
                </NavLink>
                <NavLink role="tab" className={location?.includes('create_order') ? 'tab bg-gray-300' : 'tab'} to={'/admin/create_order'}>
                    Añadir Pedido
                </NavLink>
                <NavLink role="tab" className={location?.includes('product_registration') ? 'tab bg-gray-300' : 'tab'} to={'/admin/product_registration'}>
                    Registrar Producto
                </NavLink>
            
        </div>
    )
}

export default AdminConsole