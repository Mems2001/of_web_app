import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import variables from '../../../utils/variables';
import axios from 'axios'

function ProductCard ({product}) {

    const cardImageId = product.cardImage.split('_')[1] + '_' + product.cardImage.split('_')[2];

    function getCardImage (cardImageId) {
        let URL = variables.url_prefix + `/api/v1/products/${product.id}/${cardImageId}`;

        axios.get(URL)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                throw err
            })
    }

    useEffect (
        () => {
            console.log(product.cardImage , cardImageId);
            getCardImage(cardImageId)
        } , []
    )

    return (
        <label key={product.id} className="swap swap-flip place-content-stretch w-28 place-self-center">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="w-28"/>
                        
                            <div className="swap-on w-28 place-content-center bg-gray-200">
                                <div key={product.id} className="group flex flex-col gap-4 content-center place-items-center">
                                    <h3 className="text-sm text-gray-700 text-center">{product.name}</h3>
                                    {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
                                    <NavLink to={`/products/${product.id}`}>
                                        <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
                                    </NavLink>
                                </div>
                            </div>
                            <div className="swap-off w-28">
                                <div key={product.id} className="group">
                                    <img
                                        alt={product.cardImage}
                                        src="https://drive.google.com/uc?id=1YbXwJfuSzrMef01_8f5NSzjJ4Tuziznc"
                                        className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                                    />
                                </div>
                            </div>
        </label>
    )
}

export default ProductCard