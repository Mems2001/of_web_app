import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

function PedidoForm () {
    const {register , handleSubmit , reset} = useForm();

    const navigate = useNavigate();

    const defaultOrder = {
        temu_id: '',
        delivery_company: '',
        delivery_id: '',
        products_count: '',
        free_products_count: '',
        discount_products_count: '',
        order_date: '',
        expected_date_min: '',
        expected_date_max: '',
        received: false,
        received_date: '',
        price: ''

    }

    const submit = data => {
        const URL = 'http://localhost:8000/api/v1/orders'

        axios.post(URL , data)
            .then(res => {
                console.log(res);
                reset(defaultOrder);
                navigate('/admin/mis_pedidos')
            })
            .catch(err => {
                throw err
            })
    }

    return (
        <form className="pedidoFormCont" onSubmit={handleSubmit(submit)}>
            <div className="pedidoFormCont2">
                <div className='rowForOrder'>
                    <div className="pedidoInputCont">
                        <label htmlFor="temu_id">Temu Id:</label>
                        <input {...register('temu_id')} id="temu_id" type="text"/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="pedidoInputCont">
                        <label htmlFor="delivery_company">Delivery Company:</label>
                        <input {...register('delivery_company')} id="delivery_company" type="text"/>
                    </div>
                    <div className="pedidoInputCont">
                        <label htmlFor="dlivey_id">Delivery Id:</label>
                        <input {...register('delivery_id')} id="delivery_id" type="text"/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="pedidoInputCont">
                        <label htmlFor="products_count">Products count:</label>
                        <input {...register('products_count')} id="products_count" type="number"/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='pedidoInputCont'>
                        <label htmlFor='free_products_count'>Free products count:</label>
                        <input {...register('free_products_count')} id='free_products_count' type='number'/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='pedidoInputCont'>
                        <label htmlFor='discount_products_count'>Discounted products count:</label>
                        <input id='discount_products_count' type='number' {...register('discount_products_count')}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="pedidoInputContV">
                        <label htmlFor="order_date">Order Date:</label>
                        <input {...register('order_date')} id="order_date" type="date"/>
                    </div>
                    <div className='pedidoInputContV'>
                        <label htmlFor='expected_date_min'>Min expected date:</label>
                        <input id='expected_date_min' type='date' {...register('expected_date_min')}/>
                    </div>
                    <div className='pedidoInputContV'>
                        <label htmlFor='expected_date_max'>Max expected date:</label>
                        <input id='expected_date_max' type='date' {...register('expected_date_max')}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='pedidoInputCont'>
                        <label htmlFor='received'>Received:</label>
                        <input id='received' type='checkbox' {...register('received')}/>
                    </div>
                    <div className='pedidoInputCont'>
                        <label htmlFor='reception_date'>Received date:</label>
                        <input id='reception_date' type='date' {...register('reception_date')}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="pedidoInputCont">
                        <label htmlFor="price">Price:</label>
                        <input {...register('price')} id="price" type="text"/>
                    </div>
                </div>
            </div>
            <button>
                Crear
            </button>
        </form>
    )
}

export default PedidoForm