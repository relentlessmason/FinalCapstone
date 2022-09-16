import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from './onigiri_MP.png'



export default function Header(props){
    
    return(
        <div className='container_x'>

           

        <div className='header_container'>

        <Navbar 
        handleLogout={props.handleLogout}
        />
        
            <h1 className='header_title'><img src={logo} alt="meal please!" className="logoImg"/>meal please!</h1>
        </div>
       
    </div>

    )
}