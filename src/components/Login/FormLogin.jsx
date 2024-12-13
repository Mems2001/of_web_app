import { useForm } from "react-hook-form";

function FormLogin() {
    const {register , handleSubmit , reset} = useForm();

    return(
        
        <form className="loginFormCont">
            <h2 className="loginTitle">Login</h2>
            <div className="loginFormCont2">
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="userName">username:</label>
                    <input {...register('userName')} type="text" id="userName" />
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