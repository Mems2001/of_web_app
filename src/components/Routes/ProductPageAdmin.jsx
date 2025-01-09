import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AdminConsole from "./AdminConsole"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import variables from "../../../utils/variables";
import axios from "axios";

function ProductPageAdmin () {
    const {product_id} = useParams();
    const {order_id} = useParams();
    const [product , setProduct] = useState();
    const [edition , setEdition] = useState(false);
    const navigate = useNavigate();

    const navBack = () => {
        navigate(`/admin/my_orders/${order_id}`)
    }

    useEffect(
        () => {
            let URL = variables.url_prefix + '/api/v1/products/' + product_id;

            axios.get(URL)
                .then(res => {
                    setProduct(res.data.data)
                })
                .catch(err => {
                    throw err
                })
        } , [edition]
    )

    return (
        <div className="productPageAdminCont">
            <AdminConsole />
            <div className="productPageAdminAuxCont">
                <nav className="flex w-full items-center justify-start">
                    <button onClick={navBack} className="btn btn-circle btn-sm">
                        <FontAwesomeIcon icon={faArrowLeft} size="xl"/>
                    </button>
                    <h1 className="ml-12 text-4xl">{product?.name}</h1>
                </nav>
            </div>
        </div>
    )
}

export default ProductPageAdmin