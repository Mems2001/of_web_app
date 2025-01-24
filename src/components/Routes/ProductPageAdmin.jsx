import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AdminConsole from "./AdminConsole"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import variables from "../../../utils/variables";
import axios from "axios";
import DeleteSomethig from "../Modals/DeleteSomething";

function ProductPageAdmin () {
    const {product_id} = useParams();
    const {order_id} = useParams();
    const [product , setProduct] = useState();
    const [order , setOrder] = useState();
    const [edition , setEdition] = useState(false);
    const navigate = useNavigate();

    const navBack = () => {
        if (order_id) {
            navigate(`/admin/my_orders/${order_id}`)
        } else {
            navigate('/')
        }
    }

    function handleEdition () {
        setEdition(false)
    }

    async function deleteProd () {
        let URL = variables.url_prefix + '/api/v1/admin/products/' + product_id;

        axios.delete(URL)
            .then(res => {
                return true
            })
            .catch(err => {
                console.log(err);
                throw err
            })
    }

    useEffect(
        () => {
            let URL = variables.url_prefix + '/api/v1/products/' + product_id;
            let URL2 = variables.url_prefix + '/api/v1/orders/' + order_id;

            axios.get(URL)
                .then(res => {
                    setProduct(res.data.data)
                })
                .catch(err => {
                    throw err
                })

            axios.get(URL2)
                .then(res => {
                    setOrder(res.data.data)
                })
                .catch(err => {
                    throw err
                })

        } , [edition]
    )

    return (
        <div className="productPageAdminCont">
            <AdminConsole />
            <section className="productPageAdminAuxCont">
                <nav className="flex w-full items-center justify-between">
                    <button onClick={navBack} className="btn btn-circle btn-sm">
                        <FontAwesomeIcon icon={faArrowLeft} size="xl"/>
                    </button>
                    <h1 className="text-3xl">{product?.name}</h1>
                    <span className="text-lg">{`Order N° ${order?.orderCount}`}</span>
                </nav>
                <div className="flex justify-center gap-6">
                    <button className="btn btn-sm" onClick={() => {edition? handleEdition() : setEdition(true) }}>
                        {edition? 'Guardar' : 'Editar'}
                    </button>
                    {edition?
                    <button className='btn btn-sm' onClick={() => setEdition(false)}>
                        Cancelar
                    </button>
                        :
                    <DeleteSomethig key={product_id} deleteFunction={deleteProd} navBackFunction={navBack}/>
                    }
                </div>
            </section>
        </div>
    )
}

export default ProductPageAdmin