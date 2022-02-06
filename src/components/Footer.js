import React from 'react';
import "../css/Header.css"

function Footer() {
  return (

    <footer  style={{
       position: "absolute",
        width: "100%",

    }}>
        <div style={{
            color: "white",
            backgroundColor:"#26292B",
            position: "relative",
            width: "100%",
        }} className="text-center p-1" >
            <p id={"f"}>©2022 Copyright</p>

        </div>
    </footer>

  )
}

export default Footer;