import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";

function AddMaterial ({setLoading}) {
    const [modal , setModal] = useState();
    const {register , handleSubmit , reset} = useForm();

    const submit2 = data => {
        let URL = undefined;
        if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            URL = 'https://' + ip + '/api/v1/product_details/materials'
        } else {
            URL = 'https://localhost:443/api/v1/product_details/materials';
        }

        const defaultData = {
            'name': ''
        }

        axios.post(URL , data)
            .then(res => {
                console.log(res);
                reset(defaultData);
                setModal(false);
                setLoading(false);
            })
            .catch(err => {
                throw({
                    location: 'AddMaterial component',
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
                        <h3 className="font-bold text-lg">Add New Material:</h3>
                        <button className="btn btn-circle btn-sm" onClick={() => {
                            setModal(false);
                        setLoading(false)}}>x</button>
                    </div>
                    <form>
                        <div className="rowForProduct2">
                            <div className="productInputContV">
                                <label htmlFor="material_name" className="text-sm/6 font-medium text-gray-900">Name:</label>
                                <input {...register('name')} id="material_name" type="text" className="input input-bordered w-full max-w-xs text-sm"/>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn" onClick={handleSubmit(submit2)}>Añadir</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMaterial