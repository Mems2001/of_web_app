import { useDispatch } from "react-redux";
import UserForm from "../UserInfo/UserForm"
import { setLocation } from "../../store/slices/location.slice";
import { useEffect } from "react";

function UserInfo () {

    const dispatch = useDispatch();
    
    useEffect(
        () => {
            dispatch(setLocation(window.location.href.split('#')[1]));
        } , []
    )

    return(
        <div className="userInfoCont">
            <UserForm />
        </div> 
    )
}

export default UserInfo