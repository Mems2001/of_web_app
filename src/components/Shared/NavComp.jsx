import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {setLogin , setLogout} from '../../store/slices/user.slice'
import { setAdmin, unsetAdmin } from "../../store/slices/admin.slice";
import { setProfile } from "../../store/slices/profile.slice";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faIdCard, faRightFromBracket, faRightToBracket, faUserPlus, faUserTie } from "@fortawesome/free-solid-svg-icons";
import variables from "../../../utils/variables.js";

function NavComp () {
    const location = window.location.href.split('#')[1]
    // console.log(location)

    const isLogged = useSelector(state => state.userSlice);
    const isAdmin = useSelector(state => state.adminSlice)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const ip = variables.ip;

    const logOut = () => {
        dispatch(setLogout());
        dispatch(unsetAdmin());
        dispatch(setProfile(null));
        localStorage.removeItem('token')
    };

    const getProfile = () => {
        let URL = variables.url_prefix + '/api/v1/profiles';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/profiles';
            // } else {
            //     URL = 'https://localhost:443/api/v1/profiles';
            // }

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
        let URL = variables.url_prefix + '/api/v1/auth/adminV';
            // if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
            //     URL = 'https://' + ip + '/api/v1/auth/adminV'
            // } else {
            //     URL = 'https://localhost:443/api/v1/auth/adminV';
            // }

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
            const token = localStorage?.getItem('token')
            if (!isLogged) {
                if (token) {
                    dispatch(setLogin());
                    console.log('logged in');
                    axios.defaults.headers.common['Authorization'] = `jwt ${localStorage.getItem('token')}`;
                    getProfile();
                    getAdmin();
                } else {
                    dispatch(setLogout())
                }
            } else {
                if (token) {
                    dispatch(setLogin());
                    console.log('logged in');
                    axios.defaults.headers.common['Authorization'] = `jwt ${localStorage.getItem('token')}`;
                    getProfile();
                    getAdmin();
                } else {
                    dispatch(setLogout())
                }
            }
        } , []
    )

    return(
        <div className="navbar bg-white z-40 justify-between w-screen shadow">
            <div className="navbar-start w-auto">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                            <FontAwesomeIcon icon={faBars} size="lg"/>
                        </label>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <div className="btn btn-ghost text-xl">
                    <NavLink to='/'>
                        Only Fancy
                    </NavLink>
                </div>
            </div>
            <div className="navbar-end w-auto">
                {isAdmin?
                    <NavLink to='/admin' className={location?.includes('admin')? 'btn btn-ghost bg-gray-200' : 'btn btn-ghost'}>
                        <FontAwesomeIcon icon={faUserTie} size="lg"/>
                    </NavLink>
                        :
                    <></>
                }
                {isLogged?
                <NavLink className={location?.includes('user') ? 'btn btn-ghost bg-gray-200' : 'btn btn-ghost'} to='/user'>
                    <FontAwesomeIcon icon={faIdCard} size="lg"/>
                </NavLink>
                    :
                    <NavLink className={location?.includes('register') ? 'btn btn-ghost bg-gray-200' : 'btn btn-ghost'} to='/register'>
                    <FontAwesomeIcon icon={faUserPlus} size="lg"/>
                </NavLink>
                }
                {isLogged?
                <button className='btn btn-ghost' onClick={logOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg"/>
                </button>
                    :
                <NavLink className={location?.includes('login') ? 'btn btn-ghost bg-gray-200' : 'btn btn-ghost'} to='/login'>
                    <FontAwesomeIcon icon={faRightToBracket} size="lg"/>
                </NavLink>
                }
            </div>
        </div>
    )
};

export default NavComp