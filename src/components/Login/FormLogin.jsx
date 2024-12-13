import { useForm } from "react-hook-form";

function FormLogin() {
    const {register , handleSubmit , reset} = useForm();

    return(
        
        <form className="loginFormCont">
            <h2 className="loginTitle">Login</h2>
            <div className="loginFormCont2">
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="userName">Username:</label>
                    <input {...register('userName')} type="text" id="userName" />
                </div>
            </div>
        </form>
        
    )   
}

export default FormLogin