import axios from 'axios';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

function FormLogin() {
    const {register , handleSubmit , reset} = useForm();
    const dispatch = useDispatch();

    const submit = (data:any) : any => {
        console.log(data);
        const URL = 'http://localhost:8000/api/v1/auth/login';

        axios.post(URL , data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token' , res.data.data.token);
                dispatch()
            })
    }

    return(
        <form onSubmit={handleSubmit(submit)} className="formLoginContainer">
            Form Login
            <h2 className="loginTitle">Login</h2>
            <div className="formLoginContainer2">
                <div className='inputContainer'>
                    <label className='loginLabeel' htmlFor='userName'>
                        Username:
                    </label>
                    <input {...register('userName')} type='text' id='userName'></input>
                </div>
                <div className="'inputContainer">
                    <label className="loginLabel" htmlFor="email">
                        E-mail:
                    </label>
                    <input {...register('email')} type="text" id="email"></input>
                </div>
                <div className='inputContainer'>
                    <label className='loginLabel' htmlFor='password'>
                        Password:
                    </label>
                    <input {...register('passsword')} type='password' id='password'></input>
                </div>
                <button className='loginBtn'>
                    Login
                </button>
            </div>
        </form>
    )
}

export default FormLogin