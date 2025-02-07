import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../../store/slices/profile.slice";
import variables from "../../../utils/variables.js";
import { useState } from "react";

function FormLogin() {
    const {register , handleSubmit , reset} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    // const ip = variables.ip;

    const defaultUser = {
        user_name: '',
        email: '',
        password: ''
    }
    const getUser = () => {
        let URL = variables.url_prefix + '/api/v1/profiles'
        // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
        //     URL = 'https://' + ip + '/api/v1/profiles';
        // } else {
        //     URL = 'https://localhost:443/api/v1/profiles';
        // }

        axios.get(URL)
            .then(res => {
                // console.log(res.data.data);
                dispatch(setProfile(res.data.data));
                // localStorage.setItem('onlyFancyProfile' , res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const submit = (data) => {
        setLoading(true);

        let URL = variables.url_prefix + '/api/v1/auth/login';
        let URL2 = variables.url_prefix + '/api/v1/auth/adminV';
        // const mobileUserAgent = navigator.userAgent;
        // console.log(mobileUserAgent)

        // if (mobileUserAgent.includes('Android') || mobileUserAgent.includes('iPhone')) {
        //     console.log("Estás usando un dispositivo mobile");
        //     URL = 'https://' + ip + '/api/v1/auth/login';
        //     URL2 = 'https://' + ip + '/api/v1/auth/adminV';
        // } else {
        //     console.log('no es dispositivo mobile');
        //     URL = 'https://localhost:443/api/v1/auth/login';
        //     URL2 = 'https://localhost:443/api/v1/auth/adminV';
        // }

        // console.log(URL , URL2)

        axios.post(URL , data)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem('token' , res.data.token);
                localStorage.setItem('onlyFancyLog' , true);
                axios.defaults.headers.common['Authorization'] = `jwt ${res.data.token}`;
                reset(defaultUser);
                axios.get(URL2)
                .then(res => {
                    // console.log(res);
                    if (res.data?.auth === 'admin') {
                        localStorage.setItem('onlyFancyAdmin' , true);
                        getUser();
                        setLoading(false);
                        return navigate('/')
                    } else if (res.data?.message === 'Not an admin') {
                        getUser();
                        setLoading(false);
                        return navigate('/')
                    }
                    })
                    .catch(err => {
                        setLoading(false);
                        throw err
                    })
            })
            .catch(err => {
                const message = err.response.data.message
                // console.log(message)
                if (message === "email or username are not correct") {
                    alert('El correo o nombre de usuario no son correctos')
                } else if (message === 'Wrong password') {
                    alert('Contraseña incorrecta')
                };
                setLoading(false)
                throw(err);
            })
    }

    return(
        <form className="loginFormCont space-y-6 w-4/5 mt-10" onSubmit={handleSubmit(submit)}>
            <div className="loginFormCont2 space-y-6">
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="user_name">username:</label>
                    <div className="mt-2">
                        <input {...register('user_name')} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autoComplete="username" type="text" id="user_name" />
                    </div>
                </div>
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="email">e-mail:</label>
                    <div className="mt-2">
                        <input {...register('email')} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autoComplete="email" type='email' id='email' />
                    </div>
                </div>
                <div className="inputCont">
                    <div className="flex items-center justify-between">
                        <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="password" >Contraseña:</label>
                        <div className="text-sm">
                            <a href="/#/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input {...register('password' , {required:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autoComplete="current-password" type="password" id="password"/>
                    </div>
                </div>
            </div>
            <div>
                <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {loading? 
                    <span className="loading loading-infinity loading-md"></span>
                : 'Ingresar'}
                </button>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                No tienes una cuenta?
                <a href="/#/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> Crea una</a>
            </p>
            {/* <p>{navigator.userAgent.includes('Android')? 'Si' : 'No'}</p> */}
            
        </form>
        
    )   
}

export default FormLogin