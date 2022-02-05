import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {auth, database} from "../services/firebase";
import {ref, get, child} from "firebase/database";
import "../css/Profile.css"
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function Profile() {

    const [userData, setUserData] = useState();
    const history = useHistory();
    useEffect(() => {

        const userId = auth.currentUser.uid;

        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUserData(snapshot.val());
                }
            })

    },[])
    function handleClick() {
        history.push("/edit");
    }
    if (userData)
            return (

                <>
                <Header/>
                <a href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"
    id="bootstrap-css"/>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>


                    <div className="profile-card">
                        <br/>
                        <br/>
                        <p id="showMe">Username: {userData.username.toString()}</p>
                        <p id="showMe">Age: {userData.age.toString()}</p>
                        <p id="showMe">Weight: {userData.weight.toString()}</p>
                        <p id="showMe">Height: {userData.height.toString()}</p>

                    </div>
                    <button style={{
                        backgroundColor: "#a2b2ee",
                        color: "#000000",
                        fontWeight:"500"
                    }}
                        id={"edit"} className="btn btn-primary" onClick={handleClick}>Edit profile</button>
                    <Footer/>
                    </>
                    );
    else {
        return <div></div>
    }

        }




