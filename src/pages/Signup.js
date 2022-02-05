import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../helpers/auth';
import {getElement} from "bootstrap/js/src/util";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignUp() {

    const [error, setError] = useState();
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const age = useRef();
    const weight = useRef();
    const height = useRef();
    // let [gender,setGender] = useState();
    const genderF = useRef();
    const genderM = useRef();
    let gender;

    function setGender(radio) {
        gender = radio
    }

    async function handleSubmit(event) {
        if (document.getElementById("male").checked)
            gender = "male"
        if (document.getElementById("female").checked)
            gender = "female"
        event.preventDefault();
        setError('');
        try {
            console.log(username.current.value)
            await signup(email.current.value, password.current.value, username.current.value, age.current.value, weight.current.value, height.current.value, gender);
        } catch (error) {

            setError({error: error.message});
            console.log(error)
        }
    }


    return (
        <>
            <Header/>
            <div className="container">
                <form className="" autoComplete="off" onSubmit={handleSubmit}>
                    <h1 style={{
                        fontSize: "x-large"
                    }}>
                        <br/>Sign Up to Healthy Way
                    </h1>
                    <p className="lead">Fill in the form below to create an account.</p>
                    <div className="form-group">
                        <input ref={email} className="form-control" placeholder="Email" name="email" type="email"
                        />
                    </div>
                    <div className="form-group">
                        <input ref={password} className="form-control" placeholder="Password" name="password"
                               type="password"/>
                    </div>
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
                    <div className="form-group">
                        <div>

                            <input id={"male"} type="radio" name="gender" value="male"
                            /> Male<br/>
                            <input id={"female"}
                                   type="radio" name="gender" value="female"
                            /> Female
                        </div>
                    </div>
                    <button style={{
                        backgroundColor: "#26292B"
                    }} type={"submit"} className="btn btn-primary rounded-pill px-5">Sign up
                    </button>
                    <p>&nbsp;

                        Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
            <Footer/>
        </>
    )
}

