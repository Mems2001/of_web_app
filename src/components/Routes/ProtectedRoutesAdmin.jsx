import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutesAdmin () {
    const isAdmin = localStorage.getItem('onlyFancyAdmin');

    if (isAdmin) {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRoutesAdmin