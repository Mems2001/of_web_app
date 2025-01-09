import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import variables from "../../../utils/variables";

function ProductPage () {
    const {product_id} = useParams();
    const [loading , setLoading] = useState(true);
    const [product , setProduct] = useState();
    const [starV1 , setStarV1] = useState(0);
    const [starV2 , setStarV2] = useState(0);
    const [starV3 , setStarV3] = useState(0);
    const [starV4 , setStarV4] = useState(0);
    const [starV5 , setStarV5] = useState(0);
    
    useEffect(
        () => {
            console.log(loading)
            setLoading(true)
            let URL = variables.url_prefix + '/api/v1/products/' + product_id;
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/products/' + product_id;
            // } else {
            //     URL = 'https://localhost:443/api/v1/products/' + product_id;
            // }
            
            axios.get(URL)
            .then(res => {
                console.log(res)
                setProduct(res.data.data);
                setLoading(false)
            })
            .catch(err => {
                throw err
            })

        } , []
    )

    if (loading) {
        return (
            <div className="flex px-4 w-full h-3/4 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    } else if(!loading) {
        return (
            <div className="productPageCont bg-white overscroll-auto overflow-auto">
                <section className="productHero1 flex flex-col w-full gap-4">
                    <img src="https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" className="w-full h-3/4 object-cover"/>
                    
                    <div className="flex flex-col w-full px-4 gap-3">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
                                <p className="text-3xl tracking-tight text-gray-900">$ {product?.price}</p>
                            </div>
                            <div id="ratingCont" className="w-1/2 flex flex-row justify-end items-center">
                                
                                    <div id="rating" className="flex flex-row items-center justify-left rounded-xl glass bg-gray-200 h-7 w-40 pl-2">
                                        <progress id="star1" value={starV1} max={100} className="progress progress-warning h-5 w-5 mask mask-star-2"></progress>
                                        <progress id="star2" value={starV2} max={100} className="progress progress-warning h-5 w-5 mask mask-star-2"></progress>
                                        <progress id="star3" value={starV3} max={100} className="progress progress-warning h-5 w-5 mask mask-star-2"></progress>
                                        <progress id="star4" value={starV4} max={100} className="progress progress-warning h-5 w-5 mask mask-star-2"></progress>
                                        <progress id="star5" value={starV5} max={100} className="progress progress-warning h-5 w-5 mask mask-star-2"></progress>
                                        <div className="rounded-full bg-black absolute h-11 w-11 flex justify-center items-center end-0">
                                            <p className="text-white text-lg">{product?.rating}</p>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                        <div className="text-m text-gray-600">
                            {product?.description}
                        </div>
                    </div>
                </section>
    
                <section>
                    
                </section>
            </div>
        )
    }
}

export default ProductPage