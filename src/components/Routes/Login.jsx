import { useDispatch } from "react-redux";
import FormLogin from "../Login/FormLogin"
import { setLocation } from "../../store/slices/location.slice";

function Login() {

    const dispatch = useDispatch();
    dispatch(setLocation(window.location.href.split('#')[1]));

    return(
        <div className="loginCont flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Inicio de sesión</h2>
            </div>
            
            <FormLogin />
            
        </div>
    )
}

export default Login