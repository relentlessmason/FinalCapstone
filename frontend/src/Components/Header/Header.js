import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from './onigiri_MP.png'



export default function Header(props){
    
    return(
        <div className='container_x'>

           

        <div className='header_container'>
        <Navbar 
        userId={props.userId}
        fetchMealsByUser={props.fetchMealsByUser}
        handleLogout={props.handleLogout}/>
        <img src={logo} alt="meal please!" className="logoImg"/>
            <h1 className='header_title'>meal please!</h1>
        </div>
       
    </div>

    )
}