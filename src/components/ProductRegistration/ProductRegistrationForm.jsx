import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

function ProductRegistrationForm () {
    const [myOrders , setMyOrders] = useState([]);
    const [mainCategories , setMainCategories] = useState([]);
    const numbers = [1 , 2 , 3 , 4 , 5];
    const {register , handleSubmit , reset} = useForm();

    const submit = data => {
        const URL = 'http://localhost:8000/api/v1/products'

        axios.post(URL , data)
            .then(res => {
                // console.log(res)
            })
            .catch(err => {
                throw err
            })
    }

    const parseData = data => {
        let newData = {};
        const keys = Object.keys(data);
        // console.log("data is:" , data);
        // console.log(keys);

        for (let key of keys) {
            if (data[key].length != 0 && data[key] != 'Elige un pedido' && data[key] != 'Elige una categoría' && data[key] != NaN) {
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
        submit(newData)
    }

    useEffect (
        () => {
            const URL = 'http://localhost:8000/api/v1/orders/my_orders';
            const URL2 = 'http://localhost:8000/api/v1/main_categories';

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
            
        } , []
    )

    return (
        <form className="productRegisterForm" onSubmit={handleSubmit(parseData)}>
            <h3>Reception data:</h3>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="order_id">Order N°: </label>
                    <select {...register('order_id')} id="order_id">
                        <option value={undefined}>Elige un pedido</option>  
                        {myOrders?.map(
                            order => <option key={order.id} value={order.id}>{order.orderCount}</option>)
                        }
                    </select>
                </div>
                <div className="productInputCont">
                    <label htmlFor="received">Received:</label>
                    <input {...register('received')} id='received' type="checkbox" defaultValue={false}/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="quality">Quality:</label>
                    <select {...register('quality' , {valueAsNumber:true})} id="quality">
                        {numbers.map(
                            number => <option key={number} value={number}>{number}</option>
                        )}
                    </select>
                </div>
                <div className="productInputCont">
                    <label htmlFor="fragility">Fragility:</label>
                    <select {...register('fragility' , {valueAsNumber:true})} id="fragility">
                    {numbers.map(
                            number => <option key={number} value={number}>{number}</option>
                        )}
                    </select>
                </div>
                <div className="productInputCont">
                    <label htmlFor="extra_packaging">Extra packaging:</label>
                    <input {...register('extra_packaging')} id="extra_packaging" type="checkbox" defaultValue={false} />
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="received_state">Received state:</label>
                    <input {...register('received_state')} id="received_state" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="observations">Observations:</label>
                    <input {...register('observations')} id='observations' type="text"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputContV">
                    <label htmlFor="brand">Brand:</label>
                    <input {...register('brand')} id='brand' type="text"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input {...register('manufacturer')} id="manufacturer" type="text"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="sold_by">Sold by:</label>
                    <input {...register('sold_by')} id="sold_by" type="text"/>
                </div>
            </div>
            
            <h3>Product data:</h3>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="name">Name:</label>
                    <input {...register('name' , {required:true})} id="name" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="model">Model:</label>
                    <input {...register('model')} id="model" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="color_id">Color:</label>
                    <select {...register('color_id')} id="color_id"></select>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="height">Height:</label>
                    <input {...register('height' , {valueAsNumber:true})} id="height"/> 
                </div>
                <div className="productInputCont">
                    <label htmlFor="length">Length:</label>
                    <input {...register('length' , {valueAsNumber:true})} id="length"/>
                </div>
                <div className="productInputCont">
                    <label className="width">Width:</label>
                    <input {...register('width' , {valueAsNumber:true})} id="width" />
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputcCont">
                    <label htmlFor="description">Description:</label>
                    <input {...register('description')} id="description" type="text"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="other_details">Other details:</label>
                    <input {...register('other_details')} id="other_details"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="materials_ids">Materials:</label>
                    <select {...register('materials_ids')} id="materials_ids" multiple={true}></select>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="authenticated">Authenticated:</label>
                    <input {...register('authenticated')} id="authenticated" defaultValue={false} type="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="deco_only">Decorative only:</label>
                    <input {...register('deco_only')} id="deco_only" defaultValue={false} type="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="is_seasonal">Seasonal:</label>
                    <input {...register('is_seasonal')} id="is_seasonal" defaultValue={false} type="checkbox" />
                </div>
            </div>
            <div className="rowForProduct">
                <div>
                    <label htmlFor="original">Orginal:</label>
                    <input {...register('original')} id='original' defaultValue={false} type="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="is_trending">Trending:</label>
                    <input {...register('is_trending')} id="is_trending" defaultValue={false} type="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="is_gift">Gift:</label>
                    <input {...register('is_gift')} id="is_gift" defaultValue={false} type="checkbox"/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="main_category_id">Main Category:</label>
                    <select {...register('main_category_id' , {required:true})} id="main_category_id">
                        <option value={undefined}>Elige una categoría</option> 
                        {mainCategories?.map(
                            category => <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </select>
                </div>
                <div className="productInputCont">
                    <label htmlFor="subcategories_ids">Subcategories:</label>
                    <select {...register('subcategories_ids')} id="subcategories_ids" multiple={true}></select>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="promo_id">Promo:</label>
                    <select {...register('promo_id')} id="promo_id"></select>
                </div>
                <div className="productInputCont">
                    <label htmlFor="discount">Discount:</label>
                    <input {...register('discount' , {valueAsNumber:true})} id="discount"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="allow_reservation">Allow reservation:</label>
                    <input {...register('allow_reservation')} id="allow_reservation" type="checkbox" defaultValue={false}/>
                </div>
            </div>
            <div className="rowForProduct">
                <div className="productInputCont">
                    <label htmlFor="market_testing">Market Testing:</label>
                    <input {...register('market_testing')} id="market_testing" defaultValue={false} type="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="price">Price:</label>
                    <input {...register('price' , {valueAsNumber:true , required:true})} id="price"/>
                </div> 
            </div>
            <button>
                Registrar
            </button>
        </form>
    )
}

export default ProductRegistrationForm