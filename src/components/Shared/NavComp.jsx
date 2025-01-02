import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {setLogin , setLogout} from '../../store/slices/user.slice'
import { setAdmin, unsetAdmin } from "../../store/slices/admin.slice";
import { setProfile } from "../../store/slices/profile.slice";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faIdCard, faRightFromBracket, faRightToBracket, faUserPlus, faUserTie } from "@fortawesome/free-solid-svg-icons";

function NavComp () {
    // console.log(window.location.hash)

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
        // <nav className="navCont">
        //     <div className="titleCont">
        //         <NavLink to='/'>
        //             <h1 className="navTitle">Only Fancy Web</h1>
        //         </NavLink>
        //     </div>
        //     <div className="navBar">
        //         <ul className="navList">
        //             <li className={isAdmin ? 'navListElement active' : 'navListElement inactive'}>
        //                 <NavLink to='/admin'>
        //                     Admin Console
        //                 </NavLink>
        //             </li>  
        //             <li className="navListElement">
        //                 {isLogged?
        //                 <button onClick={logOut}>
        //                     Log Out
        //                 </button>
        //                 :
        //                 <NavLink to='/login'>
        //                     Log In
        //                 </NavLink>
        //                 }
        //             </li>
        //             <li className="navListElement">
        //                 {isLogged ? 
        //                 <NavLink to='/user'>
        //                     User Info
        //                 </NavLink>
        //                 :
        //                 <NavLink to='/register'>
        //                     Sign Up
        //                 </NavLink>
        //                 }
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
        <div className="navbar bg-base-100 justify-between w-screen">
            <div className="navbar-start w-auto">
                <div className="dropdown">
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
                    <NavLink to='/admin' className='btn btn-ghost'>
                        <FontAwesomeIcon icon={faUserTie} />
                    </NavLink>
                        :
                    <></>
                }
                {isLogged?
                <NavLink className='btn btn-ghost btn-circle' to='/user'>
                    <FontAwesomeIcon icon={faIdCard} />
                </NavLink>
                    :
                    <NavLink className='btn btn-ghost btn-circle' to='/register'>
                    <FontAwesomeIcon icon={faUserPlus} />
                </NavLink>
                }
                {isLogged?
                <button className='btn btn-ghost btn-circle' onClick={logOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
                    :
                <NavLink className='btn btn-ghost btn-circle' to='/login'>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </NavLink>
                }
            </div>
        </div>
    )
};

export default NavComp