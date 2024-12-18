import { useDispatch, useSelector } from "react-redux"
import UserForm from "../UserInfo/UserForm"
import { setProfile } from "../../store/slices/profile.slice";

function UserInfo ({profile}) {

    return(
        <div className="userInfoCont">
            <UserForm profile={profile}/>
        </div> 
    )
}

export default UserInfo