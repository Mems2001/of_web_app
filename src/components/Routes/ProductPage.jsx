import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import variables from "../../../utils/variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan, faHeart, faHeartCrack, faUserTie } from "@fortawesome/free-solid-svg-icons";

function ProductPage () {
    const [isAdmin , setIsAdmin] = useState(localStorage.getItem('onlyFancyAdmin'));
    const profile = useSelector(state => state.profileSlice );

    const {product_id} = useParams();
    // const [loading , setLoading] = useState(true);
    const [product , setProduct] = useState();
    const [starV1 , setStarV1] = useState(0);
    const [starV2 , setStarV2] = useState(0);
    const [starV3 , setStarV3] = useState(0);
    const [starV4 , setStarV4] = useState(0);
    const [starV5 , setStarV5] = useState(0);
    const [allColors , setAllColors] = useState();
    const [selectedImage , setSelectedImage] = useState();
    const [selectedImages , setSelectedImages] = useState();
    const [selectedColors , setSelectedColors] = useState();
    const [commonImages , setCommonImages] = useState();
    const [materials , setMaterialsP] = useState();
    const [mainCategory , setMainCategoryP] = useState();
    const [categories , setCategoriesP] = useState();
    const [like , setLike] = useState(false);
    const navigate = useNavigate();

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
    }

    const setImages = () => {
        let URL = variables.url_prefix + '/api/v1/product_images/' + product.id
                
        axios.get(URL)
            .then(res => {
                 // console.log(res);
                let aux = [];
                for (let image of res.data) {
                    if (image.type == 'common' || image.type == 'card') {
                        aux.push(image)
                    }
                };
                // console.log(aux);
                setCommonImages(aux);
                setSelectedImages(aux);
                setSelectedImage(aux[0])
            })
            .catch(err => {
                throw err
            })
    }

    function setMaterials () {
        let URL = variables.url_prefix + '/api/v1/product_details/materials'

        axios.get(URL)
            .then(res => {
                // console.log(res);
                let aux = []
                if (res.data) {
                    for (let material of res.data) {
                        // console.log(material);
                        if (product.materialsIds?.includes(material.id)) {
                            aux.push(material)
                        }
                    }
                };
                if (aux) {
                    setMaterialsP(aux)
                }
            })
            .catch(err => {
                throw err
            })
    }

    function setMainCategory () {
        let URL = variables.url_prefix + '/api/v1/main_categories/' + product.mainCategoryId

        axios.get(URL)
            .then(res => {
                setMainCategoryP(res.data)
            })
            .catch(err => {
                throw err
            })
    }

    function setSubCategories () {
        if (product.subcategoriesIds) {
            let subCategories = [];
            for (let id of product.subcategoriesIds) {
                let URL = variables.url_prefix + '/api/v1/main_categories/' + id;

                axios.get(URL)
                    .then(res => {
                        subCategories.push(res.data)
                    })
                    .catch(err => {
                        throw err
                    })
            }
            if (subCategories.length > 0) {
                setCategoriesP(subCategories)
            }
        }
    }
    
    function setColouredImage (name) {
        let aux = []
        if (name === 'all') {
            aux = product.allImages;
        } else {
            for (let image of product.allImages) {
               if (image.includes(name)) {
                aux.push(image)
               }
            }
        }
        if (aux.length > 0) {
            setSelectedImages(aux);
            setSelectedImage(aux[0])
        }
    }

    function getLikes () {
        let URL = variables.url_prefix + '/api/v1/favourites/' + product.id + '/' + profile?.user_id;

        axios.get(URL)
            .then(res => {
                console.log(res);
                if (res.data) {
                    setLike(true)
                }
            })
            .catch(err => {
                throw err
            })
    }
    
    //Click interactions
    
    function handleLike () {
        let URL = variables.url_prefix + '/api/v1/favourites/' + product.id + '/' + profile?.user_id;
        if (like) {
            try {
                axios.delete(URL);
                console.log('like deleted');
                setLike(false)
            } catch (error) {
                throw error
            }
        } else {
            axios.post(URL)
                .then(res => {
                    console.log('like created');
                    setLike(true)
                })
                .catch(err => {
                    throw err
                })
        }
    }
    
    const navBack = () => {
        navigate('/')
    }
    
    useEffect(
        () => {
            if (product && allColors) {
                
                
                let aux = []
                for (let color of allColors) {
                    for (let colorId of product.colorsIds) {
                        if (color.id === colorId) {
                            aux.push(color)
                        }
                    }
                };
                
                setSelectedColors(aux);
                getLikes();
                setStars(product.rating);
                setMaterials();
                setMainCategory();
                setSubCategories();
                setImages();
            } else {
                let URL = variables.url_prefix + '/api/v1/products/' + product_id;
                let URL2 = variables.url_prefix + '/api/v1/product_details/colors';
                // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                //     URL = 'https://' + ip + '/api/v1/products/' + product_id;
                // } else {
                //     URL = 'https://localhost:443/api/v1/products/' + product_id;
                // }
                
                axios.get(URL2)
                    .then(res =>{
                        // console.log(res);
                        setAllColors(res.data)
                    })
                    .catch(err => {
                        throw err
                    })

                axios.get(URL)
                    .then(res => {
                        // console.log(res)
                        setProduct(res.data);
                    })
                    .catch(err => {
                        throw err
                    })
            }
           
        } , [product , allColors , like]
    )

    if (!selectedImage) {
        return (
            <div className="skeletonHeight flex px-4 w-full flex-col gap-4">
                <div className="skeleton h-3/4 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    } else {
        return (
            <section className="relative flex flex-col">
                <div className="flex w-full absolute z-10 top-5 justify-between px-4 items-center">
                    <button onClick={navBack} className="btn btn-circle btn-md">
                        <FontAwesomeIcon icon={faArrowLeft} size="2xl"/>
                    </button>
                    {isAdmin?
                        <button className="btn btn-circle btn-md">
                            <FontAwesomeIcon icon={faUserTie} size="lg"/>
                        </button>
                    :
                        like?
                            <button onClick={handleLike}>
                                <FontAwesomeIcon icon={faHeart} style={{color: "#ff4747",}} size="2xl"/>
                            </button>
                            :
                            <button onClick={handleLike}>
                                <FontAwesomeIcon icon={faHeartCrack} size="2xl" />
                            </button>
                        
                    }
                </div>
                <div className="productPageCont bg-white overscroll-contain overflow-scroll carousel carousel-vertical w-full">
                    <section className="productHero1 flex flex-col relative carousel-item">
                        <div className="productHero2 relative">
                            <div className="w-full h-5/6">
                                <img src={`data:image/jpeg;base64,${selectedImage.data}`} alt={selectedImage.id} className="w-full h-full object-contain"/>
                            </div>
                            <div className="h-1/4 flex absolute bottom-0 right-0">
                                <div className="carousel carousel-center rounded-box h-full w-44">
                                
                                    {selectedImages.map(
                                        (image) => 
                                            <div onClick={() => setSelectedImage(image)} key={image.id} className="carousel-item carouselImageWidth bg-black h-full justify-center items-center">
                                                <img className={selectedImage !== image? 'w-full h-full' : 'w-10/12 h-5/6'}
                                                src={`data:image/jpeg;base64,${image.data}`}
                                                alt={image.id}
                                                />
                                            </div>
                                    )}
                                
                                </div>
                            </div>
                            <div className="w-1/2 ml-4 h-1/6 flex items-center justify-center">
                                <div className="carousel carousel-center rounded-box gap-4">
                                    <div onClick={() => setColouredImage('all')} className="carousel-item overflow-hidden justify-center items-center h-20 w-20 rounded-full">
                                        <FontAwesomeIcon size="5x" icon={faBan} />     
                                    </div>
                                    {selectedColors?.map(selectedColor => 
                                        <div key={selectedColor.id} onClick={() => setColouredImage(selectedColor.name)} className="carousel-item overflow-hidden h-20 w-20 rounded-full" style={{'backgroundColor':`${selectedColor.code}`}}>
                                            
                                        </div>
                                    )}
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
                        </div>
                    </section>
        
                    <section className="productHero1 flex flex-col carousel-item h-full px-4 gap-2">
                        <div className="flex justify-center h-20 w-full items-center">
                            <label className="text-2xl font-bold">Detalles</label>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm/6 font-medium text-gray-900">Descripción:</label>
                            <p className="text-m text-gray-400">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm/6 font-medium text-gray-900">Dimensiones:</label>
                            <div className="flex flex-row justify-evenly">
                                    <span className="flex flex-row justify-between gap-2">
                                        <label className="text-sm/6 font-medium text-gray-900">Altura (cm)</label>
                                        <p className="text-m text-gray-400">{product.height ? product.height : '-----'}</p>
                                    </span>
                                    <span className="flex flex-row justify-between gap-2">
                                        <label className="text-sm/6 font-medium text-gray-900">Longitud (cm)</label>
                                        <p className="text-m text-gray-400">{product.length ? product.length : '-----'}</p>
                                    </span>
                                    <span className="flex flex-row justify-between gap-2">
                                        <label className="text-sm/6 font-medium text-gray-900">Anchura (cm)</label>
                                        <p className="text-m text-gray-400">{product.width ? product.width : '-----'}</p>
                                    </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm/6 font-medium text-gray-900">Materiales:</label>
                            <div className="flex flex-row gap-1">
                                {materials?.map(material => 
                                    <span className="text-m text-gray-400" key={material.id}>{material.name}</span>
                                )}
                            </div>
                        </div>
                        {product.otherDetails? 
                            <div></div>
                        :
                            <></>
                        }
                        <div id="categories">
                            <span className="inline-flex items-center rounded-xl bg-gray-50 px-3 py-2 text-base font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">{mainCategory?.name}</span>
                            {categories?.map(category => 
                                <span className="inline-flex items-center rounded-xl bg-gray-50 px-3 py-2 text-base font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">{category.name}</span>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        )
    }
}

export default ProductPage