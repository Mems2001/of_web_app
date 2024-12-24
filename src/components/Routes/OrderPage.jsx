import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate, useParams } from "react-router-dom"

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
        const URL = 'http://localhost:8000/api/v1/orders/' + order_id;

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
        const URL = 'http://localhost:8000/api/v1/orders/' + order_id;
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
            const URL = 'http://localhost:8000/api/v1/orders/' + order_id
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
            <nav className="orderNav">
                <button onClick={navBack}>
                    Back
                </button>
                <div className="orderNCard">
                    <label htmlFor="order_count">Pedido N°: </label>
                    <a id="order_count">{order?.orderCount}</a>
                </div>
                <div className="orderPageTitles">
                    <label htmlFor="user_name">Autor: </label>
                    <a id="user_name">{order?.User.user_name}</a>
                </div>
            </nav>
            <div className="orderPageBtnsCont">
                <button onClick={edition? handleSubmit(parseData) : editionOn}>
                    {edition? 'Guardar' : 'Editar'}
                </button>
                <button className={edition? 'btn-inactive' : 'btn-active'} onClick={editionOff}>
                    Cancelar
                </button>
                <button className={edition? 'btn-active' : 'btn-inactive'} onClick={deleteOrder}>
                    Eliminar
                </button>
            </div>
            <form className="orderDataCont" >
                <div className="rowForOrder">
                    <div className="orderInputCont">
                        <label htmlFor="temu_id">Temu Id:</label>
                        <input disabled={!edition} {...register('temu_id')} id="temu_id" defaultValue={order?.temuId} />
                    </div>
                </div>
                <div className="rowForOrder">
                    <div className="orderInputCont">
                        <label htmlFor="delivery_company">Delivery Company:</label>
                        <input disabled={!edition} {...register('delivery_company')} id="delivery_company" defaultValue={order?.deliveryCompany}/>
                    </div>
                    <div className="orderInputCont">
                        <label htmlFor="delivery_id">Delivery Id:</label>
                        <input disabled={!edition} {...register('delivery_id')} id="delivery_id" defaultValue={order?.deliveryId}/>
                    </div>
                </div>
                <div className="rowForOrder">
                    <div className="orderInputCont">
                        <label htmlFor="products_count">Products count:</label>
                        <input disabled={!edition} {...register('products_count')} type="number" id="products_count" defaultValue={order?.productsCount}/>
                    </div>
                    <div>
                        Productos
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
    )
}

export default OrderPage