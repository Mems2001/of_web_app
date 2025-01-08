import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import variables from "../../../utils/variables";
import { useState } from "react";

function FormSignUp() {
    const {handleSubmit , register , reset} = useForm();
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);

    const submit = data => {
        setIsLoading(true);
        let URL = variables.url_prefix + '/api/v1/auth/register';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/auth/register';
            // } else {
            //     URL = 'https://localhost:443/api/v1/auth/register';
            // }

        const defaultUser = {
            user_name: '',
            email: '',
            password: ''
        }

        axios.post(URL ,  data)
            .then(res => {
                reset(defaultUser);
                setIsLoading(false);
                navigate('/login')
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false)
            })
    }

    return(
        <form className="loginFormCont space-y-6 w-4/5 mt-10" onSubmit={handleSubmit(submit)}>
            <div className="loginFormCont2 space-y-6">
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="user_name">username:</label>
                    <div className="mt-2">
                        <input {...register('user_name' , {required:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autoComplete="user_name" type="text" id="user_name"/>
                    </div>
                </div>
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="email">e-mail:</label>
                    <div className="mt-2">
                        <input {...register('email' , {required:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autoComplete="email" type="email" id="email"/>
                    </div>
                </div>
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="password">Contraseña:</label>
                    <div className="mt-2">
                        <input {...register('password' , {required:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autoComplete="current-password" type="password" id="password"/>
                    </div>
                </div>
                <div>
            </div>
                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {isLoading? 
                    <span className="loading loading-infinity loading-md"></span>
                    : 'Regístrate'}
                    </button>
                </div>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                Ya tienes una cuenta?
                <a href="/#/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Inicia Sesión</a>
                </p>
            </div>
        </form>
    )
}

export default FormSignUp