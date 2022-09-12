import React from "react";
import './Footer.css'

export default function Footer(){
    return(
        <div className="footer">
        <footer>
        {/* <span classname="footerText">I am a foot.</span> */}
        <div className="footerText">
        <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} />
        <span>meal please! LLC</span>
        </div>
        </footer>
        </div>
    )
}