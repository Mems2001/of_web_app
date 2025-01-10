import axios from "axios";
import { useForm } from "react-hook-form";
import variables from "../../../utils/variables";
import { useState } from "react";

function AddColor ({setLoading}) {
    const {register , reset , handleSubmit} = useForm();
    const [modal , setModal] = useState(false);

    const submit = (data) => {
        let URL = variables.url_prefix + '/api/v1/product_details/colors';
        // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
        //     URL = 'https://' + ip + '/api/v1/product_details/colors'
        // } else {
        //     URL = 'https://localhost:443/api/v1/product_details/colors';
        // }

        const defaultData = {
            'name': '',
            'code': ''
        }

        axios.post(URL , data)
            .then(res => {
                // console.log(res);
                reset(defaultData);
                setLoading(false);
                setModal(false)
            })
            .catch(err => {
                throw({
                    location: 'AddColor component',
                    err
                })
            })
    }

    return (
        <>
            {/* The button to open modal */}
            <button className="btn btn-circle btn-sm" onClick={()=>{
                setModal(true);
                setLoading(true)}}>+</button>

            {/* Put this part before </body> tag */}
            <input type="checkbox" className="modal-toggle" checked={modal}/>
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div className="flex flex-row justify-between w-full">
                        <h3 className="font-bold text-lg">Add New Color:</h3>
                        <button className="btn btn-circle btn-sm" onClick={() =>{
                            setModal(false);
                            setLoading(false)
                        }}>x</button>
                    </div>
                    <form method="dialog">
                        <div className="rowForProduct2">
                            <div className="productInputContV">
                                <label htmlFor="color_name" className="text-sm/6 font-medium text-gray-900">Name:</label>
                                <input {...register('name')} id="color_name" type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                            </div>
                            <div>
                                <label htmlFor="color_code" className="text-sm/6 font-medium text-gray-900">Code:</label>
                                <input {...register('code')} id="color_code" type="color" className="input input-bordered w-full max-w-xs text-sm"/>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn" onClick={handleSubmit(submit)}>Añadir</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddColor