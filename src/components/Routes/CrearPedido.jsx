import PedidoForm from "../CrearPedido/PedidoForm"
import AdminConsole from "./AdminConsole"

function crearPedido () {
    return (
        <div className="crearPedidoCont">
            <AdminConsole />
            <PedidoForm />
        </div>
    )
}

export default crearPedido