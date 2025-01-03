import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {setLogin , setLogout} from '../../store/slices/user.slice'
import { setAdmin, unsetAdmin } from "../../store/slices/admin.slice";
import { setProfile } from "../../store/slices/profile.slice";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faIdCard, faRightFromBracket, faRightToBracket, faUserPlus, faUserTie } from "@fortawesome/free-solid-svg-icons";

function NavComp () {
    const location = window.location.href.split('#')[1]
    console.log(location)

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
        let URL = undefined
            if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                URL = 'https://192.168.1.6:443/api/v1/profiles';
            } else {
                URL = 'https://localhost:443/api/v1/profiles';
            }

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
        let URL = undefined
            if (navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')) {
                URL = 'https://192.168.1.6:443/api/v1/auth/adminV'
            } else {
                URL = 'https://localhost:443/api/v1/auth/adminV';
            }

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
            } else {
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
        <div className="navbar bg-base-100 justify-between w-screen">
            <div className="navbar-start w-auto">
                {/* <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div> */}
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
                <a className="btn btn-ghost text-xl">
                    <NavLink to='/'>
                        Only Fancy
                    </NavLink>
                </a>
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