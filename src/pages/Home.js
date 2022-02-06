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
    const [countLight,setCountLight]=useState(0);
    const [countNone,setCountNone]=useState(0);
    const [countModerate,setCountModerate]=useState(0);
    const [countHeavy,setCountHeavy]=useState(0);
    const [countLose,setCountLose]=useState(0);
    const [countMaintain,setCountMaintain]=useState(0);
    const [countGain,setCountGain]=useState(0);
    let countLight1 = 0, countNone1 = 0, countModerate1 = 0, countHeavy1 = 0;
    let countLose1 = 0, countMaintain1 = 0, countGain1 = 0;

    function printUsers() {

        const dbRef = ref(database);
        get(child(dbRef, `users/`))
            .then((snapshot) => {
                snapshot.forEach((snap) => {
                    const userObject = snap.val();
                    i++;
                    console.log(userObject["goal"]);
                    setCountUsers(countUsers + i);
                    if(userObject["activity"]==="none"){
                        countNone1++;
                        setCountNone(countNone+countNone1);
                    }
                    if(userObject["activity"]==="light"){
                        countLight1++;
                        setCountLight(countLight+countLight1);
                    }
                    if(userObject["activity"]==="moderate"){
                        countModerate1++;
                        setCountModerate(countModerate+countModerate1);
                    }
                    if(userObject["activity"]==="heavy"){
                        countHeavy1++;
                        setCountHeavy(countHeavy+countHeavy1);
                    }
                    if(userObject["goal"]==="lose"){
                        countLose1++;
                        setCountLose(countLose+countLose1);
                    }
                    if(userObject["goal"]==="maintain"){
                        countMaintain1++;
                        setCountMaintain(countMaintain+countMaintain1);
                    }
                    if(userObject["goal"]==="gain"){
                        countGain1++;
                        setCountGain(countGain+countGain1);
                    }
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
                <p>Our users have set the following activity:</p>

                    <ul>{countNone} doesn't have activity</ul>
                    <ul>{countLight} have light activity</ul>
                    <ul>{countModerate} have moderate activity</ul>
                    <ul>{countHeavy} have hard activity</ul>
              <p>And the following objectives:</p>
                    <ul>{countLose} have loss weight objective</ul>
                    <ul>{countMaintain} have to keep their current weight </ul>
                    <ul>{countGain} want to gain weight</ul>
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
