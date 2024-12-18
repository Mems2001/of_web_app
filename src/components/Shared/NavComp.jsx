import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {setLogin , setLogout} from '../../store/slices/user.slice'
import { unsetAdmin } from "../../store/slices/admin.slice";
import { setProfile } from "../../store/slices/profile.slice";

function NavComp ({profile}) {
    const isLogged = useSelector(state => state.userSlice);
    const isAdmin = useSelector(state => state.adminSlice)
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(setLogout());
        dispatch(unsetAdmin());
        dispatch(setProfile(null))
    };

    return(
        <div className="navCont">
            <div className="titleCont">
                <NavLink to='/'>
                    <h1 className="navTitle">Only Fancy Web</h1>
                </NavLink>
            </div>
            <nav className="navBar">
                <ul className="navList">
                    <li className={isAdmin ? 'navlistElement active' : 'navlistElement inactive'}>
                        <NavLink to='/admin'>
                            Admin Console
                        </NavLink>
                    </li>  
                    <li className="navListElement">
                        {isLogged?
                        <button onClick={logOut}>
                            Log Out
                        </button>
                        :
                        <NavLink to='/login'>
                            Log In
                        </NavLink>
                        }
                    </li>
                    <li className="navListElement">
                        {isLogged ? 
                        <NavLink to='/user'>
                            User Info
                        </NavLink>
                        :
                        <NavLink to='/register'>
                            Sign Up
                        </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default NavComp