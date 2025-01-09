import { useNavigate, useParams } from "react-router-dom"

function ProductMiniCard ({product}) {
    const navigate = useNavigate();
    const {order_id} = useParams();

    const navToProductDetAdmin = () => {
        navigate(`/admin/my_orders/${order_id}/products/${product.id}`)
    }

    return (
        <div onClick={navToProductDetAdmin} className="carousel-item w-16 h-24">
            <img src={product.cardImage}/>
        </div>
    )
}

export default ProductMiniCard