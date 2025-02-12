import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLocation } from "../../store/slices/location.slice";
import variables from "../../../utils/variables";
import axios from "axios";
import Stock from "../CartPage/Stock";
import { setCart } from "../../store/slices/cart.slice";

function CartPage () {

const dispatch = useDispatch();

const cart = useSelector(state => state.cartSlice);
const [stocks , setStocks] = useState();

//Get functions for useEffect
async function getCartStocks() {
    
    if (cart) {
        let URL = variables.url_prefix + '/api/v1/stocks/cart/' + cart?.id;
    
        try {
            const stocks2 = (await axios.get(URL)).data;
            // console.log('Stocks' , stocks2);
            return setStocks(stocks2)
        } catch (error) {
            throw error
        }
    } else {
        let URL2 = variables.url_prefix + '/api/v1/shopping_carts'

        try {
            const cart2 = (await axios.get(URL2)).data;
            // console.log('Cart' , cart2);
            dispatch(setCart(cart2));
        } catch (error) {
            throw error
        }
    }
}

useEffect(
    () => {
         dispatch(setLocation(window.location.href.split('#')[1]));
         getCartStocks();
    } , [cart]
)

    if(stocks) {
        return (
            <div className="relative loaderCont">
                <div className="px-4 flex flex-col gap-3 py-4">
                    {stocks?.map(stock => 
                        <Stock key={stock.id} stock={stock}/>
                    )}
                </div>
                <section className="flex flex-col justify-between absolute w-full bg-white bottom-0 shadow-2xl p-4 gap-6">
                    <div className="flex flex-col w-full gap-1 items-start">
                        <div className="flex flex-row w-3/5 justify-between">
                            <label className="text-base/6 font-medium text-gray-900">Cantidad:</label>
                            <p className="text-base/6 font-medium text-gray-400">{cart.ammount}</p>
                        </div>
                        <div className="flex flex-row w-3/5 justify-between">
                            <label className="text-base/6 font-medium text-gray-900">Subtotal:</label>
                            <p className="text-base/6 font-medium text-gray-400">{cart.semitotal}</p>
                        </div>
                        {cart.total < cart.semitotal?
                            <div className="flex flex-row w-3/5 justify-between">
                                <label className="text-base/6 font-medium text-gray-900">Ahorro:</label>
                                <p className="text-base/6 font-medium text-gray-400">{cart.semitotal - cart.total}</p>
                            </div>
                        :
                            <></>
                        }
                        <div className="flex flex-row w-3/5 justify-between mt-2">
                            <label className="text-xl/6 font-medium text-gray-900">Total:</label>
                            <p className="text-xl/6 font-medium text-gray-400">{cart.total}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary">Comprar</button>
                </section>
            </div>
        )
    } else {
        return (
            <section className="flex loaderCont w-full justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </section>
        )
    }
}

export default CartPage