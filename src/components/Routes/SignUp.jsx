import { useDispatch } from 'react-redux';
import FormSignUp from '../SignUp/FormSignUp'
import { setLocation } from '../../store/slices/location.slice';
import { useEffect } from 'react';

function SignUp() {

    const dispatch = useDispatch();
    
    useEffect (
        () => {
            dispatch(setLocation(window.location.href.split('#')[1]));
        } , []
    )

    return(
        <div className="loginCont flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Registro de Usuario</h2>
            </div>

            <FormSignUp />
        </div>
    )
}

export default SignUp