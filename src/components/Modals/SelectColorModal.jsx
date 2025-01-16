import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react"
import { useForm } from "react-hook-form";

function SelectColorModal ({setLoading , allColors , setSelectedColors , selectedColors}) {
    const [open , setOpen] = useState(false);
    const { register , handleSubmit } = useForm();

    // console.log(allColors)

    const submit3 = (data) => {
        console.log(data)
    }

    return (
        <>
        <div onClick={() => {setLoading(true);setOpen(true)}} className="select select-bordered select-sm w-full max-w-xs">Seleccionar</div>
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
                                                                Select Colors
                                                            </DialogTitle>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-y-4">
                                                    {allColors.map(color => 
                                                        <div key={color.id} className='flex flex-row gap-4 items-center justify-between'>
                                                            <label htmlFor={`${color.id}`} className='text-sm/6 font-medium text-gray-900'>{color.name}</label>
                                                            <input className="checkbox" {...register(`${color.id}`)} id={`${color.id}`} name={`${color.id}`} type='checkbox'/>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <span
                                                        type="button"
                                                        onClick={handleSubmit(submit3)}
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

export default SelectColorModal