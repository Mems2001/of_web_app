import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import variables from '../../../utils/variables.js'

function MainCarrousel () {
    const [products , setProducts] = useState();
    // const ip = variables.ip

    useEffect(
        () => {
            let URL = variables.url_prefix + '/api/v1/products'
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/products';
            // } else {
            //     URL = 'https://localhost:443/api/v1/products';
            // }

            axios.get(URL)
                .then(res => {
                    console.log(res);
                    setProducts(res.data)
                })
                .catch(err => {
                    throw err
                })
        } , []
    )
    return (
       
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-4 gap-x-1 gap-y-1 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                        <ProductCard product={product} key={product.id}/>
                    ))}
                    </div>
                </div>
            </div>
        
    )
}

export default MainCarrousel