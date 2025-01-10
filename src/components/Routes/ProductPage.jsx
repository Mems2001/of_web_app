import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import variables from "../../../utils/variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProductPage () {
    const {product_id} = useParams();
    const [loading , setLoading] = useState(true);
    const [product , setProduct] = useState();
    const [starV1 , setStarV1] = useState(0);
    const [starV2 , setStarV2] = useState(0);
    const [starV3 , setStarV3] = useState(0);
    const [starV4 , setStarV4] = useState(0);
    const [starV5 , setStarV5] = useState(0);
    const [selectedImage , setSelectedImage] = useState()

    const setStars = (rating) => {
        let values = rating
        if (values > 1) {
            setStarV1(100);
        } else {
            setStarV1(values * 100)
        }
        values -= 1

        if (values > 1) {
            setStarV2(100);
        } else {
            setStarV2(values * 100)
        }
        values -= 1

        if (values > 1) {
            setStarV3(100);
        }  else {
            setStarV3(values * 100)
        }
        values -= 1

        if (values > 1) {
            setStarV4(100);
        } else {
            setStarV4(values * 100);
        }
        values -= 1

        if (values > 1) {
            setStarV5(100);
        } else {
            setStarV5(values * 100);
        }
        
        return setLoading(false)
    }

    const navBack = () => {

    }
    
    useEffect(
        () => {
            if (product) {
                setSelectedImage(product.otherImages[0])
                setStars(product.rating)
            } else {
                let URL = variables.url_prefix + '/api/v1/products/' + product_id;
                // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                //     URL = 'https://' + ip + '/api/v1/products/' + product_id;
                // } else {
                //     URL = 'https://localhost:443/api/v1/products/' + product_id;
                // }
                
                axios.get(URL)
                .then(res => {
                    // console.log(res)
                    setProduct(res.data.data);
                })
                .catch(err => {
                    throw err
                })
            }
           
        } , [product]
    )

    if (loading) {
        return (
            <div className="skeletonHeight flex px-4 w-full flex-col gap-4">
                <div className="skeleton h-3/4 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    } else if(!loading) {
        return (
            <div className="productPageCont bg-white overscroll-auto overflow-auto">
                <section className="productHero1 flex flex-col w-full relative">
                    <div className="productHero2 relative">
                        <div className="w-full relative h-5/6">
                            <button onClick={navBack} className="btn btn-circle btn-md absolute z-10 top-3 left-10">
                                <FontAwesomeIcon icon={faArrowLeft} size="2xl"/>
                            </button>
                            <img src={selectedImage} className="w-full h-full object-contain absolute"/>
                        </div>
                        <div className="h-1/4 flex absolute bottom-0 right-0">
                            <div className="carousel carousel-center rounded-box h-full w-44">
                               
                                {product.otherImages.map(
                                    (image) => 
                                        <div onClick={() => setSelectedImage(image)} key={image} className="carousel-item carouselImageWidth bg-black h-full justify-center items-center">
                                            <img className={selectedImage !== image? 'w-full h-full' : 'w-10/12 h-5/6'}
                                            src={image}
                                            />
                                        </div>
                                )}
                               
                            </div>
                        </div>
                        <div className="w-1/2 ml-4 h-1/6 flex items-center justify-center">
                            <div className="carousel carousel-center rounded-box gap-4">
                                <div className="carousel-item overflow-hidden h-20 w-20">
                                    <img className="object-cover rounded-full h-full w-full" src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item overflow-hidden w-20 h-20">
                                    <img className="object-cover rounded-full h-full w-full"
                                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item overflow-hidden w-20 h-20">
                                    <img className="object-cover rounded-full h-full w-full"
                                    src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item overflow-hidden w-20 h-20">
                                    <img className="object-cover rounded-full h-full w-full"
                                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                                    alt="Drink" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productHero3 flex flex-col w-full px-4 gap-3 py-6">
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