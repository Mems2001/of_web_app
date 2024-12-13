function FormLogin() {
    return(
        
        <form className="loginFormCont">
            <h2 className="loginTitle">Login</h2>
            <div className="loginFormCont2">
                <div className="inputCont">
                    <label className="loginLabel" htmlFor="userName">Username:</label>
                    <input type="text" id="userName" />
                </div>
            </div>
        </form>
        
    )   
}

export default FormLogin