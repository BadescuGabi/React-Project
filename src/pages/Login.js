import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import {signin} from "../helpers/auth";
import {render} from "react-dom";
import "../css/Login.css"
import {Button, Form} from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [error,setError]=useState('');
    let email = useRef();
    const password = useRef();
    //
    // const handleEmailChange = ({ target }) => {
    //     email=target
    //
    // };
    // const handlePasswordChange = ({ target }) => {
    //     setPassword(target.value);
    // };
  async function handleSubmit(event) {
    event.preventDefault();
    setError({ error: '' });
    try {
        console.log(email.current.valueOf().value);
      await signin(email.current.valueOf().value, password.current.valueOf().value);

    } catch (error) {
      setError({ error: error.message });
    }
  }
  return (
// <>

//       <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" ref={email}/>
//               <Form.Text className="text-muted">
//                   We'll never share your email with anyone else.
//               </Form.Text>
//           </Form.Group>
//
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" ref={password} />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicCheckbox">
//               <Form.Check type="checkbox" label="Check me out" />
//           </Form.Group>
//           <Button variant="primary" type="submit" >
//               Submit
//           </Button>
//           <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
//       </Form>
//       </>
     <>   <Header/>
      <div className="container">
        <form className="mt-5 py-5 px-5" autoComplete="off" onSubmit={handleSubmit}>
        <h1>
        Login to Healthy Way
</h1>
    <p className="lead">Fill in the form below to login to your account.</p>
    <div className="form-group">

        <input  ref= {email} className="form-control" placeholder="Email" name="email" type="email"
        />
    </div>
    <div className="form-group">
        <input  ref={password} className="form-control" placeholder="Password" name="password"
                type="password"/>
    </div>
    <div className="form-group">

        <button style={{
            backgroundColor: "#26292B"
        }} type={"submit"} className="btn btn-primary rounded-pill px-5">Login</button>
    </div>
    <hr></hr>
    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
</form>
</div>
         <Footer/>
         </>
  )
}
