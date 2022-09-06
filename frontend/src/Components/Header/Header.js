import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";



export default function Header(){
    return(
        <div className='container_x'>

           

        <div className='header_container'>
        <Navbar />
            <h1 className='header_title'>meal please!</h1>
        </div>
       
    </div>

    )
}