import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

function OrderForm () {
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

        const URL = 'http://localhost:8000/api/v1/orders';

        axios.post(URL , data)
            .then(res => {
                // console.log(res);
                reset(defaultOrder);
                navigate('/admin/my_orders')
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
            if (data[key].length != 0) {
                if (data[key] == 'false') {
                    newData[key] = true
                } else {
                    newData[key] = data[key]
                }
            } else {
                newData[key] = undefined
            }
        };
        // console.log("New data is:" , newData);

        submit(newData)
    }

    return (
        <form className="orderFormCont" onSubmit={handleSubmit(parseData)}>
            <div className="orderFormCont2">
                <div className='rowForOrder'>
                    <div className="orderInputCont">
                        <label htmlFor="temu_id">Temu Id:</label>
                        <input {...register('temu_id')} id="temu_id" type="text"/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="orderInputCont">
                        <label htmlFor="delivery_company">Delivery Company:</label>
                        <input {...register('delivery_company')} id="delivery_company" type="text"/>
                    </div>
                    <div className="orderInputCont">
                        <label htmlFor="dlivey_id">Delivery Id:</label>
                        <input {...register('delivery_id')} id="delivery_id" type="text"/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="orderInputCont">
                        <label htmlFor="products_count">Products count:</label>
                        <input {...register('products_count' , {required:true , valueAsNumber:true})} id="products_count" type="number"/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='orderInputCont'>
                        <label htmlFor='free_products_count'>Free products count:</label>
                        <input {...register('free_products_count' , {valueAsNumber:true})} id='free_products_count' type='number'/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='orderInputCont'>
                        <label htmlFor='discount_products_count'>Discounted products count:</label>
                        <input id='discount_products_count' type='number' {...register('discount_products_count' , {valueAsNumber:true})}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="orderInputContV">
                        <label htmlFor="order_date">Order Date:</label>
                        <input {...register('order_date' , {required: true , valueAsDate:true})} id="order_date" type="date"/>
                    </div>
                    <div className='orderInputContV'>
                        <label htmlFor='expected_date_min'>Min expected date:</label>
                        <input id='expected_date_min' type='date' {...register('expected_date_min' , {valueAsDate:true})}/>
                    </div>
                    <div className='orderInputContV'>
                        <label htmlFor='expected_date_max'>Max expected date:</label>
                        <input id='expected_date_max' type='date' {...register('expected_date_max' , {valueAsDate:true})}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='orderInputCont'>
                        <label htmlFor='received'>Received:</label>
                        <input id='received' type='checkbox' defaultChecked={false} {...register('received')}/>
                    </div>
                    <div className='orderInputCont'>
                        <label htmlFor='reception_date'>Received date:</label>
                        <input id='reception_date' type='date' {...register('reception_date' , {valueAsDate:true})}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className="orderInputCont">
                        <label htmlFor="price">Price:</label>
                        <input {...register('price' , {required: true , valueAsNumber:true})} id="price"/>
                    </div>
                </div>
            </div>
            <button>
                Añadir
            </button>
        </form>
    )
}

export default OrderForm