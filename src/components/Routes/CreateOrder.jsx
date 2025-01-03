import OrderForm from "../CreateOrder/OrderForm"
import AdminConsole from "./AdminConsole"

function createOrder () {
    return (
        <div className="createOrderCont">
            <AdminConsole />
            <OrderForm />
        </div>
    )
}

export default createOrder