import React from "react";
import './Favorites.css'
import star from './star.png'

export default function Favorites(){
    return(
        <div className="wrapperF">
            <div className="banner">
                <div className="starBox"><img src={star} className="star"/></div> 
                Here's some of your favs!
                <div className="starBox"><img src={star} className="star" /></div>
            </div>
            <div className="favourites">
                Favorites route is working
            </div>
            
        </div>
    )
}