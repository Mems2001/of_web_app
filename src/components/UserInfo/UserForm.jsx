import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../store/slices/profile.slice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import variables from "../../../utils/variables";

function UserForm () {
    // const ip = variables.ip;
    const profile = useSelector(state => state.profileSlice)
    const [edition , setEdition] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {register , handleSubmit , reset} = useForm();

    const handleEdition = (data) => {
        if (edition) {
            setIsLoading(true)
            let URL = variables.url_prefix + '/api/v1/profiles/' + profile.id;
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/profiles/' + profile.id;
            // } else {
            //     URL = 'https://localhost:443/api/v1/profiles/' + profile.id;
            // }
            // console.log(newProfile , URL);
            axios.put(URL , data)
                .then(res => {
                    // console.log(res);
                    dispatch(setProfile(res.data.data.updatedProfile));
                })
                .catch(err => {
                    console.log(err)
                })
            setIsLoading(false)
            setEdition(false)
        } else {
            setEdition(true)
        }
    }

    const submit = data => {
        // console.log(Object.keys(data));
        const keys = Object.keys(data);
        let newData = {};
        for ( let key of keys) {
            // console.log("Data is:" , key , data[key]);
            if (data[key] != '' || data[key].length != 0) {
                newData[key] = data[key]
            } else {
                // console.log(key , 'vacío')
                newData[key] = undefined
            }
        }
        // console.log("new data is:" , newData);
        handleEdition(newData)
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-5 w-4/5">
            <div className="flex flex-col items-center gap-y-3">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">{profile?.userName}</h2>
            </div>
            <div className="userFormCont2 space-y-2">
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="user_name">Username:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.userName} autoComplete="user_name" {...register('user_name')} type='text' id="user_name" name="user_name"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="name">Name:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.name} autoComplete="name" {...register('name')} type="text" id="name" name="name"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="last_name">Lastname:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.lastName} autoComplete="last_name" {...register('last_name')} type="text" id="last_name" name="last_name"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="birth_date">Birth date</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.birthDate} {...register('birth_date')} type="date" id="birth_date" name="birth_date"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="email">email:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.email} autoComplete="email" {...register('email')} type="email" id="email" name="email"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="phone">Phone:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.phone} {...register('phone')} type="text" id="phone" name="phone"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="country">Country:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.country} {...register('country')} type="text" id="country" name="country"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="city">City:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.city} {...register('city')} type="text" id="city" name="city"/>
                </div>
                <div className="userFormInputCont">
                    <label className="block text-sm/6 font-medium text-gray-900" htmlFor="sector">Sector:</label>
                    <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" disabled={!edition} defaultValue={profile?.sector} {...register('sector')} type="text" id="sector" name="sector"/>
                </div>
            </div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {edition ? 
                    isLoading ? 
                    <span className="loading loading-infinity loading-md"></span>
                    :
                    'Guardar'
                 : 'Editar'}
            </button>
        </form>
    )
}

export default UserForm