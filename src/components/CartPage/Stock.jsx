import { useEffect, useState } from "react"
import variables from "../../../utils/variables";
import axios from "axios";

function Stock ({stock}) {
    const [cardImage , setCardImage] = useState();

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

    }

    useEffect(
        () => {
            console.log(stock);
            getCardImage()
        } , []
    )

    return (
       <article className="flex flex-row card card-bordered shadow p-0 h-32">
            {cardImage?
                <img className="h-full w-1/3" src={cardImage} alt={stock.Product.name}/>
            :
                <div className="skeleton h-full w-1/3"></div>
            }
            <div className="flex flex-row w-2/3">
                <div className="flex flex-col justify-center items-start w-full pl-3">
                    <label className="text-sm/6 font-medium text-gray-900 mb-2">{stock.Product.name}</label>
                    <div className="flex flex-row gap-4">
                        <label className="text-sm/6 font-medium text-gray-900">Precio:</label>
                        <p className="text-sm/6 font-medium text-gray-400">{stock.Product.price}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label className="text-sm/6 font-medium text-gray-900">Subtotal:</label>
                        <p className="text-sm/6 font-medium text-gray-400">{stock.semitotal}</p>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <button className="btn btn-circle btn-sm">-</button>
                        <p>{stock.ammount}</p>
                        <button className="btn btn-circle btn-sm">+</button>
                    </div>
                </div>
            </div>
       </article> 
    )
}

export default Stock