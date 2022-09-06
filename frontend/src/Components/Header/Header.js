import React from "react";
import Navbar from "../Navbar/Navbar";



export default function Header(){
    return(
        <div className='container_x'>

           

        <div className='header_container'>
        <Navbar />
            <h1 className='header_title'><img src='.\final-capstone\frontend\public\onigiri_MP.png' className="headerImg"></img>Meal, Please!</h1>
        {/* {this.props.token.token !== undefined ?
                <div>
                    <Link to='/home'>Home | </Link>
                    <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                    <Redirect to='/home'/>

                </div>  
            : 
                <Link to='/login'>Home | </Link>
        } */}
            
        </div>
       
    </div>

    )
}