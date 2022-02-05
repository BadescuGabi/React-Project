import React, {Component, useEffect, useState} from 'react';
import {
    Route, BrowserRouter as Router, Switch, Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Calculator from "./pages/Calculator";
import EditProfile from "./pages/EditProfile";
import {auth} from './services/firebase';
import {render} from "react-dom";
import UserHistory from "./pages/UserHistory";

function PrivateRoute({component: Component, authenticated, ...rest}) {

    return (
        <Route
            {...rest}
            render={(props) => authenticated===true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', }}/>}
        />
    )
}

function PublicRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/profile'/>}
        />
    )
}

function App() {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);
    useEffect(() =>
    {
        auth.onAuthStateChanged((user) => {
            if (user) {

                setAuthenticated(true)
                setLoading(false)
            } else {
                setAuthenticated(false)
                setLoading(false)
            }
        })

    })
        return loading.valueOf() === true ? <h2>Loading...</h2> : (

            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute path="/profile" authenticated={authenticated} component={Profile}/>
                    <PrivateRoute path="/userHistory" authenticated={authenticated} component={UserHistory}/>
                    <PrivateRoute path="/calculator" authenticated={authenticated} component={Calculator}/>
                    <PrivateRoute path="/edit" authenticated={authenticated} component={EditProfile}/>
                    <PublicRoute path="/signup" authenticated={authenticated} component={Signup}/>
                    <PublicRoute path="/login" authenticated={authenticated} component={Login}/>
                </Switch>

            </Router>
        );

}
export default App;
