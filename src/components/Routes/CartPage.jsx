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
            console.log('Stocks' , stocks2);
            return setStocks(stocks2)
        } catch (error) {
            throw error
        }
    } else {
        let URL2 = variables.url_prefix + '/api/v1/shopping_carts'

        try {
            const cart2 = (await axios.get(URL2)).data;
            console.log('Cart' , cart2);
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
            <div className="px-4 flex flex-col gap-2">
                {cart?.id}
                {stocks?.map(stock => 
                    <Stock key={stock.id} stock={stock}/>
                )}
            </div>
        )
    } else {
        return (
            <div>
                Empty
            </div>
        )
    }
}

export default CartPage