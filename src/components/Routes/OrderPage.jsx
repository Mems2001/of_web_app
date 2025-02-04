import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import AdminConsole from "./AdminConsole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import variables from "../../../utils/variables";
import ProductMiniCard from "../OrderPage/ProductMiniCard";
import DeleteSomethig from "../Modals/DeleteSomething";

function OrderPage () {
    const {reset , handleSubmit , register} = useForm();
    const navigate = useNavigate();
    const [products , setProducts] = useState();
    const [isLoading , setIsLoading] = useState(false);

    const navBack = () => {
        navigate('/admin/my_orders')
    };

    const {order_id} = useParams();

    const [order , setOrder] = useState();
    const [edition , setEdition] = useState(false);

    const submit = data => {
        let URL = variables.url_prefix + '/api/v1/orders/' + order_id;
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://192.168.1.6:443/api/v1/orders/' + order_id;
            // } else {
            //     URL = 'https://localhost:443/api/v1/orders/' + order_id;
            // }

        axios.patch(URL , data)
            .then(res => {
                // console.log(res);
                editionOff()
            })
            .catch(err => {
                throw err
            })
    }

    const parseData = data => {
        const keys = Object.keys(data);
        // console.log(keys);
        let newData = {};

        for (let key of keys) {
            if (data[key] != '') {
                newData[key] = data[key]
            } else {
                newData[key] = undefined
            }
        };
        // console.log('New data is:' , newData);
        submit(newData)
    }

    const editionOn = () => {
        setEdition(true)
    }

    const editionOff = () => {
        setEdition(false)
    }

    const deleteOrder = () => {
        let URL = variables.url_prefix + '/api/v1/orders/' + order_id;
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://192.168.1.6:443/api/v1/orders/' + order_id;
            // } else {
            //     URL = 'https://localhost:443/api/v1/orders/' + order_id;
            // }

        axios.delete(URL)
            .then(res => {
                // console.log(res);
                return true
            })
            .catch(err => {
                console.log(err);
                throw err
            })
    }

    useEffect(
        () => {
            setIsLoading(true);
            let URL = variables.url_prefix + '/api/v1/orders/' + order_id;
            let URL2 = variables.url_prefix + '/api/v1/orders/' + order_id + '/products';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://192.168.1.6:443/api/v1/orders/' + order_id;
            // } else {
            //     URL = 'https://localhost:443/api/v1/orders/' + order_id;
            // }
            
            axios.get(URL)
                .then(res => {
                    // console.log(res);
                    setOrder(res.data);
                })
                .catch(err => {
                    throw err
                })

            axios.get(URL2)
                .then(res => {
                    setProducts(res.data.data);
                    console.log(res)
                })
                .catch(err => {
                    throw err
                })

            setIsLoading(false)
        } , [edition]
    )

    return (
        <div className="orderPageCont">
            <AdminConsole />
            <div className="orderAuxCont">           
                <nav className="orderNav">
                    <button className="btn btn-circle btn-sm" onClick={navBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size="xl"/>
                    </button>
                    <div className="orderNCard">
                        <label className="block text-sm/6 font-medium text-gray-900" htmlFor="order_count">Pedido N°: </label>
                        <a id="order_count">{order?.orderCount}</a>
                    </div>
                    <div className="orderPageTitles">
                        <label className="block text-sm/6 font-medium text-gray-900" htmlFor="user_name">Autor: </label>
                        <a id="user_name">{order?.User.user_name}</a>
                    </div>
                </nav>
                <div className="orderPageBtnsCont">
                    <button className="btn btn-sm" onClick={edition? handleSubmit(parseData) : editionOn}>
                        {edition? 'Guardar' : 'Editar'}
                    </button>
                    {edition?
                    <button className='btn btn-sm' onClick={editionOff}>
                        Cancelar
                    </button>
                        :
                    <DeleteSomethig key={order_id} deleteFunction={deleteOrder} navBackFunction={navBack}/>
                    }
                </div>
                <form className="orderDataCont" >
                    <div className="rowForOrder">
                        <div className="orderInputCont">
                            <label className="block text-sm/6 font-medium text-gray-900 w-1/2" htmlFor="temu_id">Temu Id:</label>
                            <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('temu_id')} id="temu_id" name="temu_id" defaultValue={order?.temuId} />
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="delivery_company">Delivery Company:</label>
                            <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" name="delivery_company" disabled={!edition} {...register('delivery_company')} id="delivery_company" defaultValue={order?.deliveryCompany}/>
                        </div>
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="delivery_id">Delivery Id:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('delivery_id')} id="delivery_id" name="delivery_id" defaultValue={order?.deliveryId}/>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="products_count">Products count:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('products_count')} type="number" id="products_count" defaultValue={order?.productsCount}/>
                        </div>
                        <div className="flex flex-col w-4/5 overflow-hidden">
                            <label className="block text-sm/6 font-medium text-gray-900">Products:</label>
                            <div className="carousel rounded-box">
                                {!isLoading && products? 
                                    products?.map(product => 
                                        <ProductMiniCard product={product} key={`miniCard${product.id}`}/>
                                    )
                                : 
                                    <div className="carousel-item skeleton w-16 h-24"></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label htmlFor="free_products_count">Free products count:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('free_products_count')} type="number" id="free_products_count" defaultValue={order?.freeProductsCount}/>
                        </div>
                        <div className="flex flex-col w-4/5 overflow-hidden">
                            <label className="block text-sm/6 font-medium text-gray-900">Free products:</label>
                            <div className="carousel carousel-end rounded-box">
                                <div className="carousel-item w-16 h-18">
                                    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                                    alt="Drink" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="discount_products_count">Discounted products count:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('discount_products_count')} type="number" id="discount_products_count" defaultValue={order?.discountProductsCount}/>
                        </div>
                        <div className="flex flex-col w-4/5 overflow-hidden">
                            <label className="block text-sm/6 font-medium text-gray-900">Discounted products:</label>
                            <div className="carousel carousel-end rounded-box">
                                <div className="carousel-item w-16 h-18">
                                    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-16 h-18">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                                    alt="Drink" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="order_date">Order Date:</label> 
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('order_date')} id="order_date" type="date" defaultValue={order?.orderDate}/>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="expected_date_min">Min expected date:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('expected_date_min')} id="expected_date_min" type='date' defaultValue={order?.expectedDateMin}/>
                        </div>
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="expected_date_max">Max expected date:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('expected_date_max')} id="expected_date_max" type="date" defaultValue={order?.expectedDateMax}/>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="received">Received:</label>
                            <input className="checkbox" disabled={!edition} {...register('received')} id="received" type="checkbox" defaultChecked={order?.received}/>
                        </div>
                        <div className="orderInputContV">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="reception_date">Reception date:</label>
                            <input className="block w-full text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} {...register('reception_date')} id='reception_date' type="date" defaultValue={order?.receptionDate}/>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputCont justify-start">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="price">Price:</label>
                            <input className="block text-sm rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-1/3" disabled={!edition} {...register('price')} id='price' defaultValue={order?.price}/>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default OrderPage