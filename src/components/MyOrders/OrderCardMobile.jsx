import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderCardMobile ({order}) {
    const navigate = useNavigate();

    const navToOrderDet = () => {
        const dir = '/admin/my_orders/' + order.id
        navigate(dir)
    }

    useEffect(
        () => {

        } , [order]
    )

    return (
        <article className="flex flex-col w-full card card-bordered shadow-md p-0">
            <div className="flex flex-row card card-bordered justify-between bg-gray-100 py-2 px-4">
                <span>N° {order?.orderCount}</span>
                <span>ID: {order?.temuId}</span>
            </div>
            <div className="py-2 px-4">
                <div className="flex flex-row justify-between items-center">
                    <label className="block text-sm/6 font-medium text-gray-900">Delivery Company:</label>
                    <span>{order?.deliveryCompany}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <label className="block text-sm/6 font-medium text-gray-900">Delivery Id:</label>
                    <span>{order?.deliveryId}</span>
                </div>
                <hr className="pt-2 mt-2"></hr>
                <div className="flex flex-row justify-evenly">
                    <div className="flex flex-col justify-between items-center">
                        <label className="block text-sm/6 font-medium text-gray-900">Products:</label>
                        <span>{order?.productsCount}</span>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <label className="block text-sm/6 font-medium text-gray-900">Free products:</label>
                        <span>{order?.freeProductsCount}</span>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <label className="block text-sm/6 font-medium text-gray-900">Discount products:</label>
                        <span>{order?.discountProductsCount}</span>
                    </div>
                </div>
                <hr className="pt-2 mt-2"></hr>
                <div className="flex gap-x-4 items-center">
                    <label className="block text-sm/6 font-medium text-gray-900">Price:</label>
                    <span>{order?.price}</span>
                </div>
                {/* <hr className="pt-2 mt-2"></hr> */}
                <div className="flex flex-row justify-between pt-2">
                    <div className="flex flex-row gap-x-4">
                        <label htmlFor="received" className="block text-sm/6 font-medium text-gray-900">Received:</label>
                        <input className="checkbox checkbox-sm" type="checkbox" id="received" name="received" disabled={true} checked={order?.received}/>
                    </div>
                    <button onClick={navToOrderDet}>
                        <FontAwesomeIcon icon={faUpRightFromSquare} size="lg"/>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default OrderCardMobile