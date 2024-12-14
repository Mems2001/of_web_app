import axios from "axios";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function FormSignUp() {
    const {handleSubmit , register , reset} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = data => {
        const URL = 'http://localhost:8000/api/v1/auth/register';

        const defaultUser = {
            user_name: '',
            email: '',
            password: ''
        }

        axios.post(URL ,  data)
            .then(res => {
                reset(defaultUser)
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <form className="loginFormCont" onSubmit={handleSubmit(submit)}>
            <h2 className="loginTitle">Sign Up</h2>
            <div className="loginFormCont2">
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="user_name">username:</label>
                    <input {...register('user_name')} type="text" id="user_name"/>
                </div>
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="email">email:</label>
                    <input {...register('email')} type="email" id="email"/>
                </div>
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="password">password:</label>
                    <input {...register('password')} type="password" id="password"/>
                </div>
                <button className="loginBtn">
                    Register
                </button>
            </div>
        </form>
    )
}

export default FormSignUp