import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import AdminConsole from "./AdminConsole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import variables from "../../../utils/variables";

function OrderPage () {
    const {reset , handleSubmit , register} = useForm();
    const navigate = useNavigate();

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

        axios.put(URL , data)
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
                navBack()
            })
            .catch(err => {
                throw err
            })
    }

    useEffect(
        () => {
            let URL = variables.url_prefix + '/api/v1/orders/' + order_id;
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://192.168.1.6:443/api/v1/orders/' + order_id;
            // } else {
            //     URL = 'https://localhost:443/api/v1/orders/' + order_id;
            // }
            
            axios.get(URL)
                .then(res => {
                    // console.log(res);
                    setOrder(res.data.data);
                })
                .catch(err => {
                    throw err
                })
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
                    <button className={edition? 'btn-active btn btn-sm' : 'btn-inactive'} onClick={editionOff}>
                        Cancelar
                    </button>
                    <button className={edition? 'btn-inactive' : 'btn-active btn-circle btn btn-sm btn-error'} onClick={deleteOrder}>
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
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
                        <div className="flex flex-col w-1/2 overflow-hidden">
                            <label className="block text-sm/6 font-medium text-gray-900">Products:</label>
                            <div className="carousel carousel-end rounded-box">
                                <div className="carousel-item w-14 h-14">
                                    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-14 h-14">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-14 h-14">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-14 h-14">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                                    alt="Drink" />
                                </div>
                                <div className="carousel-item w-14 h-14">
                                    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-14 h-14">
                                    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Drink" />
                                </div>
                                <div className="carousel-item w-14 h-14">
                                    <img
                                    src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                                    alt="Drink" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputCont">
                            <label htmlFor="free_products_count">Free products count:</label>
                            <input disabled={!edition} {...register('free_products_count')} type="number" id="free_products_count" defaultValue={order?.freeProductsCount}/>
                        </div>
                        <div>
                            Productos gratis
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputCont">
                            <label htmlFor="discount_products_count">Discounted products count:</label>
                            <input disabled={!edition} {...register('discount_products_count')} type="number" id="discount_products_count" defaultValue={order?.discountProductsCount}/>
                        </div>
                        <div>
                            Productos con descuento
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputContV">
                        <label htmlFor="order_date">Order Date:</label> 
                        <input disabled={!edition} {...register('order_date')} id="order_date" type="date" defaultValue={order?.orderDate}/>
                        </div>
                        <div className="orderInputContV">
                            <label htmlFor="expected_date_min">Min expected date:</label>
                            <input disabled={!edition} {...register('expected_date_min')} id="expected_date_min" type='date' defaultValue={order?.expectedDateMin}/>
                        </div>
                        <div className="orderInputContV">
                            <label htmlFor="expected_date_max">Max expected date:</label>
                            <input disabled={!edition} {...register('expected_date_max')} id="expected_date_max" type="date" defaultValue={order?.expectedDateMax}/>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputCont">
                            <label htmlFor="received">Received:</label>
                            <input disabled={!edition} {...register('received')} id="received" type="checkbox" defaultChecked={order?.received}/>
                        </div>
                        <div className="orderInputCont">
                            <label htmlFor="reception_date">Reception date:</label>
                            <input disabled={!edition} {...register('reception_date')} id='reception_date' type="date" defaultValue={order?.receptionDate}/>
                        </div>
                    </div>
                    <div className="rowForOrder">
                        <div className="orderInputCont">
                            <label htmlFor="price">Price:</label>
                            <input disabled={!edition} {...register('price')} id='price' defaultValue={order?.price}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OrderPage