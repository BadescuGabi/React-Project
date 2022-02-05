import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "firebase/database";
import {child, get, ref} from "firebase/database";
import {database} from "../services/firebase";
import "../css/Home.css"

export default function HomePage() {

    const [countUsers, setCountUsers] = useState(0);
    let i = 0;
    let countLight = 0, countNone = 0, countModerate = 0, countHeavy = 0;
    let countLose = 0, countMantain = 0, countGain = 0;

    function printUsers() {

        const dbRef = ref(database);
        get(child(dbRef, `users/`))
            .then((snapshot) => {
                snapshot.forEach((snap) => {
                    const userObject = snap.val();
                    i++;
                    setCountUsers(countUsers + i);
                    console.log(userObject["activity"]);
                });
            });
    }

    useEffect(() => {
        printUsers();

    }, []);

    return (

        <div>
            <Header/>
            <div className={"container"}>
                <h1>Welcome to Healthy Way</h1>
                <p>Healthy way is an online tool which calculates your daily calories based on your goals</p>
                <p>Currently there are {countUsers} users registered in our app</p>
            </div>
            <Footer/>
        </div>

    );

    // return (
    //     <div>
    //         <Header/>
    //         <section>
    //             <h1>Home page</h1>
    //         </section>
    //         <Footer/>
    //     </div>
    // )

}
