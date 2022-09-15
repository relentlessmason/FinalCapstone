import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { baseUrl } from "../../Shared/baseUrl";
import * as FaIcons from "react-icons/fa/";
import * as GrIcons from "react-icons/gr/";
import * as RiIcons from "react-icons/ri/";
import * as VscIcons from "react-icons/vsc/";
import * as MdIcons from "react-icons/md/";
import * as BsIcons from "react-icons/bs/";
import * as SiIcons from "react-icons/si/";
import * as IoIcons from "react-icons/io/";
import * as AiIcons from "react-icons/ai/";
import * as GiIcons from "react-icons/gi/";

export default function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#D10081" }}>
        <div className="navbar">
          <Link to="#" className="navbar_menu_bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          onClick={() => {
            // props.fetchMealsByUser(props.userId);
            // props.fetchMealPlansByUserId(props.userId)
          }}
          className={sidebar ? "nav_menu active" : "nav_menu"}
        >
          <ul className="nav_menu_items" onClick={showSidebar}>
            <li className="navbar_toggle">
              <Link to="#" className="navbar_menu_bars">
                <GrIcons.GrClose />
              </Link>
            </li>

            {/* Pretty sure we don't need this anymore but not 100% yet */}
            {/* {NavbarData.map((item, index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link routerLinkActive="active"
                                to= {item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                            <Redirect to='/home'/>
                        </li>
                    )
                })} */}

            <li className="nav-text">
              <Link to="/home">
                <SiIcons.SiJusteat />
                <span>home</span>
              </Link>
            </li>
            {/* <li className="nav-text">
              <Link to="/search">
                <RiIcons.RiSearchLine />
                <span>Search</span>
              </Link>
            </li> */}
            <li className="nav-text">
              <Link to="/recipes">
                <GiIcons.GiRiceCooker />
                <span>recipes</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/add-recipe">
                <VscIcons.VscAdd />
                <span>add recipe</span>
              </Link>
            </li>
            {/* <li className="nav-text">
              <Link to="/favorites">
                <AiIcons.AiOutlineHeart />
                <span>Favorites</span>
              </Link>
            </li> */}
            {/* <li className="nav-text">
              <Link to="/calendar">
                <BsIcons.BsCalendar3 />
                <span>Calendar</span>
              </Link>
            </li> */}
            <li className="nav-text">
              <Link to="/grocery-list">
                <BsIcons.BsFillBasket2Fill />
                <span>grocery list</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/pantry">
                <FaIcons.FaCarrot />
                <span>pantry</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link
                to="/login"
                onClick={() => {
                  props.handleLogout();
                }}
              >
                <MdIcons.MdOutlineLogout />
                <span>log in/out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
