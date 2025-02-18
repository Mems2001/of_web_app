import { useEffect, useState } from "react"
import variables from "../../../utils/variables";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { setCart } from "../../store/slices/cart.slice";
import { useDispatch } from "react-redux";

function Stock ({stock}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cartOperation , setCartOperation] = useState(false);

    const [cardImage , setCardImage] = useState();
    const [productStock , setProductStock] = useState();

    //Get functions for useEffect
    async function getCardImage() {
        let URL = variables.url_prefix + '/api/v1/product_images/card/' + stock.productId;
    
        try {
            const cardImg = (await axios.get(URL)).data.data;
            // console.log(cardImg);
            if (cardImg) {
                setCardImage(`data:image/jpeg;base64,${cardImg}`)
            }
        } catch (error) {
            throw error
        }

    };

    async function getProductStock () {
        let URL = variables.url_prefix + '/api/v1/stocks/product/' + stock.productId;

        try { 
            const stocks = (await axios.get(URL)).data;
            // console.log('Product stocks' , stocks);
            if (stock.colorId) {

            } else {
                return setProductStock(stocks[0])
            }
        } catch (error) {
            throw error
        }
    }

    //OnClick functions
    function navToProduct() {
        navigate(`/products/${stock.Product.id}`)
    }

    async function deleteStock () {
        setCartOperation(true);
        let URL = variables.url_prefix + '/api/v1/stocks/' + stock.id;

        try {
            const newCart = (await axios.delete(URL)).data;

            if (newCart) {
                // console.log('Cart updated' , newCart);
                setCartOperation(false);
                return dispatch(setCart(newCart))
            } else {
                setCartOperation(false);
                navigate('/');
                return dispatch(setCart(null))
            }

        } catch (error) {
            setCartOperation(false);
            throw error
        }
    };

    async function substractFromCart () {
        setCartOperation(true);
        let URL = variables.url_prefix + '/api/v1/shopping_carts';
        
        try {
            const newCart = (await axios.patch(URL , {
                product_id: stock.productId,
                colorId: stock.colorId || null,
                operation: 'substract'
            })).data

            if (newCart) {
                setCartOperation(false);
                return dispatch(setCart(newCart))
            } else {
                setCartOperation(false);
                navigate('/');
                return dispatch(setCart(null))
            }
        } catch (error) {
            setCartOperation(false);
            throw error
        }
    };

    async function addToCart () {
        setCartOperation(true);
        let URL = variables.url_prefix + '/api/v1/shopping_carts';

        try {
            const newCart = (await axios.patch(URL , {
                product_id: stock.productId,
                colorId: stock.colorId || null,
                operation: 'add'
            })).data;

            setCartOperation(false);
            return dispatch(setCart(newCart))
        } catch (error) {
            setCartOperation(false);
            throw error
        }
    }

    useEffect(
        () => {
            // console.log(stock);
            getCardImage();
            getProductStock()
        } , [cartOperation]
    )

    if (productStock) {
        return (
       <article className="flex flex-row card card-bordered shadow p-0 h-36">
            {cardImage?
                <img onClick={navToProduct} className="h-full w-1/3" src={cardImage} alt={stock.Product.name}/>
            :
                <div className="skeleton h-full w-1/3"></div>
            }
            <div className="flex flex-row w-2/3 pl-3 justify-between">
                {/* Title and delete button */}
                <div className="flex flex-col w-full justify-between items-start">
                    <label className="text-sm/6 font-medium text-gray-900 mt-2">{stock.Product.name}</label>
                    <div className="flex flex-row w-full mb-2">
                        <div className="flex flex-col w-full h-fit justify-start items-start">
                            <div className="flex flex-row w-full justify-between">
                                <label className="text-sm/6 font-medium text-gray-900">Precio:</label>
                                <p className="text-sm/6 font-medium text-gray-400">{stock.Product.price}</p>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <label className="text-sm/6 font-medium text-gray-900">Subtotal:</label>
                                <p className="text-sm/6 font-medium text-gray-400">{stock.semitotal}</p>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <label className="text-sm/6 font-medium text-gray-900">Ahorro:</label>
                                <p className="text-sm/6 font-medium text-gray-400">{stock.semitotal - stock.total}</p>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <label className="text-sm/6 font-medium text-gray-900">Total:</label>
                                <p className="text-sm/6 font-medium text-gray-400">{stock.total}</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center pr-4 pl-12">
                            <button onClick={deleteStock} disabled={cartOperation} className="btn btn-circle btn-ghost btn-sm mb-7">
                                <FontAwesomeIcon icon={faTrashCan} size="lg" color="#ff0000"/>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Product info */}
                <div className="flex flex-col justify-between w-fit items-center h-full">
                    <button onClick={substractFromCart} disabled={stock.ammount <= 0 || cartOperation} className="btn btn-circle btn-sm">
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                    <p className="text-lg/6">{stock.ammount}</p>
                    <button onClick={addToCart} disabled={stock.ammount >= productStock.ammount || cartOperation} className="btn btn-circle btn-sm">
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
       </article> 
    )
    } else {
        return (
            <div className="skeleton w-full h-32">

            </div>
        )
    }
}

export default Stock