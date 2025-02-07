import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import variables from "../../../utils/variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan, faCartPlus, faHeart, faHeartCrack, faMinus, faPlus, faTrashCan, faUserTie } from "@fortawesome/free-solid-svg-icons";

function ProductPage () {
    const [isAdmin , setIsAdmin] = useState(localStorage.getItem('onlyFancyAdmin'));
    const profile = useSelector(state => state.profileSlice );
    const [cart , setCartP] = useState();
    const {product_id} = useParams();

    // const [loading , setLoading] = useState(true);
    const [product , setProduct] = useState();
    const [starV1 , setStarV1] = useState(0);
    const [starV2 , setStarV2] = useState(0);
    const [starV3 , setStarV3] = useState(0);
    const [starV4 , setStarV4] = useState(0);
    const [starV5 , setStarV5] = useState(0);
    const [stocks , setStocks] = useState();
    const [colorStock , setColorStock] = useState(); //Used for any selected stock
    const [selectedImage , setSelectedImage] = useState();
    const [selectedImages , setSelectedImages] = useState();
    const [selectedColors , setSelectedColors] = useState();
    const [selectedColor , setSelectedColor] = useState();
    const [commonImages , setCommonImages] = useState();
    const [colouredImages , setColouredImages] = useState();
    const [materials , setMaterialsP] = useState();
    const [mainCategory , setMainCategory] = useState();
    const [categories , setCategoriesP] = useState();
    const [like , setLike] = useState(false);
    const [cartN , setCartN] = useState(0);
    const [deletingCart , setDeletingCart] = useState(false);
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
        let URL = variables.url_prefix + '/api/v1/product_images/' + product_id
                
        axios.get(URL)
            .then(res => {
                console.log(res);
                let aux = [];
                let coloredAux = [];
                for (let image of res.data) {
                    if (image.type == 'common') {
                        aux.push(image)
                    }
                    if (image.type == 'color') {
                        coloredAux.push(image)
                    }
                };
                console.log(aux);
                setCommonImages(aux);
                setColouredImages(coloredAux);
                setSelectedImages(aux);
                setSelectedImage(aux[0])
            })
            .catch(err => {
                throw err
            })
    }

    function setMaterials (product) {
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

    function setSubCategories (product) {
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

    function getCart () {
        let URL = variables.url_prefix + '/api/v1/shopping_carts'

        axios.get(URL) 
            .then(res => {
                console.log('Cart' ,res);
                if(res.data) {
                    setCartP(res.data);
                    setCartN(1)
                }
            })
            .catch(err => {
                throw err
            })
    }
    
    function setColouredImage (name , color) {
        let aux = []
        if (name === 'all') {
            aux = commonImages;
            setSelectedColor();
            setColorStock();
        } else {
            aux = colouredImages;
            setSelectedColor(color);
            for (let stock of stocks) {
                if (stock.colorId == color.id) {
                    setColorStock(stock)
                }
            }
        }
        if (aux.length > 0) {
            setSelectedImages(aux);
            setSelectedImage(aux[0])
        }
        console.log(aux)
    }

    function getLikes () {
        let URL = variables.url_prefix + '/api/v1/favourites/' + product_id + '/' + profile?.user_id;

        axios.get(URL)
            .then(res => {
                console.log('Favourites' , res);
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

    function addToCart () {
        if (cartN < product.stock) {
            if (cart) {
    
            } else {
                let URL = variables.url_prefix + '/api/v1/shopping_carts';
    
                let aux = [product.id]
    
                axios.post(URL , {
                    products_ids: aux
                })
                    .then(res => {
                        setCartP(res.data)
                    })
                    .catch(err => {
                        throw err
                    })
            }
            setCartN(cartN + 1)
        };
        // console.log(cartN)
    }

    function substractFromCart () {
        if (cartN > 0) {
            setCartN(cartN - 1)
        };
        // console.log(cartN)
    }

    function deleteFromCart () {
        let URL = variables.url_prefix + '/api/v1/shopping_carts';
        if (cart.productsIds.length > 1) {
            let prods = cart.productsIds;
            let index = prods.indexOf(product.id);
            prods.splice(index , 1);
            axios.patch(URL , prods)
                .then(res => {
                    setCartP(res.data)
                    setCartN(0)
                })
                .catch(err => {
                    throw err
                })
        } else {
            setDeletingCart(true)
            try {
                axios.delete(URL)
                setCartP()
                setCartN(0)
                setDeletingCart(false)
            } catch (error) {
                throw error
            }
        }   
    }
    
    const navBack = () => {
        navigate('/')
    }
    
    useEffect(
        () => {
                let URL = variables.url_prefix + '/api/v1/products/' + product_id;
                let URL3 = variables.url_prefix + '/api/v1/stocks/' + product_id;
                // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                //     URL = 'https://' + ip + '/api/v1/products/' + product_id;
                // } else {
                //     URL = 'https://localhost:443/api/v1/products/' + product_id;
                // }
                
                axios.get(URL3)
                .then(res => {
                    console.log('Stocks' , res);
                    setStocks(res.data);
                    let colorsAux = []
                    for (let stock of res.data) {
                        if (stock.Color) {
                            colorsAux.push(stock.Color)
                        } else {
                            setColorStock(stock)
                        }
                    }
                    if (colorsAux.length > 0) {
                        setSelectedColors(colorsAux)
                    }
                })
                .catch(err => {
                    throw err
                })
                
                axios.get(URL)
                .then(res => {
                    console.log('Product' , res);
                    //We must respect the data renderization order
                    setImages();
                    getLikes();
                    setStars(res.data.rating);
                    setMaterials(res.data);
                    setMainCategory(res.data.Main_category);
                    setSubCategories(res.data);
                    getCart();
                    setProduct(res.data);
                    })
                    .catch(err => {
                        throw err
                    })
           
        } , []
    )

    if (!product) {
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
                            <button className="btn btn-circle btn-ghost" onClick={handleLike}>
                                <FontAwesomeIcon icon={faHeart} style={{color: "#ff4747",}} size="2xl"/>
                            </button>
                            :
                            <button className="btn btn-circle btn-ghost" onClick={handleLike}>
                                <FontAwesomeIcon icon={faHeartCrack} size="2xl" />
                            </button>
                        
                    }
                </div>
                <div className="productPageCont bg-white overscroll-contain overflow-scroll carousel carousel-vertical w-full">
                    <section className="productHero1 flex flex-col relative carousel-item">
                        <div className="productHero2 relative">
                            {selectedImage?
                                <div className="w-full h-5/6">
                                    <img src={`data:image/jpeg;base64,${selectedImage?.data}`} alt={selectedImage?.id} className="w-full h-full object-contain"/>
                                </div>
                            :
                                <div className="w-full h-5/6 skeleton">

                                </div>
                            }
                            <div className="h-1/4 flex absolute bottom-0 right-0">
                                <div className="carousel carousel-center rounded-box h-full w-44">
                                
                                    {selectedImages?.map(
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
                            {selectedColors?
                                <div className="w-1/2 ml-4 h-1/6 flex items-center justify-center">
                                    <div className="carousel carousel-center rounded-box gap-4">
                                        <div onClick={() => setColouredImage('all')} className="carousel-item overflow-hidden justify-center items-center h-20 w-20 rounded-full">
                                            <FontAwesomeIcon size="5x" icon={faBan} />     
                                        </div>
                                        {selectedColors?.map(selectedColor => 
                                            <div key={selectedColor.id} onClick={() => setColouredImage(selectedColor.name , selectedColor)} className="carousel-item overflow-hidden h-20 w-20 rounded-full" style={{'backgroundColor':`${selectedColor.code}`}}>
                                                
                                            </div>
                                        )}
                                    </div>
                                </div>
                            :
                                <></>
                            }
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
                        <div className="flex flex-col gap-3 h-1/2">
                            <div className="flex justify-center h-20 w-full items-center">
                                <label className="text-2xl font-bold">Detalles</label>
                            </div>
                            <div className="flex">
                                <p className="text-m text-gray-400">
                                    {product.description}
                                </p>
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-row justify-between w-full">
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
                            <div className="flex flex-row gap-2">
                                <label className="text-sm/6 font-medium text-gray-900">Materiales:</label>
                                <div className="flex flex-row gap-2">
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
                        </div>

                        <div className="flex flex-row justify-between items-center px-4">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="text-sm/6 font-medium text-gray-900">Stock:</label>
                                {selectedColors?
                                    selectedColor?
                                        <span className="text-lg font-medium text-gray-400">{colorStock?.ammount}</span>
                                        :
                                        <span className="text-lg font-medium text-gray-400">Select a Color</span>
                                    
                                    :
                                    <span className="text-lg font-medium text-gray-400">{colorStock?.ammount}</span>
                                }
                            </div>
                            {cartN?
                                <div className="flex flex-row gap-5 items-center">
                                    <button onClick={substractFromCart} className="btn btn-circle btn-sm">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <p className="text-xl">{cartN}</p>
                                    <button onClick={addToCart} className="btn btn-circle btn-sm">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            :
                                <></>
                            }
                            {cartN?
                                <button onClick={deleteFromCart} disabled={deletingCart} className="btn btn-circle btn-md btn-error">
                                    {deletingCart?
                                        <div className="skeleton"></div>
                                    :
                                        <FontAwesomeIcon icon={faTrashCan} size="lg"/>}
                                </button>
                            :
                                <button onClick={addToCart} disabled={selectedColors? selectedColor?false: true : false} className="btn btn-circle btn-md btn-ghost">
                                    <FontAwesomeIcon icon={faCartPlus} style={{color: "#74C0FC",}} size="2xl" />
                                </button>
                            }
                        </div>
                    </section>
                </div>
            </section>
        )
    }
}

export default ProductPage