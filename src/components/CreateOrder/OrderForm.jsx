import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import variables from "../../../utils/variables";

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

        let URL = variables.url_prefix + '/api/v1/orders';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://192.168.1.6:443/api/v1/orders';
            // } else {
            //     URL = 'https://localhost:443/api/v1/orders';
            // }

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
               
                    <div className="orderInputCont">
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor="temu_id">Temu Id:</label>
                        <input className="block w-3/4 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register('temu_id')} id="temu_id" name="temu_id" type="text"/>
                    </div>
                
                    <div className="orderInputCont">
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor="delivery_company">Delivery Company:</label>
                        <input className="block w-3/4 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register('delivery_company')} id="delivery_company" name="delivery_company" type="text"/>
                    </div>
                
                <div className="orderInputCont">
                    <label className="text-sm/6 font-medium text-gray-900" htmlFor="dlivey_id">Delivery Id:</label>
                    <input className="block w-3/4 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register('delivery_id')} id="delivery_id" type="text"/>
                </div>
                {/* <div className='rowForOrder'>
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
                </div> */}
                    <div className="orderInputContV">
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor="order_date">Order Date:</label>
                        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register('order_date' , {required: true , valueAsDate:true})} id="order_date" name="order_date" type="date"/>
                    </div>
                <div className='rowForOrder'>
                    <div className='orderInputContV'>
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor='expected_date_min'>Earliest reception date:</label>
                        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id='expected_date_min' name="expected_date_min" type='date' {...register('expected_date_min' , {valueAsDate:true})}/>
                    </div>
                    <div className='orderInputContV'>
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor='expected_date_max'>Latest reception date:</label>
                        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" name="expected_date_max" id='expected_date_max' type='date' {...register('expected_date_max' , {valueAsDate:true})}/>
                    </div>
                </div>
                <div className='rowForOrder'>
                    <div className='orderInputCont w-2/5'>
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor='received'>Received:</label>
                        <input className="checkbox" name="received" id='received' type='checkbox' defaultChecked={false} {...register('received')}/>
                    </div>
                    <div className='orderInputContV'>
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor='reception_date'>Reception date:</label>
                        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id='reception_date' type='date' {...register('reception_date' , {valueAsDate:true})}/>
                    </div>
                </div>
               
                    <div className="orderInputCont justify-end">
                        <label className="text-sm/6 font-medium text-gray-900" htmlFor="price">Price:</label>
                        <input className="block w-1/4 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register('price' , {required: true , valueAsNumber:true})} id="price"/>
                    </div>
               
            </div>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Añadir
            </button>
        </form>
    )
}

export default OrderForm