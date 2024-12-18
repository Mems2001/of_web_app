import {NavLink} from 'react-router-dom'

function NavComp() {

    return (
        <header className="headerCont">
            <NavLink to='/'>
                <h1>Only Fancy Web</h1>
            </NavLink>
            <nav className='headerNav'>
                <ul className='headerList'>
                    <li className='headerItem'>
                        <NavLink to='/login'>Log in</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavComp