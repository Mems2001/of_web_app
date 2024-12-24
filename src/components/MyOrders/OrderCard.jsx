import { useEffect} from "react"
import { useNavigate } from "react-router-dom";

function OrderCard ({order}) {

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
        <article className="orderCard">
            <div className="orderNCard">
                <label className='orderLabel' htmlFor="order_count">N°: </label>
                <a className="orderDataText" id="order_count">{order.orderCount}</a>
            </div>
            <div className="orderCardAuxCont">
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="author">Autor: </label>
                    <a className="orderDataText" id="author">{order.User.user_name}</a>
                </div>
                {order.temuId ? 
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="temu_id">Temu ID:</label>
                    <a className="orderDataText" id="temu_id">{order.temuId}</a>
                </div>
                :
                    <></>
                }
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="delivery_company">Delivery Company:</label>
                    <a className="orderDataText" id="delivery_company">{order.deliveryCompany}</a>
                </div>
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="delivery_id">Delivery Id:</label>
                    <a className="orderDataText" id="delivery_id">{order.deliveryId}</a>
                </div>
            </div>
            <div className="orderCardAuxCont2">
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="products_count">Products count:</label>
                    <a className="orderDataText" id="products_count">{order.productsCount}</a>
                </div>
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="free_products_count">Free products count: </label>
                    <a className="orderDataText" id="free_products_count">{order.freeProductsCount}</a>
                </div>
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="discount_products">Discounted products count: </label>
                    <a className="orderDataText" id="discount_products">{order.discountProductsCount}</a>
                </div>
            </div>
            <div className="orderCardAuxCont3">
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="order_date">Order date:</label>
                    <a className="orderDataText" id="order_date">{order.orderDate}</a>
                </div>
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="expected_date_min">Min expected date: </label>
                    <a className="orderDataText" id="expected_date_min">{order.expectedDateMin}</a>
                </div>
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="expected_date_max">Max expected date:</label>
                    <a className="orderDataText" id='expeted_date_max'>{order.expectedDateMax}</a>
                </div>
                <div className="orderInfo">
                    <label className="orderLabel" htmlFor="price">Price: </label>
                    <a className="orderDataText" id="price">{order.price}</a>
                </div>
            </div>
            <div className="orderBtnsCont">
                <button className="orderBtn" onClick={navToOrderDet}>
                    Detalles
                </button>
            </div>
        </article>
    )
}

export default OrderCard