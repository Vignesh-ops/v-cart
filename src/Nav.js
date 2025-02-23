
import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import DataContext from "./context/DataContext";


const Nav = () => {
    const { search, setSearchip } = useContext(DataContext);
    return (
        <>
        <nav className="Nav">
            <form className="searchform" onSubmit={(e) => e.preventDefault()}>
                <input type="text"
                    placeholder="Search name"
                    value={search}
                    aria-label="search item"
                    onChange={(e) => setSearchip(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/posts'>Posts</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
            </nav>
        </>
    )
}

export default Nav
