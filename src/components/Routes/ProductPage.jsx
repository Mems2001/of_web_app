import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function ProductPage () {
    const {product_id} = useParams();
    const [product , setProduct] = useState();

    useEffect(
        () => {
            let URL = undefined
            if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                URL = 'https://192.168.1.6:443/api/v1/products/' + product_id;
            } else {
                URL = 'https://localhost:443/api/v1/products/' + product_id;
            }

            axios.get(URL)
                .then(res => {
                    console.log(res)
                    setProduct(res.data.data)
                })
                .catch(err => {
                    throw err
                })
        } , []
    )

    return (
        <div className="productPageCont bg-white overscroll-auto overflow-auto">
            <section className="productHero1 w-full">
                <img src="https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" className="w-full h-3/4 object-cover"/>
                
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
                    <p className="text-3xl tracking-tight text-gray-900">$ {product?.price}</p>
                    
                </div> 
            </section>
        </div>
    )
}

export default ProductPage