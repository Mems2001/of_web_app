import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import variables from '../../../utils/variables';
import { useEffect, useState } from "react";
import axios from "axios";

function ProductCard ({product}) {
    const [cardImage , setCardImage] = useState();

    useEffect (
        () => {   
        const URL = variables.url_prefix + '/api/v1/product_images/card/' + product.id;
        axios.get(URL)
            .then(res => {
                // console.log(res);
                setCardImage(`data:image/jpeg;base64,${res.data.data}`)
            })
            .catch(err => {
                throw err
            })
        } , [cardImage]
    )

        return (
            <label key={product.id} className="swap swap-flip place-content-stretch w-28 place-self-center">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="w-28"/>
        
            <div className="swap-on w-28 place-content-center bg-gray-200 p-2">
                <div key={product.id} className="group flex flex-col gap-4 content-center place-items-center">
                    <h3 className="text-sm text-gray-700 text-center">{product.name}</h3>
                    {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
                    <NavLink to={`/products/${product.id}`}>
                        <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
                    </NavLink>
                </div>
            </div>
            {cardImage?
                <div className="swap-off w-28">
                    <div key={product.id} className="group">
                        <img
                            alt={product.name}
                            src={cardImage}
                            className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                        />
                    </div>
                </div>
            :
            <article className="skeleton swap-off w-28 aspect-square"></article>
            }
        </label>
        )       
}

export default ProductCard