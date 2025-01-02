import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { setAdmin, unsetAdmin } from "../../store/slices/admin.slice";
import { setProfile } from "../../store/slices/profile.slice";

function FormLogin() {
    const {register , handleSubmit , reset} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultUser = {
        user_name: '',
        email: '',
        password: ''
    }
    const getUser = () => {
        let URL = undefined
        if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            URL = 'http://192.168.1.6:8000/api/v1/profiles'
        } else {
            URL = 'http://localhost:8000/api/v1/profiles';
        }

        axios.get(URL)
            .then(res => {
                // console.log(res.data.data);
                dispatch(setProfile(res.data.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const submit = async(data) => {
        let URL = undefined;
        let URL2 = undefined;
        const mobileUserAgent = navigator.userAgent;
        // console.log(mobileUserAgent)

        if (mobileUserAgent.includes('Android') || mobileUserAgent.includes('iPhone')) {
            console.log("Estás usando un dispositivo mobile");
            URL = 'http://192.168.1.6:8000/api/v1/auth/login';
            URL2 = 'http://192.168.1.6:8000/api/v1/auth/adminV'
        } else {
            console.log('no es dispositivo mobile');
            URL = 'http://localhost:8000/api/v1/auth/login';
            URL2 = 'http://localhost:8000/api/v1/auth/adminV';
        }

        console.log(URL , URL2)

        await axios.post(URL , data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token' , res.data.token);
                axios.defaults.headers.common['Authorization'] = `jwt ${res.data.token}`;
                dispatch(setLogin());
                getUser();
                reset(defaultUser);
                axios.get(URL2)
                    .then(res => {
                        // console.log(res);
                        if (res.data.auth) {
                            dispatch(setAdmin())
                        }
                        navigate('/')
                    })
                    .catch(err => {
                        dispatch(unsetAdmin());
                        navigate('/')
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }

    return(
        <form className="loginFormCont space-y-6 w-4/5 mt-10" onSubmit={handleSubmit(submit)}>
            <div className="loginFormCont2">
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="user_name">username:</label>
                    <div className="mt-2">
                        <input {...register('user_name')} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autocomplete="user_name" type="text" id="user_name" />
                    </div>
                </div>
                <div className="inputCont">
                    <label className="loginLabel block text-sm/6 font-medium text-gray-900" htmlFor="email">e-mail:</label>
                    <div className="mt-2">
                        <input {...register('email')} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type='email' id='email' />
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
                        <input {...register('password' , {required:true})} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" autocomplete="current-password" type="password" id="password"/>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ingresar</button>
            </div>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                No tienes una cuenta?
                <a href="/#/register" class="font-semibold text-indigo-600 hover:text-indigo-500"> Crea una</a>
            </p>
            {/* <p>{navigator.userAgent.includes('Android')? 'Si' : 'No'}</p> */}
            
        </form>
        
    )   
}

export default FormLogin