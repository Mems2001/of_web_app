import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {setLogin , setLogout} from '../../store/slices/user.slice'
import { setAdmin, unsetAdmin } from "../../store/slices/admin.slice";
import { setProfile } from "../../store/slices/profile.slice";
import axios from "axios";

function NavComp () {
    const isLogged = useSelector(state => state.userSlice);
    const isAdmin = useSelector(state => state.adminSlice)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(setLogout());
        dispatch(unsetAdmin());
        dispatch(setProfile(null));
        localStorage.removeItem('token')
    };

    const getProfile = () => {
        const URL = 'http://localhost:8000/api/v1/profiles';

        axios.get(URL)
            .then(res => {
                // console.log(res.data.data);
                dispatch(setProfile(res.data.data))
            })
            .catch(err => {
                console.log({
                    location: 'NavComp.jsx',
                    err
                })
            })
    }

    const getAdmin = () => {
        const URL = 'http://localhost:8000/api/v1/auth/adminV'

        axios.get(URL)
            .then(res => {
                if (res.data.auth) {
                    dispatch(setAdmin())
                } else {
                    console.log({
                        location: 'NavComp.jsx',
                        message: 'This user is not an admin'
                    })
                }
            })
            .catch(err => {
                dispatch(unsetAdmin());
                navigate('/')
                throw err
            })
    }

    useEffect(
        () => {
            if (!isLogged) {
                if (localStorage.getItem('token')) {
                    dispatch(setLogin());
                    console.log('logged in');
                    axios.defaults.headers.common['Authorization'] = `jwt ${localStorage.getItem('token')}`;
                    getProfile();
                    getAdmin();
                }
            }
        } , []
    )

    return(
        <div className="navCont">
            <div className="titleCont">
                <NavLink to='/'>
                    <h1 className="navTitle">Only Fancy Web</h1>
                </NavLink>
            </div>
            <nav className="navBar">
                <ul className="navList">
                    <li className={isAdmin ? 'navListElement active' : 'navListElement inactive'}>
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