import axios from "axios";
import { useForm } from "react-hook-form";

function AddColor ({setLoading}) {
    const {register , reset , handleSubmit} = useForm();

    const submit = (data) => {
        let URL = undefined;
        if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            URL = 'https://' + ip + '/api/v1/product_details/colors'
        } else {
            URL = 'https://localhost:443/api/v1/product_details/colors';
        }

        const defaultData = {
            'name': '',
            'code': ''
        }

        axios.post(URL , data)
            .then(res => {
                // console.log(res);
                reset(defaultData);
                setLoading(false);
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
        <button className="btn btn-circle btn-sm" onClick={()=>{document.getElementById('my_modal_1').showModal();setLoading(true)}}>+</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Color:</h3>       
                    <div className="modal-action">
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
                            {/* if there is a button in form, it will close the modal */}
                            <div className="rowForProduct2">
                                <button type="submit" className="btn" onClick={handleSubmit(submit)}>Añadir</button>
                                <button>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddColor