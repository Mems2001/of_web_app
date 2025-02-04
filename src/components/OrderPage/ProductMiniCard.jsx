import { useNavigate, useParams } from "react-router-dom"
import variables from "../../../utils/variables";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductMiniCard ({product}) {
    const navigate = useNavigate();
    const {order_id} = useParams();
    const [cardImage , setCardImage] = useState();

    const navToProductDetAdmin = () => {
        navigate(`/admin/my_orders/${order_id}/products/${product.id}`)
    }

    useEffect (
        () => {
            const URL = variables.url_prefix + '/api/v1/product_images/' + product.id
            axios.get(URL)
                .then(res => {
                    // console.log(res);
                    for (let image of res.data) {
                        if (image.type === 'card') {
                            setCardImage(image.data);
                        }
                    }
                })
                .catch(err => {
                    throw err
                })
        } , [cardImage]
    )

    if (cardImage) {
        return (
            <div onClick={navToProductDetAdmin} className="carousel-item w-16 h-24">
                <img src={`data:image/jpeg;base64,${cardImage}`} alt={product.name}/>
            </div>
        )
    } else {
        return (
            <div className="carousel-item skeleton w-16 h-24">

            </div>
        )
    }
}

export default ProductMiniCard