import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfile } from "../../store/slices/profile.slice";
import { useState } from "react";
import { useForm } from "react-hook-form";

function UserForm ({profile}) {
    const [edition , setEdition] = useState(false);
    const dispatch = useDispatch();

    const handleEdition = (data) => {
        if (edition) {
            const newProfile = data;
            const URL = 'http://localhost:8000/api/v1/profiles/' + profile.id
            console.log(newProfile , URL);
            axios.put(URL , data)
                .then(res => {
                    console.log(res);
                    dispatch(setProfile(res.data.data.updatedProfile))
                })
                .catch(err => {
                    console.log(err)
                })
            setEdition(false)
        } else {
            setEdition(true)
        }
    }

    const submit = data => {
        handleEdition(data)
    }

    const {register , handleSubmit , reset} = useForm();

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>{profile.userName}</h2>
            <div className="userFormCont2">
                <div className="userFormInputCont">
                    <label htmlFor="user_name">Username:</label>
                    <input disabled={!edition} defaultValue={profile.userName} {...register('user_name')} type='text' id="user_name"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="name">Name:</label>
                    <input disabled={!edition} defaultValue={profile.name} {...register('name')} type="text" id="name"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="last_name">Lastname:</label>
                    <input disabled={!edition} defaultValue={profile.lastName} {...register('last_name')} type="text" id="last_name"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="birth_date">Birth date</label>
                    <input disabled={!edition} defaultValue={profile.birthDate} {...register('birth_date')} type="date" id="birth_date"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="email">email:</label>
                    <input disabled={!edition} defaultValue={profile.email} {...register('email')} type="email" id="email"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="phone">Phone:</label>
                    <input disabled={!edition} defaultValue={profile.phone} {...register('phone')} type="text" id="phone"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="country">Country:</label>
                    <input disabled={!edition} defaultValue={profile.country} {...register('country')} type="text" id="country"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="city">City:</label>
                    <input disabled={!edition} defaultValue={profile.city} {...register('city')} type="text" id="city"/>
                </div>
                <div className="userFormInputCont">
                    <label htmlFor="sector">Sector:</label>
                    <input disabled={!edition} defaultValue={profile.sector} {...register('sector')} type="text" id="sector"/>
                </div>
            </div>
            <button>
                {edition ? 'Guardar' : 'Editar'}
            </button>
        </form>
    )
}

export default UserForm