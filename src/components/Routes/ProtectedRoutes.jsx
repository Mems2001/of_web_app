import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes () {
    const isLogged = localStorage.getItem('onlyFancyLog');

    if (isLogged) {
        return <Outlet />
    } else {
        return <Navigate to='/login'/>
    }
}

export default ProtectedRoutes