import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from './onigiri_MP.png'



export default function Header(){
    return(
        <div className='container_x'>

           

        <div className='header_container'>
        <Navbar />
        <img src={logo} alt="meal please!" className="logoImg"/>
            <h1 className='header_title'>
                Meal, Please!
                </h1>
        </div>
       
    </div>

    )
}