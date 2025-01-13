import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

function AddImages ({colors , allColors , setCard , setCommon}) {
    const [open, setOpen] = useState(false);
    const [selectedColors , setSelectedColors] = useState([]);
    const {register , handleSubmit} = useForm();

    // console.log(allColors)

    const handleImages = (data) => {
        console.log(data);
        if (data.common_images.length > 0) {
            setCommon(data.common_images);
            console.log('set common')
        }

        if (data.card_image.length > 0) {
            setCard(data.card_image);
            console.log('set_card')
        }
    }

    useEffect (
        () => {
            let auxArray = []
            for (let color of allColors) {
                for (let color2 of colors) {
                    if (color2 === color.id) {
                        auxArray.push(color)
                    }
                }
            }
            // console.log(auxArray)
            return setSelectedColors(auxArray)
        } , [open]
    )

    return (
        <>
            <button className='btn-circle btn btn-sm btn-warning' onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faFileImage}/>
            </button>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
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
                                            Add Images
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Pick the images corresponding to the product's color and the common images in the "All" section (the ones that not depends on color)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-y-4">
                                    <div className='flex flex-row gap-4 items-center justify-between'>
                                        {/* <div>{color.code}</div> */}
                                        <div className='h-6 rounded-full'>Common</div>
                                        <input {...register('common_images')} id='common_images' name='common_images' type='file' multiple={true}/>
                                    </div>
                                    <div className='flex flex-row gap-4 items-center justify-between'>
                                        {/* <div>{color.code}</div> */}
                                        <div className='h-6 rounded-full'>Card</div>
                                        <input {...register('card_image' , {required:true})} id='card_image' name='card_image' type='file'/>
                                    </div>
                                {selectedColors.map(
                                    color => 
                                    <div className='flex flex-row gap-4 items-center'>
                                        {/* <div>{color.code}</div> */}
                                        <div className='w-6 h-6 rounded-full' style={{backgroundColor: color.code}}></div>
                                        <input type='file' multiple={true}/>
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleSubmit(handleImages)}
                                    className="inline-flex w-full bg-blue-600 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AddImages