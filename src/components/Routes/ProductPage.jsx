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
    const {product_id} = useParams();

    //Variables for purchasing
    const [cart , setCart] = useState();
    const [cartN , setCartN] = useState(0);
    const [cartStocks , setCartStocks] = useState();
    // const [cartStock , setCartStock] = useState();
    const [stocks , setStocks] = useState();
    const [selectedStock , setSelectedStock] = useState();
    const [selectedCartStock , setSelectedCartStock] = useState();
    const [cartOperation , setCartOperation] = useState(false);

    //Product related variables
    const [product , setProduct] = useState();
    const [starV1 , setStarV1] = useState(0);
    const [starV2 , setStarV2] = useState(0);
    const [starV3 , setStarV3] = useState(0);
    const [starV4 , setStarV4] = useState(0);
    const [starV5 , setStarV5] = useState(0);
    const [selectedImage , setSelectedImage] = useState();
    const [selectedImages , setSelectedImages] = useState();
    const [selectedColors , setSelectedColors] = useState();
    const [selectedColorM , setSelectedColor] = useState();
    const [commonImages , setCommonImages] = useState();
    const [colouredImages , setColouredImages] = useState();
    const [materials , setMaterialsP] = useState();
    const [mainCategory , setMainCategory] = useState();
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
        let URL = variables.url_prefix + '/api/v1/product_images/' + product_id
                
        axios.get(URL)
            .then(res => {
                console.log('Images' , res);
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
                console.log('Common Images' , aux);
                console.log('Coloured Images' , coloredAux);
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

    //Crutial function for proper purchasing logic
    function getCart () {
        let URL = variables.url_prefix + '/api/v1/shopping_carts';
        
        //1. We get the product related cart if there is one
        axios.get(URL) 
        .then(res => {
            console.log('Cart' ,res);
            //1.1 If there was, we then get the cart related stocks, this are the products stored in the cart and their ammounts 
            if(res.data) {
                    let URL2 = variables.url_prefix + '/api/v1/stocks/' + res.data.id + '/' + product_id;
                    setCart(res.data);
                    axios.get(URL2)
                        .then(res2 => {
                            console.log('Cart stocks' , res2.data)
                            setCartStocks(res2.data);
                            //1.2 If there is a non coloured stock, then there are no coloured stocks so we can asume this is the only kind of product we'll find.
                            let coloured = false;
                            for (let stock of res2.data) {
                                if (stock.color_id) {
                                    coloured = true
                                }
                            }
                            if (!coloured && res2.data.length > 0) {
                                setSelectedCartStock(res2.data[0]);
                                setCartN(res2.data[0].ammount)
                            }
                            //If there is a selected stock (which means this was started by a cart operation) we set the cart stock and cartN
                            if (selectedStock) {
                                let cartStockControl = false;
                                for (let stock of res2.data) {
                                    // console.log('Stocks review' , stock , selectedStock)
                                    if (selectedStock.colorId) {
                                        if (stock.colorId == selectedStock.colorId) {
                                            cartStockControl = true
                                            setSelectedCartStock(stock);
                                            setCartN(stock.ammount);
                                            console.log('Selected cart stock' , stock)
                                        }
                                    } else {
                                        if (stock.product_id == selectedStock.product_id) {
                                            cartStockControl = true
                                            setSelectedCartStock(stock);
                                            setCartN(stock.ammount);
                                            console.log('Selected cart stock' , stock)
                                        }
                                    }
                                }
                                if (!cartStockControl) {
                                    setSelectedCartStock();
                                    setCartN(0);
                                }
                            }
                            //If there is a selected stock we search for cart stocks related to it
                        })
                        .catch(err => {
                            throw err
                        })
                } else {
                    setCart();
                    setCartStocks();
                    setSelectedCartStock();
                    setCartN(0);
                }
            })
            .catch(err => {
                throw err
            })
    };
    
    function setColouredImage (name , color) {
    //This function must allow us to set a selected color, stock, and cart stock if posible
        console.log('Selected color' , name);
        let aux = []
        if (name === 'all') {
            aux = commonImages;
            setSelectedColor();
            setSelectedStock();
            setSelectedCartStock();
            setCartN(0)
        } else {
            for (let image of colouredImages) {
                if (image.colorId === color.id) {
                aux.push(image)
                }
            };
            setSelectedColor(color);
            for (let stock of stocks) {
                if (stock.colorId == color.id) {
                    setSelectedStock(stock);
                    console.log('Selected stock' , stock)
                }
            }
            setSelectedCartStock();
            if (cartStocks) {
                let cartStockControl = false;
                for (let stock of cartStocks) {
                    if (stock.colorId == color.id) {
                        cartStockControl = true;
                        setSelectedCartStock(stock);
                        setCartN(stock.ammount);
                        console.log('Selected cart stock' , stock)
                    }
                };
                if (!cartStockControl) {
                    setCartN(0)
                }
            } else {
                setCartN(0)
            }
        }
        if (aux?.length > 0) {
            console.log('Selected images' , aux);
            setSelectedImages(aux);
            setSelectedImage(aux[0])
        }
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

    async function addToCart () {
    setCartOperation(true);
    //We check for the stock availability
    if (cartN === selectedStock.ammount) {
        return setCartOperation(false)
    }
    let URL = variables.url_prefix + '/api/v1/shopping_carts';
    //1. We search for existing carts
    if (cart) {
            console.log('there is a cart' , cart)
            try {
                await axios.patch(URL , {
                    product_id: product_id,
                    color_id: selectedColorM?.id,
                    ammount: cartN + 1,
                    operation: 'add'
                });
                setCartOperation(false)
            } catch (error) {
                setCartOperation(false);
                throw error
            }
    } else {
        //2. If there are no carts then we create one
        console.log('no cart');
        try {
            await axios.post(URL , {
                product_id,
                color_id: selectedColorM?.id,
                ammount: cartN + 1
            });
            setCartOperation(false)

        } catch (error) {
            setCartOperation(false);
            throw error
        }
    }
    }

    async function substractFromCart () {
        setCartOperation(true);
        //We check for the stock availability
        if (cartN === 0) {
            return setCartOperation(false)
        }
        let URL = variables.url_prefix + '/api/v1/shopping_carts';
        try {
            await axios.patch(URL , {
                product_id,
                color_id: selectedColorM?.id,
                ammount: cartN - 1,
                operation: 'substract'
            });
            setCartOperation(false)
        } catch (error) {
            setCartOperation(false);
            throw error
        }
    }

    async function deleteFromCart () {
        setCartOperation(true);
       let URL = variables.url_prefix + '/api/v1/shopping_carts';
       try {
        await axios.patch(URL , {
            product_id,
            color_id: selectedColorM?.id,
            ammount: 0,
            operation: 'delete'
        });
        setCartOperation(false)
       } catch (error) {
        setCartOperation(false);
        throw error
       }
    }
    
    const navBack = () => {
        navigate('/')
    }
    
    useEffect(
        () => {
                let URL = variables.url_prefix + '/api/v1/products/' + product_id;
                let URL2 = variables.url_prefix + '/api/v1/stocks/' + product_id;
                // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                //     URL = 'https://' + ip + '/api/v1/products/' + product_id;
                // } else {
                //     URL = 'https://localhost:443/api/v1/products/' + product_id;
                // }
                
                //Frist we get the product related stocks to consult the stock availability for purchases
                axios.get(URL2)
                .then(res => {
                    console.log('Stocks' , res);
                    setStocks(res.data);
                    //Now, we set the colors available using the color_id in the stocks
                    let colorsAux = []
                    for (let stock of res.data) {
                        if (stock.Color) {
                            colorsAux.push(stock.Color)
                        } else {
                            
                        }
                    }
                    if (colorsAux.length > 0) {
                        setSelectedColors(colorsAux)
                    } else {
                        setSelectedStock(res.data[0]);
                        console.log('Selected stock' , res.data[0])
                    }
                })
                .catch(err => {
                    throw err
                })

                //We finally get the product and set the product related variables
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

    useEffect(
        () => {
            getCart()
        } , [cartOperation]
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

                    {/* Depeding of the user being admin or not we show the fav button or the admin button. Admins can not hav favourite articles */}
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
                            {/* Each color div must allow us to change the selected images and stock */}
                            {selectedColors?
                                <div className="w-1/2 ml-4 h-1/6 flex items-center justify-center">
                                    <div className="carousel carousel-center rounded-box gap-4">
                                        <div onClick={() => setColouredImage('all')} className={!selectedColorM? "carousel-item overflow-hidden justify-center items-center h-20 w-20 rounded-full border-black border-8" : "carousel-item overflow-hidden justify-center items-center h-20 w-20 rounded-full"}>
                                            <FontAwesomeIcon size="5x" icon={faBan} />     
                                        </div>
                                        {selectedColors?.map(selectedColor => 
                                            <div key={selectedColor.id} onClick={() => setColouredImage(selectedColor.name , selectedColor)} className={selectedColor.id === selectedColorM?.id ? "carousel-item overflow-hidden h-20 w-20 rounded-full border-8 border-black" : "carousel-item overflow-hidden h-20 w-20 rounded-full"} style={{'backgroundColor':`${selectedColor.code}`}}>
                                                
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
                                    selectedColorM?
                                        <span className="text-lg font-medium text-gray-400">{selectedStock?.ammount}</span>
                                        :
                                        <span className="text-lg font-medium text-gray-400">Select a Color</span>
                                    
                                    :
                                    <span className="text-lg font-medium text-gray-400">{selectedStock?.ammount}</span>
                                }
                            </div>
                            {selectedCartStock?
                                <div className="flex flex-row gap-5 items-center">
                                    <button onClick={substractFromCart} disabled={cartOperation || cartN === 0} className="btn btn-circle btn-sm">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <p className="text-xl">{cartN}</p>
                                    <button onClick={addToCart} disabled={cartOperation || cartN >= selectedStock.ammount} className="btn btn-circle btn-sm">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            :
                                <></>
                            }
                            {selectedCartStock?
                                <button onClick={deleteFromCart} disabled={cartOperation} className="btn btn-circle btn-md btn-error">
                                    {cartOperation?
                                        <div className="skeleton"></div>
                                    :
                                        <FontAwesomeIcon icon={faTrashCan} size="lg"/>}
                                </button>
                            :
                                <button onClick={addToCart} disabled={selectedColors? selectedColorM && !cartOperation?false: true : false} className="btn btn-circle btn-md btn-ghost">
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