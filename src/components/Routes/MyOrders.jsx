import axios from "axios";
import { useEffect, useState } from "react"
import OrdersCard from "../MyOrders/OrderCard";
import AdminConsole from "./AdminConsole";

function MyOrders () {
    const [orders , setOrders] = useState();

    const getOrders = () => {
        const URL = 'http://localhost:8000/api/v1/orders/my_orders'

        axios.get(URL)
            .then(res => {
                // console.log(res.data.data);
                setOrders(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(
        () => {
            getOrders()
        } , []
    )

    return (

        <div className="myOrdersCont">
            <AdminConsole />
            <div className="ordersCont">
                {orders?.map(
                    order => <OrdersCard order={order} key={order.id}/>
                )}
            </div>
        </div>
    )
}

export default MyOrders