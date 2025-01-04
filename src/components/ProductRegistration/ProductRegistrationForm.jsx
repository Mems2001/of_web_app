import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import variables from "../../../utils/variables";

function ProductRegistrationForm () {
    const [myOrders , setMyOrders] = useState([]);
    const [mainCategories , setMainCategories] = useState([]);
    const [colors , setColors] = useState([]);
    const [materials , setMaterials] = useState([]);
    const [receptionDate , setReceptionDate] = useState();
    const [received , setReceived] = useState(false);
    const [otherDetails , setOtherDetails] = useState(false);
    const [otherDetCont , setOtherDetCont] = useState(0);
    const navigate = useNavigate();
    const ip = variables.ip;

    const numbers = [1 , 2 , 3 , 4 , 5];
    const {register , handleSubmit , reset} = useForm();

    const selectedReceptionDate = (e) => {
        for (let order of myOrders) {
            if (e.target.value === order.id) {
                if (order.receptionDate) {
                    return setReceptionDate(order.receptionDate)
                } else {
                    return setReceptionDate(null)
                }
            }

            setReceptionDate(null)
        } 
    }

    const submit = data => {
        console.log(data)

        let URL = undefined
            if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                URL = 'https://' + ip + '/api/v1/admin/products';
            } else {
                URL = 'https://localhost:443/api/v1/admin/products';
            }

        axios.post(URL , data)
            .then(res => {
                // console.log(res)
                navigate('/admin/my_orders')
            })
            .catch(err => {
                throw err
            })
    }

    const parseData = data => {
        let newData = {};
        const keys = Object.keys(data);
        console.log("data is:" , data);
        // console.log(keys);

        for (let key of keys) {
            if (data[key] != '' && data[key] != 'Elige un pedido' && data[key] != 'Elige una categoría' && data[key] != 'Elige un color' && data[key] != 'Elige un número' && data[key] != NaN && data[key] != undefined && !(key.includes('detName')) && !(key.includes('detDet'))) {
                if (data[key] === "false") {
                    // console.log(key , 'is string false');
                    newData[key] = true    
                } else {
                    newData[key] = data[key]
                }
            } else {
                newData[key] = undefined
            }
        };

        // console.log("New data is:" , newData);
        return submit(newData)
    }

    const handleReception = (e) => {
        // console.log(e.target.checked)
        setReceived(e.target.checked)
    }

    const toggleOtherDet = (e) => {
        setOtherDetails(e.target.checked);
        if (otherDetails) {
            setOtherDetCont(0)
        } else {
            setOtherDetCont(1)
        }
    }

    const otherDetContplus = () => {
        setOtherDetCont(otherDetCont + 1)
    }

    const otherDetContMinus = () => {
        setOtherDetCont(otherDetCont - 1)
    }

    useEffect (
        () => {
            let URL = undefined;
            let URL2 = undefined;
            let URL3 = undefined;
            let URL4 = undefined;
            if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                URL = 'https://' + ip + '/api/v1/orders/my_orders';
                URL2 = 'https://' + ip + '/api/v1/main_categories';
                URL3 = 'https://' + ip + '/api/v1/product_details/colors';
                URL4 = 'https://' + ip + '/api/v1/product_details/materials';
            } else {
                URL = 'https://localhost:443/api/v1/orders/my_orders';
                URL2 = 'https://localhost:443/api/v1/main_categories';
                URL3 = 'https://localhost:443/api/v1/product_details/colors';
                URL4 = 'https://localhost:443/api/v1/product_details/materials';
            }

            axios.get(URL)
                .then(res => {
                    // console.log(res.data.data);
                    setMyOrders(res.data.data);
                    // console.log(myOrders);
                })
                .catch(err => {
                    throw err
                })

            axios.get(URL2)
                .then(res => {
                    // console.log(res);
                    setMainCategories(res.data.data);
                    // console.log(mainCategories)
                })
                .catch(err => {
                    throw err
                })

            axios.get(URL3)
                .then(res => {
                    setColors(res.data.data)
                })
                .catch(err => {
                    throw err
                })

            axios.get(URL4)
                .then(res => {
                    setMaterials(res.data.data)
                })
                .catch(err => {
                    throw err
                })
            
        } , []
    )

    return (
        <form className="productRegisterForm" onSubmit={handleSubmit(parseData)}>
            <h2 className="text-base/7 font-semibold text-gray-900">Reception data:</h2>
            <div className="rowForProduct2">
                <div className="productInputCont">
                    <label htmlFor="order_id" className="text-sm/6 font-medium text-gray-900">Order N°: </label>
                    <select {...register('order_id' , {required:true})} onChange={selectedReceptionDate} id="order_id" className="select select-bordered select-sm w-full max-w-xs">
                        <option value={undefined}>Elige un pedido</option>  
                        {myOrders?.map(
                            order => <option key={order.id} value={order.id}>{order.orderCount}</option>)
                        }
                    </select>
                </div>
                <div className="productInputCont">
                    <label htmlFor="received" className="text-sm/6 font-medium text-gray-900" >Received:</label>
                    <input {...register('received')} onChange={handleReception} className="checkbox" id='received' type="checkbox" defaultValue={false}/>
                </div>
            </div>
            <div className="rowForProduct2">
                <div className="productInputContV">
                    <label htmlFor="reception_date" className="text-sm/6 font-medium text-gray-900">Reception date:</label>
                    <input {...register('reception_date' , {valueAsDate:true})} value={receptionDate? receptionDate : ''} disabled={!received} id="reception_date" type="date"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="received_state" className="text-sm/6 font-medium text-gray-900">Received state:</label>
                    <textarea disabled={!received} {...register('received_state')} id="received_state" type="text" rows={3} className="textarea textarea-bordered text-sm"/>
                </div>
            </div>
            <div>
                <div className="productInputContV">
                    <label htmlFor="observations" className="text-sm/6 font-medium text-gray-900">Observations:</label>
                    <textarea rows={3} {...register('observations')} disabled={!received} id='observations' type="text" className="textarea textarea-bordered text-sm"/>
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="quality" className="text-sm/6 font-medium text-gray-900">Quality:</label>
                    <select {...register('quality' , {valueAsNumber:true})} disabled={!received} id="quality" className="select select-bordered select-sm w-full max-w-xs">
                        <option value={null}>Elige un número</option>
                        {numbers.map(
                            number => <option key={number} value={number}>{number}</option>
                        )}
                    </select>
                </div>
                <div className="productInputContV">
                    <label htmlFor="fragility" className="text-sm/6 font-medium text-gray-900">Fragility:</label>
                    <select {...register('fragility' , {valueAsNumber:true})} disabled={!received} className="select select-bordered select-sm w-full max-w-xs" id="fragility">
                    <option value={null}>Elige un número</option>
                    {numbers.map(
                            number => <option key={number} value={number}>{number}</option>
                        )}
                    </select>
                </div>
                <div className="productInputContV">
                    <label htmlFor="extra_packaging" className="text-sm/6 font-medium text-gray-900">Extra packaging:</label>
                    <input {...register('extra_packaging')} disabled={!received} id="extra_packaging" type="checkbox" className="checkbox" defaultValue={false} />
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="brand" className="text-sm/6 font-medium text-gray-900">Brand:</label>
                    <input {...register('brand')} id='brand' type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="manufacturer" className="text-sm/6 font-medium text-gray-900">Manufacturer:</label>
                    <input {...register('manufacturer')} id="manufacturer" type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="sold_by" className="text-sm/6 font-medium text-gray-900">Sold by:</label>
                    <input {...register('sold_by')} id="sold_by" type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="bought_free" className="text-sm/6 font-medium text-gray-900">Bought free:</label>
                    <input id="bought_free" type="checkbox" className="checkbox" defaultChecked={false} {...register('bought_free')}/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="bought_discount" className="text-sm/6 font-medium text-gray-900">Bought with discount:</label>
                    <input id="bought_discount" type="checkbox" className="checkbox" defaultChecked={false} {...register('bought_discount')}/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="bought_price" className="text-sm/6 font-medium text-gray-900">Bought price:</label>
                    <input id="bought_price" {...register('bought_price' , {valueAsNumber:true})} className="input input-bordered w-full max-w-xs text-sm"/> 
                </div>
            </div>
            <div className="divider m-0"></div>
            
            <h2 className="text-base/7 font-semibold text-gray-900">Product data:</h2>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="name" className="text-sm/6 font-medium text-gray-900">Name:</label>
                    <input {...register('name' , {required:true})} id="name" type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="model" className="text-sm/6 font-medium text-gray-900">Model:</label>
                    <input {...register('model')} id="model" type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="color_id" className="text-sm/6 font-medium text-gray-900">Colors:</label>
                    <select {...register('color_id' , {required:true})} id="color_id" className="select select-bordered select-sm w-full max-w-xs">
                        <option value={null}>Elige un color</option>
                        {colors?.map(
                            color => <option key={color.id} value={color.id}>{color.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="height" className="text-sm/6 font-medium text-gray-900">Height (cm):</label>
                    <input {...register('height' , {valueAsNumber:true})} className="input input-bordered w-full max-w-xs text-sm" id="height"/> 
                </div>
                <div className="productInputContV">
                    <label htmlFor="length" className="text-sm/6 font-medium text-gray-900">Length (cm):</label>
                    <input {...register('length' , {valueAsNumber:true})} className="input input-bordered w-full max-w-xs text-sm" id="length"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="width" className="text-sm/6 font-medium text-gray-900">Width (cm):</label>
                    <input {...register('width' , {valueAsNumber:true})} className="input input-bordered w-full max-w-xs text-sm" id="width" />
                </div>
            </div>
            <div className="rowForProduct2">
                <div className="productInputContV">
                    <label htmlFor="description" className="text-sm/6 font-medium text-gray-900">Description:</label>
                    <textarea rows={3} {...register('description')} className="textarea textarea-bordered text-sm" id="description" type="text"/>
                </div>
                <div className="productInputContV">
                    <div className="productInputCont">
                        <label htmlFor="other_details" className="text-sm/6 font-medium text-gray-900">Other details:</label>
                        <input type="checkbox" id="other_details" className="checkbox" defaultChecked={false} onChange={toggleOtherDet}/>
                    </div>
                    <div className="productInputContV">
                        {Array(otherDetCont).fill(null).map(
                            ( value , index) => <div key={index+1} className="productInputCont">
                            <input id={`detName${index+1}`} {...register(`detName${index+1}` , {required:true})} placeholder="Nombre" className="input input-bordered w-full max-w-xs text-sm"/>
                            :
                            <input id={`detDet${index+1}`} {...register(`detDet${index+1}` , {required:true})} placeholder="Detalle" className="input input-bordered w-full max-w-xs text-sm"/>
                            {index+1 == otherDetCont ? 
                                <button onClick={otherDetContplus}>+</button>
                            :
                                <button onClick={otherDetContMinus}>-</button>
                                }
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="rowForProduct2">
                <div className="productInputContV">
                    <label htmlFor="materials_ids" className="text-sm/6 font-medium text-gray-900">Materials:</label>
                    <select {...register('materials_ids')} id="materials_ids" multiple={true} className="select select-bordered select-sm w-52 max-w-xs">
                        {/* <option value={null}>Elige los materiales</option> */}
                        {materials?.map(
                            material => <option key={material.id} value={material.id}>{material.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="authenticated" className="text-sm/6 font-medium text-gray-900">Authenticated:</label>
                    <input {...register('authenticated')} className="checkbox" id="authenticated" defaultChecked={false} type="checkbox"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="deco_only" className="text-sm/6 font-medium text-gray-900">Decorative only:</label>
                    <input {...register('deco_only')} className="checkbox" id="deco_only" defaultChecked={false} type="checkbox"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="is_seasonal" className="text-sm/6 font-medium text-gray-900">Seasonal:</label>
                    <input {...register('is_seasonal')} className="checkbox" id="is_seasonal" defaultChecked={false} type="checkbox" />
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="is_original" className="text-sm/6 font-medium text-gray-900">Original:</label>
                    <input {...register('is_original')} className="checkbox" id='is_original' defaultChecked={false} type="checkbox"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="is_trending" className="text-sm/6 font-medium text-gray-900">Trending:</label>
                    <input {...register('is_trending')} className="checkbox" id="is_trending" defaultChecked={false} type="checkbox"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="is_gift" className="text-sm/6 font-medium text-gray-900">Gift:</label>
                    <input {...register('is_gift')} className="checkbox" id="is_gift" defaultChecked={false} type="checkbox"/>
                </div>
            </div>
            <div className="rowForProduct2">
                <div className="productInputContV">
                    <label htmlFor="main_category_id" className="text-sm/6 font-medium text-gray-900">Main Category:</label>
                    <select {...register('main_category_id' , {required:true})} id="main_category_id" className="select select-bordered select-sm w-52 max-w-xs">
                        <option value={undefined} disabled={true} hidden={true}>Elige una categoría</option> 
                        {mainCategories?.map(
                            category => <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </select>
                </div>
                <div className="productInputContV">
                    <label htmlFor="subcategories_ids" className="text-sm/6 font-medium text-gray-900">Subcategories:</label>
                    <select {...register('subcategories_ids')} id="subcategories_ids" multiple={true} className="select select-bordered select-sm w-52 max-w-xs"></select>
                </div>
            </div>
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="promo_id" className="text-sm/6 font-medium text-gray-900">Promo:</label>
                    <select {...register('promo_id')} id="promo_id" className="select select-bordered select-sm w-52 max-w-xs"></select>
                </div>
                <div className="productInputContV">
                    <label htmlFor="discount" className="text-sm/6 font-medium text-gray-900">Discount:</label>
                    <input {...register('discount' , {valueAsNumber:true , value:0})} id="discount" className="input input-bordered w-full max-w-xs text-sm"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="allow_reservation" className="text-sm/6 font-medium text-gray-900">Allow reservation:</label>
                    <input {...register('allow_reservation')} id="allow_reservation" type="checkbox" className="checkbox" defaultChecked={false}/>
                </div>
            </div>
            <div className="rowForProduct2">
                <div className="productInputCont">
                    <label htmlFor="market_testing" className="text-sm/6 font-medium text-gray-900">Market Testing:</label>
                    <input {...register('market_testing')} id="market_testing" defaultChecked={false} type="checkbox" className="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="price" className="text-sm/6 font-medium text-gray-900">Price:</label>
                    <input {...register('price' , {valueAsNumber:true , required:true})} id="price" className="input input-bordered w-full max-w-xs text-sm"/>
                </div> 
            </div>
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Registrar
            </button>
        </form>
    )
}

export default ProductRegistrationForm