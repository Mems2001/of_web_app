import { NavLink } from "react-router-dom"

function NavComp () {
    return(
        <div className="navCont">
            <NavLink to='/'>
                <h1 className="navTitle">Only Fancy Web</h1>
            </NavLink>
            <nav>
                <ul className="navList">
                    <li className="navListElement">
                        <NavLink to='/login'>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default NavComp