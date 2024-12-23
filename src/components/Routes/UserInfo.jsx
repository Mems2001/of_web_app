import { useDispatch, useSelector } from "react-redux"
import UserForm from "../UserInfo/UserForm"
import { setProfile } from "../../store/slices/profile.slice";

function UserInfo () {

    return(
        <div className="userInfoCont">
            <UserForm />
        </div> 
    )
}

export default UserInfo