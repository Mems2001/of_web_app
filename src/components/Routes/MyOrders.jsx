import axios from "axios";
import { useEffect, useState } from "react";
import OrderCardMobile from '../MyOrders/OrderCardMobile';
import AdminConsole from "./AdminConsole";
import variables from "../../../utils/variables";

function MyOrders () {
    const [orders , setOrders] = useState();
    // const ip = variables.ip;

    const getOrders = () => {
        let URL = variables.url_prefix + '/api/v1/orders/my_orders';
        // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
        //     URL = 'https://' + ip + '/api/v1/orders/my_orders'
        // } else {
        //     URL = 'https://localhost:443/api/v1/orders/my_orders';
        // }

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
                    order => <OrderCardMobile order={order} key={order.id}/>
                )}
            </div>
        </div>
    )
}

export default MyOrders