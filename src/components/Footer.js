import React from 'react';

function Footer() {
  return (

    <footer className="pt-5" style={{
       position: "absolute",
        top: "80%",
        width: "100%",

    }}>
        <div style={{
            color: "white",
            backgroundColor:"#26292B",
            position: "fixed",
            width: "100%",
            marginTop:"3.1%"
        }} className="text-center p-1" >
            <p>©2022 Copyright</p>

        </div>
    </footer>

  )
}

export default Footer;