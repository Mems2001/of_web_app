import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

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
       
            <div className="bg-white">
                {/* {products?.length > 0? 
                    products.map(
                        product => <ProductCard product={product}/>
                    ) : 
                    'No hay productos para mostrar'
                } */}
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                        <label className="swap swap-flip place-content-stretch w-28 place-self-center">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="w-28"/>
                        
                            <div className="swap-on w-28 place-content-center bg-gray-200">
                                <div key={product.id} className="group flex flex-col gap-2 content-center place-items-center">
                                    <h3 className="text-sm text-gray-700 text-center">{product.name}</h3>
                                    {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
                                    <NavLink to={`/products/:${product.id}`}>
                                        <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
                                    </NavLink>
                                </div>
                            </div>
                            <div className="swap-off w-28">
                                <div key={product.id} className="group">
                                    <img
                                        alt={product.imageAlt}
                                        src={'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg'}
                                        className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                                    />
                                </div>
                            </div>
                        </label>
                    ))}
                    </div>
                </div>
            </div>
        
    )
}

export default MainCarrousel