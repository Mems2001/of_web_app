import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setProfile } from "../../store/slices/profile.slice";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faIdCard, faRightFromBracket, faRightToBracket, faUserPlus, faUserTie } from "@fortawesome/free-solid-svg-icons";
import variables from "../../../utils/variables.js";

function NavComp () {
    const dispatch = useDispatch();
    const location = useSelector(state => state.locationSlice);
    const navigate = useNavigate();
    
    const profile = useSelector(state => state.profileSlice );
    const [isLogged , setIsLogged] = useState(localStorage.getItem('onlyFancyLog'));
    const [isAdmin , setIsAdmin] = useState(localStorage.getItem('onlyFancyAdmin'));

    const logOut = () => {
        setIsLogged(false);
        setIsAdmin(false);
        dispatch(setProfile(null));
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        localStorage.removeItem('onlyFancyLog');
        localStorage.removeItem('onlyFancyAdmin');
        navigate('/')
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
                return true 
            })
            .catch(err => {
                console.log({
                    location: 'NavComp.jsx',
                    err
                })
                return false
            })
    }

    useEffect(
        () => {
            setIsLogged(localStorage.getItem('onlyFancyLog'));
            setIsAdmin(localStorage.getItem('onlyFancyAdmin'));
            axios.defaults.headers.common['Authorization'] = `jwt ${localStorage.getItem('token')}`;

          if (isLogged && profile==null) {
            let prof = getProfile();
            if (!prof) {
                logOut()
            }
          }
        } , [ isLogged , profile , isAdmin]
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
                <NavLink to='/login' className={location?.includes('login') ? 'btn btn-ghost bg-gray-200' : 'btn btn-ghost'}>
                    <FontAwesomeIcon icon={faRightToBracket} size="lg"/>
                </NavLink>
                }
            </div>
        </div>
    )
};

export default NavComp