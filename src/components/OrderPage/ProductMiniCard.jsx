import { useNavigate, useParams } from "react-router-dom"
import variables from "../../../utils/variables";

function ProductMiniCard ({product}) {
    const navigate = useNavigate();
    const {order_id} = useParams();

    const navToProductDetAdmin = () => {
        navigate(`/admin/my_orders/${order_id}/products/${product.id}`)
    }

    return (
        <div onClick={navToProductDetAdmin} className="carousel-item w-16 h-24">
            <img src={variables.url_prefix + '/' + product.cardImage}/>
        </div>
    )
}

export default ProductMiniCard