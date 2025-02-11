import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLocation } from "../../store/slices/location.slice";
import variables from "../../../utils/variables";
import axios from "axios";

function CartPage () {

const dispatch = useDispatch();

const cart = useSelector(state => state.cartSlice);
const [stocks , setStocks] = useState();

//Get functions for useEffect
async function getCartStocks() {
    let URL = variables.url_prefix + '/api/v1/stocks/cart/' + cart?.id;

    try {
        const stocks2 = (await axios.get(URL)).data;
        console.log('Stocks' , stocks2);
        setStocks(stocks2)
    } catch (error) {
        throw error
    }
}

useEffect(
    () => {
         dispatch(setLocation(window.location.href.split('#')[1]));
         getCartStocks()
    } , []
)

    if(stocks) {
        return (
            <div>
                {cart?.id}
                {stocks?.map(stock => 
                    <div>{stock.id}</div>
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