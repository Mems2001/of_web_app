import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";

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
                        
                            <div className="swap-on w-28">
                                <a key={product.id} href={product.href} className="group">
                                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                    <NavLink>Ver más</NavLink>
                                </a>
                            </div>
                            <div className="swap-off w-28">
                                <a key={product.id} href={product.href} className="group">
                                    <img
                                        alt={product.imageAlt}
                                        src={product.imageSrc}
                                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                                    />
                                </a>
                            </div>
                        </label>
                    ))}
                    </div>
                </div>
            </div>
        
    )
}

export default MainCarrousel