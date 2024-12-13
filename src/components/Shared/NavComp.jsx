import { NavLink } from "react-router-dom"

function NavComp () {
    return(
        <div className="navCont">
            <div className="titleCont">
                <NavLink to='/'>
                    <h1 className="navTitle">Only Fancy Web</h1>
                </NavLink>
            </div>
            <nav className="navBar">
                <ul className="navList">
                    <li className="navListElement">
                        <NavLink to='/login'>
                            Login
                        </NavLink>
                    </li>
                    <li className="navListElement">
                        <NavLink to='/register'>
                            Sign Up
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default NavComp