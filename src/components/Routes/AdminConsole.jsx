import { useNavigate } from "react-router-dom"

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
        <nav className="adminCont">
            
                <button onClick={navMyOrders}>
                    Mis pedidos
                </button>
                <button onClick={createOrder}>
                    Añadir Pedido
                </button>
                <button onClick={registrarProducto}>
                    Registrar Producto
                </button>
            
        </nav>
    )
}

export default AdminConsole