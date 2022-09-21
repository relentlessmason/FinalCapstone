import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from './onigiri_MP.png'



export default function Header(props){
    
    return(
       

        <div className='header_container  '>

        <Navbar 
        handleLogout={props.handleLogout}
        />
        
            <h1 className='header_title'><img src={logo} alt="meal please!" className="logoImg"/>Meal Please!</h1>
            
        </div>
       
   

    )
}