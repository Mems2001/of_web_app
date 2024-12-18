import axios from "axios";
import { useEffect, useState } from "react"
import PedidoCard from "../MisPedidos/PedidoCard";

function MisPedidos () {
    const [pedidos , setPedidos] = useState();

    const getPedidos = () => {
        const URL = 'http://localhost:8000/api/v1/orders/my_orders'

        axios.get(URL)
            .then(res => {
                // console.log(res.data.data);
                setPedidos(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(
        () => {
            getPedidos()
        } , []
    )

    return (
        <div className="ordersCont">
            {pedidos?.map(
                order => <PedidoCard order={order} key={order.id}/>
            )}
        </div>
    )
}

export default MisPedidos