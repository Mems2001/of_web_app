import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes () {
    const isLogged = useSelector(state => state.userSlice);

    if (isLogged) {
        return <Outlet />
    } else {
        return <Navigate to='/login'/>
    }
}

export default ProtectedRoutes