import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import firebase from "firebase/app";
import "firebase/database";
import {child, get, ref} from "firebase/database";
import {database} from "../services/firebase";

export default function HomePage() {

        const [designers, setDesigners] = useState([]);

        function printUsers() {

            const dbRef = ref(database);
            get(child(dbRef ,`users/`))
                .then((snapshot) => {
                snapshot.forEach((snap) => {
                    const userObject = snap.val();
                    console.log(userObject);
                });
            });
        }
        useEffect(() => {
            printUsers();

        }, []);

        return (
            <div>
                <h2>The designer are...</h2>
                <ul>
                    {designers.map((designerObject) => {
                        return <li>{designerObject.name}</li>;
                    })}
                </ul>
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
