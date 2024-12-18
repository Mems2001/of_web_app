import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutesAdmin () {
    const isAdmin = useSelector(state => state.adminSlice);

    if (isAdmin) {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRoutesAdmin