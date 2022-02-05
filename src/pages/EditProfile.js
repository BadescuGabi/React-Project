import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {auth, database} from "../services/firebase";
import {ref, get, child, set} from "firebase/database";
import "../css/Profile.css"
import {useHistory} from "react-router-dom";
import {CalculateActivity, Calories, GainOrLose} from "./Calories";
import {Form} from "react-bootstrap";


export default function EditProfile() {
    const userId = auth.currentUser.uid;
    const username = useRef();
    const age = useRef();
    const weight = useRef();
    const height = useRef();
    const history = useHistory();
    const gender=useRef();
    const activity=useRef();
    const goal=useRef();
    const calories=useRef();
    let user;
    let ok=0
    async function handleSubmit(event) {
        // console.log(userData.username)
        // console.log(username.current.value)
        event.preventDefault();
       // console.log(userId)
        const dbRef = ref(database);
        get(child(dbRef ,`users/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    user = snapshot.val();
                    set(ref(database,'users/' + userId),{
                        email:auth.currentUser.email,
                        username: username.current.value,
                        age: age.current.value,
                        weight: weight.current.value,
                        height: height.current.value,
                        gender:user.gender,
                        activity:user.activity,
                        goal:user.goal,
                        calories:user.calories
                    });
                }
                ok=1
                if (ok===1){
                    history.push("profile");
                }
            })
        //console.log(user)




    }




    //  console.log(userData.username.value);


return (
    <>
        <Header/>
        <div className="container">
            <form className="mt-5 py-5 px-5" autoComplete="off" onSubmit={handleSubmit}>
                <p className="lead">Fill in the form below to edit profile</p>
                <div className="form-group">
                    <input ref={username} className="form-control" placeholder="Username" name="username"
                           type="text"
                    />
                </div>
                <div className="form-group">
                    <input ref={age} className="form-control" placeholder="Age" name="age" type="text"
                    />
                </div>
                <div className="form-group">
                    <input ref={weight} className="form-control" placeholder="Weight" name="weight" type="text"
                    />
                </div>
                <div className="form-group">
                    <input ref={height} className="form-control" placeholder="Height" name="height" type="text"
                    />
                </div>
                <button style={{
                    backgroundColor: "#26292B"
                }} type={"submit"} className="btn btn-primary rounded-pill px-5">Ok</button>
            </form>
        </div>
        <Footer/>
    </>
)
}