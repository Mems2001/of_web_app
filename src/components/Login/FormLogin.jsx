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
        const URL = 'http://localhost:8000/api/v1/profiles';

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
        console.log(event)
        let URL = '';
        let URL2 = '';
        const mobileUserAgent = navigator.userAgent

        if (mobileUserAgent.includes('Android')) {
            console.log("Estás usando un dispositivo mobile");
            URL = '192.168.1.6:8000/api/v1/auth/login';
            URL2 = '192.168.1.6:8000/api/v1/auth/adminV'
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
            <button className="btn" type="submit">
                Login
            </button>
            <p>{navigator.userAgent.includes('Android')? 'Si' : 'No'}</p>
        </form>
        
    )   
}

export default FormLogin