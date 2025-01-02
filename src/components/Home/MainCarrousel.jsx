import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function MainCarrousel () {
    const [products , setProducts] = useState();

    useEffect(
        () => {
            let URL = undefined
            if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                URL = 'http://192.168.1.6:8000/api/v1/products'
            } else {
                URL = 'http://localhost:8000/api/v1/products';
            }

            axios.get(URL)
                .then(res => {
                    console.log(res);
                    setProducts(res.data.data)
                })
                .catch(err => {
                    throw err
                })
        } , []
    )
    return (
        <div className="mainCarrouselCont">
            {products?.length > 0? 
                products.map(
                    product => <ProductCard product={product}/>
                ) : 
                'No hay productos para mostrar'
            }
        </div>
    )
}

export default MainCarrousel