import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

function AddImages ({image_type , setLoading , setCard , common , setCommon , coloured , setColoured}) {
    const [open, setOpen] = useState(false);
    const {register , handleSubmit} = useForm();

    const handleImages = (data) => {
        console.log(data);

        if (image_type == 'common') {
            console.log('set common');
            let aux = common;
            aux.push(data.common_image[0]);
            setCommon(aux);
            setLoading(false);
            return setOpen(false)
        } else if (image_type == 'card') {
            console.log('set card');
            setCard(data.card_image[0]);
            setLoading(false);
            return setOpen(false)
        } else {
            //If the file is none of the above then we proceed with color related images
            console.log(`set ${image_type}`);
            let aux = coloured;
            aux[image_type].push(data[`${image_type}_image`][0])
            setColoured(aux);
            setLoading(false);
            return setOpen(false)  
        }

    }

    useEffect (
        () => {
    
        } , []
    )

    return (
        <>
            <span className='btn-circle btn btn-sm btn-warning' onClick={() =>{setLoading(true);setOpen(true)}}>
                <FontAwesomeIcon icon={faFileImage}/>
            </span>
            <Dialog open={open} onClose={() =>{setLoading(false);setOpen(false)}} className="relative z-50">
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
                                   
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            {`Add a ${image_type} image`}
                                        </DialogTitle>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 gap-y-4">
                                               
                                <input {...register(`${image_type}_image` , {required:true})} id={`${image_type}_image`} name={`${image_type}_image`} type='file'/>
                                    
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <span
                                    type="button"
                                    onClick={handleSubmit(handleImages)}
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

export default AddImages