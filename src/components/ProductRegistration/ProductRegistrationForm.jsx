import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import variables from "../../../utils/variables";
import AddColor from "../Modals/AddColor";
import AddMaterial from "../Modals/AddMaterial";
import AddImages from "../Modals/AddImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SelectColorModal from "../Modals/SelectColorModal";

function ProductRegistrationForm () {
    const navigate = useNavigate();
    //For useEffect
    const [myOrders , setMyOrders] = useState([]);
    const [mainCategories , setMainCategories] = useState([]);
    const [colors , setColors] = useState([]);
    const [materials , setMaterials] = useState([]);
    const [receptionDate , setReceptionDate] = useState();
    //For dynamic content
    const [received , setReceived] = useState(false);
    const [otherDetails , setOtherDetails] = useState(false);
    const [otherDetCont , setOtherDetCont] = useState(0);
    const [loading , setLoading] = useState(false);
    const [selectedColors , setSelectedColors] = useState([]);
    const [cardImage , setCardImage] = useState();
    const [commonImages , setCommonImages] = useState([]);
    const [colouredImages , setColouredImages] = useState({});
    const [ready , setReady ] = useState(false);
    const [deleted , setDeleted] = useState(false);

    const numbers = [1 , 2 , 3 , 4 , 5];
    const {register , handleSubmit , reset , getValues} = useForm();

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

    const submit = (data) => {
        setReady(true); 
        //Parse Data
        let newData = {};
        const keys = Object.keys(data);
        console.log("data is:" , data);

        if (cardImage && commonImages.length > 0) {
            
        } else {
            setReady(false);
            alert('Please upload all the required images');
            throw new Error('Please upload all the required images')
        }

        let otherDetailsData = []
        
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
        
        if (newData.order_id == undefined) {
            setReady(false);
            alert('Order number is required');
            throw new Error ('An order n° is required')
        }

        if (newData.main_category_id == undefined) {
            setReady(false);
            alert('Main category is required');
            throw new Error('Main category is required')
        }

        // Correct the inputs that have to be null when the product is not received
        if (!received) {
            for (let key of keys) {
                if (key === 'reception_date' || key === 'received_state' || key === 'observations' || key === 'quality' || key === 'fragility' || key === 'extra_packaging') {
                    newData[key] = undefined
                }
            }
        }

        // Set the corresponding reception date
        if (receptionDate) {
           for (let key of keys) {
            if (key === 'reception_date') {
                newData[key] = receptionDate
            }
            if (key === 'received') {
                newData[key] = true
            }
           }
        }

        // console.log(otherDetCont)
        for (let i=1 ; i <= otherDetCont ; i++) {
            let subData = []
            for (let key of keys) {
                if (key === `detName${i}`) {
                    // console.log(key)
                    subData.push(data[key])
                }
                if (key === `detDet${i}`) {
                    subData.push(data[key])
                }
            }
            // console.log(subData)
            otherDetailsData.push(subData)
        }

        if (otherDetailsData.length > 0) {
            newData['other_details'] = otherDetailsData
        }

        //Setting stocks
        let stocks = {};
        for (let key of keys) {
            if (selectedColors.length > 0) {
                if (key.includes('stock') && !key.includes('general')) {
                    stocks[key] = data[key]
                }
            } else {
                if (key.includes('general')) {
                    stocks[key] = data[key]
                }
            }
        };
        newData['stocks'] = stocks;

        //Setting images
        if (cardImage) {
            newData[`${data.name}_card`] = cardImage
        }

        if (commonImages.length > 0) {
            newData[`${data.name}_common`] = commonImages
        }

        let colouredImagesKeys = Object.keys(colouredImages);
        if (colouredImagesKeys.length > 0) {
           for (let key of colouredImagesKeys) {
            newData[`${data.name}_${key}`] = colouredImages[key]
           }
        }

        console.log("New data is:" , newData);
    
        let URL = variables.url_prefix + '/api/v1/admin/products';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/admin/products';
            // } else {
            //     URL = 'https://localhost:443/api/v1/admin/products';
            // }

        axios.post(URL , newData , {headers: {"Content-Type":'multipart/form-data'}})
            .then(res => {
                console.log(res);
                setReady(false);
                // navigate('/admin/my_orders')
            })
            .catch(err => {
                setReady(false)
                throw err
            })
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

    const deleteImage = async ( array , image) => {
        try {
            // console.log(array , image);
            let index = array.indexOf(image);
            array.splice(index , 1);
            return setDeleted(true)
        } catch (error) {
            throw error
        }
    }

    useEffect (
        () => {
            if (deleted) {
                setDeleted(false)
            }
            console.log('useEffect triggered' , selectedColors , colouredImages , `ready: ${ready}` , `loading: ${loading}` , `deleted: ${deleted}`);
            let URL = variables.url_prefix + '/api/v1/orders/my_orders';
            let URL2 = variables.url_prefix + '/api/v1/main_categories';
            let URL3 = variables.url_prefix + '/api/v1/product_details/colors';
            let URL4 = variables.url_prefix + '/api/v1/product_details/materials';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/orders/my_orders';
            //     URL2 = 'https://' + ip + '/api/v1/main_categories';
            //     URL3 = 'https://' + ip + '/api/v1/product_details/colors';
            //     URL4 = 'https://' + ip + '/api/v1/product_details/materials';
            // } else {
            //     URL = 'https://localhost:443/api/v1/orders/my_orders';
            //     URL2 = 'https://localhost:443/api/v1/main_categories';
            //     URL3 = 'https://localhost:443/api/v1/product_details/colors';
            //     URL4 = 'https://localhost:443/api/v1/product_details/materials';
            // }

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
                    setColors(res.data)
                })
                .catch(err => {
                    throw err
                })

            axios.get(URL4)
                .then(res => {
                    setMaterials(res.data)
                })
                .catch(err => {
                    throw err
                })
        } , [loading , selectedColors , colouredImages , commonImages , deleted , otherDetails , ready]
    )

    return (
        <form encType="multipart/form-data" className="productRegisterForm">
            <h2 className="text-base/7 font-semibold text-gray-900">Reception data:</h2>
            <div className="rowForProduct2">
                <div className="productInputCont">
                    <label htmlFor="order_id" className="text-sm/6 font-medium text-gray-900">Order N°: </label>
                    <select {...register('order_id' , {required:true})} onChange={selectedReceptionDate} id="order_id" className="select select-bordered select-sm w-full max-w-xs">
                        <option value={null}>Elige un pedido</option>  
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
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register('reception_date' , {valueAsDate:true})} disabled={!received} id="reception_date" name="reception_date" type="date"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="received_state" className="text-sm/6 font-medium text-gray-900">Received state:</label>
                    <textarea disabled={!received} {...register('received_state')} id="received_state" type="text" rows={3} className="textarea textarea-bordered text-sm"/>
                </div>
            </div>
            <div>
                <div className="productInputContV w-full">
                    <label htmlFor="observations" className="text-sm/6 font-medium text-gray-900">Observations:</label>
                    <textarea rows={3} {...register('observations')} disabled={!received} id='observations' type="text" className="textarea textarea-bordered text-sm self-stretch"/>
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
                    <input {...register('brand')} id='brand' type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="manufacturer" className="text-sm/6 font-medium text-gray-900">Manufacturer:</label>
                    <input {...register('manufacturer')} id="manufacturer" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="sold_by" className="text-sm/6 font-medium text-gray-900">Sold by:</label>
                    <input {...register('sold_by')} id="sold_by" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
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
                    <input id="bought_price" {...register('bought_price' , {valueAsNumber:true , required:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> 
                </div>
            </div>
            <div className="divider m-0"></div>
            
            <h2 className="text-base/7 font-semibold text-gray-900">Product data:</h2>
            <div className="rowForProduct2">
                <div className="productInputContV">
                    <label htmlFor="name" className="text-sm/6 font-medium text-gray-900">Name:</label>
                    <input {...register('name' , {required:true})} id="name" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="model" className="text-sm/6 font-medium text-gray-900">Model:</label>
                    <input {...register('model')} id="model" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
            </div>
            
            
            <div className="rowForProduct3">
                <div className="productInputContV">
                    <label htmlFor="height" className="text-sm/6 font-medium text-gray-900">Height (cm):</label>
                    <input {...register('height' , {valueAsNumber:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id="height"/> 
                </div>
                <div className="productInputContV">
                    <label htmlFor="length" className="text-sm/6 font-medium text-gray-900">Length (cm):</label>
                    <input {...register('length' , {valueAsNumber:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id="length"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="width" className="text-sm/6 font-medium text-gray-900">Width (cm):</label>
                    <input {...register('width' , {valueAsNumber:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" id="width" />
                </div>
            </div>
            <div>
                <div className="productInputContV w-full">
                    <label htmlFor="description" className="text-sm/6 font-medium text-gray-900">Description:</label>
                    <textarea rows={3} {...register('description' , {required:true})} className="textarea textarea-bordered text-sm self-stretch" id="description" type="text"/>
                </div>
            </div>
            
            <div>
                <div className="productInputCont w-full">
                    <label htmlFor="materials_ids" className="text-sm/6 font-medium text-gray-900">Materials:</label>
                    <select {...register('materials_ids')} id="materials_ids" multiple={true} className="select select-bordered select-sm w-52 max-w-xs">
                        {/* <option value={null}>Elige los materiales</option> */}
                        {materials?.map(
                            material => <option key={material.id} value={material.id}>{material.name}</option>
                        )}
                    </select>
                    <AddMaterial setLoading={setLoading}/>
                </div>
            </div>

                <div className="productInputContV gap-3">
                    <div className="productInputCont">
                        <label htmlFor="other_details" className="text-sm/6 font-medium text-gray-900">Other details:</label>
                        <input type="checkbox" id="other_details" className="checkbox" defaultChecked={false} onChange={toggleOtherDet}/>
                    </div>
                    <div className="productInputContV gap-2">
                        {Array(otherDetCont).fill(null).map(
                            ( value , index) => <div key={index+1} className="productInputCont">
                            <input id={`detName${index+1}`} {...register(`detName${index+1}` , {required:true})} placeholder="Nombre" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                            :
                            <input id={`detDet${index+1}`} {...register(`detDet${index+1}` , {required:true})} placeholder="Detalle" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                            {index+1 == otherDetCont ? 
                                <span className="btn btn-circle btn-sm" onClick={otherDetContplus}>+</span>
                            :
                                <span className="btn btn-circle btn-sm" onClick={otherDetContMinus}>-</span>
                                }
                        </div>
                        )}
                    </div>
                </div>

            <div className="productInputCont">
                <label htmlFor="colors_ids" className="text-sm/6 font-medium text-gray-900">Colors:</label>
                <SelectColorModal allColors={colors} selectedColors={selectedColors} setLoading={setLoading} setSelectedColors={setSelectedColors} setColoured={setColouredImages}/>

                <AddColor setLoading={setLoading}/>
            </div>

            <div>
                {selectedColors.length > 0?
                    <div className="flex flex-col gap-2">
                        <label className="text-sm/6 font-medium text-gray-900">Stock:</label>
                        <div className="flex flex-col gap-2 items-center">
                            {selectedColors.map(
                                color => 
                                    <div key={color.id} className="flex flex-row justify-between w-1/2">
                                        <label htmlFor={`${color.id}_stock`} className="text-sm/6 font-medium text-gray-900">{color.name}:</label>
                                        <input id={`${color.id}_stock`} name={`${color.id}_stock`} {...register(`${color.id}_stock` , {valueAsNumber:true})} className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="number"/>
                                    </div>
                            )}
                        </div>
                    </div>
                :
                    <div className="flex flex-row w-1/2 justify-between justify-self-center">
                        <label htmlFor="general_stock" className="text-sm/6 font-medium text-gray-900">Stock:</label>
                        <input {...register('general_stock' , {valueAsNumber:true})} id="general_stock" name="general_stock" className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="number"/>
                    </div>
                }
            </div>
           
           <div className="flex flex-col border border-gray-300 rounded-md px-3 py-2 gap-2">
                <div>
                    <label className="text-sm/6 font-medium text-gray-900">Card Image:</label>
                    {cardImage?
                        <div className="flex flex-row justify-center">
                            <div className="flex flex-row justify-between items-center w-2/3">
                                <img className="h-20 object-contain" src={URL.createObjectURL(cardImage)}/>
                                <span onClick={() => {setCardImage()}} className="btn-circle btn btn-sm btn-error">
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </span>
                            </div>
                        </div>
                    :
                        <div className="flex flex-row justify-between items-center">
                            <span>No image</span>
                            <AddImages image_type={'card'} setLoading={setLoading} setCard={setCardImage} setCommon={setCommonImages} setColoured={setColouredImages}/>
                        </div>
                    }
                </div>
                <div>
                    <label className="text-sm/6 font-medium text-gray-900">Common Images:</label>
                    {commonImages.length > 0?
                        <div className="flex flex-col items-center gap-2">
                            {commonImages?.map(common_image =>
                                <div key={common_image.lastModified} className="flex flex-row justify-between items-center w-2/3">
                                    <img className="h-20 object-contain" src={URL.createObjectURL(common_image)}/>
                                    <span onClick={() => {deleteImage( commonImages , common_image)}} className="btn-circle btn btn-sm btn-error">
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </span>
                                </div>
                            )}
                            <AddImages image_type={'common'} setLoading={setLoading} setCard={setCardImage} common={commonImages} setCommon={setCommonImages}setColoured={setColouredImages}/>
                        </div>
                    :
                        <div className="flex flex-row justify-between items-center">
                            <span>No images</span>
                            <AddImages image_type={'common'} setLoading={setLoading} setCard={setCardImage} common={commonImages} setCommon={setCommonImages} setColoured={setColouredImages}/>
                        </div>
                    }
                </div>
                
                {selectedColors?.length > 0?
                    
                        selectedColors.map(selectedColor => 
                            <div key={selectedColor.id}>
                                <label className="text-sm/6 font-medium text-gray-900">{`${selectedColor.name} images:`}</label>
                                {colouredImages[selectedColor.id].length > 0?
                                 <div className="flex flex-col items-center gap-2">
                                    {colouredImages[selectedColor.id]?.map(coloured_image =>
                                        <div key={coloured_image.lastModified} className="flex flex-row justify-between items-center w-2/3">
                                            <img className="h-20 object-contain" src={URL.createObjectURL(coloured_image)}/>
                                            <span onClick={() => {deleteImage(colouredImages[selectedColor.id] , coloured_image)}} className="btn-circle btn btn-sm btn-error">
                                                <FontAwesomeIcon icon={faTrashCan}/>
                                            </span>
                                        </div>
                                    )}
                                    <AddImages image_type={`${selectedColor.id}`} setLoading={setLoading} setCard={setCardImage} common={commonImages} setCommon={setCommonImages} coloured={colouredImages} setColoured={setColouredImages}/>
                                 </div> 
                                 : 
                                 <div className="flex flex-row justify-between items-center">
                                    <span>No images</span>
                                    <AddImages image_type={`${selectedColor.id}`} setLoading={setLoading} setCard={setCardImage} common={commonImages} setCommon={setCommonImages} coloured={colouredImages} setColoured={setColouredImages}/>
                                </div>
                                }
                            </div>
                        )
                    
                        :
                    <span className="text-sm/6 font-medium text-gray-900">No selected colors</span>
                }
                
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
                        <option value={undefined}>Elige una categoría</option> 
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
                    <input {...register('discount' , {valueAsNumber:true , value:0})} id="discount" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
                <div className="productInputContV">
                    <label htmlFor="allow_reservation" className="text-sm/6 font-medium text-gray-900">Allow reservation:</label>
                    <input {...register('allow_reservation')} id="allow_reservation" type="checkbox" className="checkbox" defaultChecked={false}/>
                </div>
            </div>
            <div className="rowForProduct2">
                <div className="productInputCont">
                    <label htmlFor="for_sale" className="text-sm/6 font-medium text-gray-900">For sale:</label>
                    <input {...register('for_sale')} id="for_sale" defaultChecked={true} type="checkbox" className="checkbox"/>
                </div>
                <div className="productInputCont">
                    <label htmlFor="price" className="text-sm/6 font-medium text-gray-900">Price:</label>
                    <input {...register('price' , {valueAsNumber:true , required:true})} id="price" className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div> 
            </div>
            <button type="submit" onClick={handleSubmit(submit)} disabled={ready} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {ready? <span className="loading loading-infinity loading-md"></span> : 'Registrar'}
            </button>
        </form>
    )
}

export default ProductRegistrationForm