import { useNavigate } from "react-router-dom"

function AdminConsole () {
    const navigate = useNavigate();

    const crearPedido = () => {
        navigate('/admin/pedidos')
    }

    const navMisPedidos = () => {
        navigate('/admin/mis_pedidos')
    }

    return (
        <div className="adminCont">
            Admin Console
            <div>
                <button onClick={navMisPedidos}>
                    Mis pedidos
                </button>
                <button onClick={crearPedido}>
                    Añadir Pedido
                </button>
                <button>
                    Registrar Producto
                </button>
            </div>
        </div>
    )
}

export default AdminConsole