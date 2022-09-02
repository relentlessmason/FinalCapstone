import React, {useState} from "react";
import * as FaIcons from 'react-icons/fa/';
import * as GrIcons from 'react-icons/gr/';
import * as IoIcons from 'react-icons/io/';
import { Link } from "react-router-dom";
import { NavbarData } from './NavbarData';
import './Navbar.css';
import { IconContext } from "react-icons";



export default function Navbar(){
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    return(
        <>
        <IconContext.Provider value={{color: '#D10081'}}>
        <div className="navbar">
            <Link to="#" className="navbar_menu_bars" >
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav_menu active' : 'nav_menu'}>
            <ul className="nav_menu_items" onClick={showSidebar}>
                <li className="navbar_toggle">
                    <Link to="#" className="navbar_menu_bars">
                        <GrIcons.GrClose />
                    </Link>
                </li>
                {NavbarData.map((item, index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </IconContext.Provider>
        </>
    )
}
