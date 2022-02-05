import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import calsPerDay, {CalculateActivity, GainOrLose} from "../pages/Calories";
import {Link, useHistory} from "react-router-dom";
import {auth, database} from "../services/firebase";
import {child, get, ref, set} from "firebase/database";
import {Calories} from "./Calories";
import {Form} from "react-bootstrap";


export default function Calculator() {
    const userId = auth.currentUser.uid;
    let user;
    let [result, setResult] = useState(0);
    let activity;
    let goal;
    const button = useRef();
    const history = useHistory();
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         button.current.click();
    //         setResult(0);
    //         console.log(result)
    //         console.log("aaaaaaa")
    //     }, 8000); //miliseconds
    // }, []);

    function handleSubmit(event) {
        event.preventDefault()
        let ok = 0;
        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    user = snapshot.val();
                    if (document.getElementById("None").checked)
                        activity = "none";
                    if (document.getElementById("Light").checked)
                        activity = "light";
                    if (document.getElementById("Moderate").checked)
                        activity = "moderate";
                    if (document.getElementById("Heavy").checked)
                        activity = "heavy";
                    if (document.getElementById("Lose").checked)
                        goal = "lose";
                    if (document.getElementById("Maintain").checked)
                        goal = "maintain";
                    if (document.getElementById("Gain").checked)
                        goal = "gain";
                    result = (GainOrLose(CalculateActivity(Calories(user.age, user.weight, user.height, user.gender), activity), goal))
                    setResult(result);
                    console.log(result)
                    if (result !== undefined) {
                        console.log(result);
                        await set(ref(database, 'users/' + userId), {
                            email: auth.currentUser.email,
                            username: user.username,
                            age: user.age,
                            weight: user.weight,
                            height: user.height,
                            gender: user.gender,
                            activity: activity,
                            goal: goal,
                            calories: result
                        });
                    }
                    if (ok === 1) {
                        history.push("/profile");
                    }
                }

            })

    }

    return (
        <>
            <Header/>
            <a href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"
               id="bootstrap-css"/>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>

            <div className="profile-card">
                <Form className="mt-sm-1 py-sm-1 px-sm-1" autoComplete="off" onSubmit={handleSubmit}>
                    <p id="showMe">What is your activity level: </p>
                    <div className="form-group">
                        <input id={"None"} type="radio" name="1" value="male"
                        /> None&nbsp;
                        <input id={"Light"}
                               type="radio" name="1" value="female"
                        /> Light&nbsp;
                        <input id={"Moderate"} type="radio" name="1" value="male"
                        /> Moderate&nbsp;
                        <input id={"Heavy"} type="radio" name="1" value="male"
                        /> Heavy&nbsp;
                    </div>

                    <p id="showMe">'Do you want to lose, maintain, or gain weight:</p>
                    <div className="form-group">
                        <input id={"Lose"} type="radio" name="2" value="male"
                        /> Lose&nbsp;
                        <input id={"Maintain"}
                               type="radio" name="2" value="female"
                        /> Maintain&nbsp;
                        <input id={"Gain"} type="radio" name="2" value="male"
                        /> Gain
                    </div>
                    <button style={{
                        marginBottom:"5%"
                    }} type={"submit"} className="btn btn-primary rounded-pill px-5">Calculate</button>
                    <div id="alert" className="alert alert-info" role="alert">
                        You need {result}
                    </div>
                </Form>
            </div>
            <Footer/>
        </>
    )
}