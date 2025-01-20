import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import variables from "../../../utils/variables";

function AddMaterial ({setLoading}) {
    const [open , setOpen] = useState(false);
    const {register , handleSubmit , reset} = useForm();

    const submitMaterial = data => {
        let URL = variables.url_prefix + '/api/v1/product_details/materials';
        // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
        //     URL = 'https://' + ip + '/api/v1/product_details/materials'
        // } else {
        //     URL = 'https://localhost:443/api/v1/product_details/materials';
        // }

        const keys = Object.keys(data);
        let newData = {};

        for (let key of keys) {
            if (key === 'material_name') {
                newData['name'] = data[key]
            }
        }

        const defaultData = {
            'material_name': ''
        }

        axios.post(URL , newData)
            .then(res => {
                // console.log(res);
                reset(defaultData);
                setOpen(false);
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
            <span className='btn-circle btn btn-sm btn-warning' onClick={() => {setLoading(true);setOpen(true)}}>
                        <FontAwesomeIcon icon={faPlus} />
            </span>
                                    <Dialog open={open} onClose={() => {setLoading(false);setOpen(false)}} className="relative z-50">
                                        <DialogBackdrop
                                            transition
                                            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                                        />
                        
                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                            <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
                                                <DialogPanel
                                                    transition
                                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                                >
                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-warning sm:mx-0 sm:size-10">
                                                                <FontAwesomeIcon icon={faFileImage}/>
                                                            </div> */}
                                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                                    Add Colors
                                                                </DialogTitle>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">
                                                                        Create more colors if needed
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-y-4">
                                                            <div className='flex flex-row gap-4 items-center justify-between'>
                                                                {/* <div>{color.code}</div> */}
                                                                <label htmlFor="material_name" className='text-sm/6 font-medium text-gray-900'>Name:</label>
                                                                <input className="input input-bordered w-full max-w-xs text-sm" {...register('material_name' , {required:true})} id='material_name' name='material_name' type='text'/>
                                                            </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <span
                                                            type="button"
                                                            onClick={handleSubmit(submitMaterial)}
                                                            className="inline-flex w-full bg-blue-600 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                        >
                                                            Add
                                                        </span>
                                                        <span
                                                            type="button"
                                                            data-autofocus
                                                            onClick={() => {setLoading(false);setOpen(false)}}
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        >
                                                            Cancel
                                                        </span>
                                                    </div>
                                                </DialogPanel>
                                            </div>
                                        </div>
                                    </Dialog>
        </>
    )
}

export default AddMaterial