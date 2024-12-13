import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

function FormLogin() {
    const {register , handleSubmit , reset} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultUser = {
        user_name: '',
        email: '',
        password: ''
    }

    const submit = data => {
        // console.log(data);
        const URL = 'http://localhost:8000/api/v1/auth/login';

        axios.post(URL , data)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem('token' , res.data.token);
                dispatch(setLogin());
                reset(defaultUser);
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        
        <form className="loginFormCont" onSubmit={handleSubmit(submit)}>
            <h2 className="loginTitle">Login</h2>
            <div className="loginFormCont2">
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="user_name">username:</label>
                    <input {...register('user_name')} type="text" id="user_name" />
                </div>
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="email">e-mail:</label>
                    <input {...register('email')} type='email' id='email' />
                </div>
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="password" >password:</label>
                    <input {...register('password')} type="password" id="password"/>
                </div>
            </div>
            <button className="loginBtn">
                Login
            </button>
        </form>
        
    )   
}

export default FormLogin