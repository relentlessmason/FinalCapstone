import React from "react";
import './Search.css';

export default function Search(){
    return(
        <>
            <section>
                <form action="/" method="get">
                   <h1 className="search_header">Search</h1>
                    <input
                        className="search_input"
                        type="text"
                        id="header-search"
                        placeholder="Search Recipes"
                        name="s" 
                    />
                    <button className="submit" type="submit">Search</button>
                </form>
            </section>
        </>
    )
}