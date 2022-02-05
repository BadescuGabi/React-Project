import {auth,database} from '../services/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {  ref, set } from "firebase/database";

export function signup(email, password, username, age,weight,height,gender) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user ={
                uid:userCredential.user.uid,
                email:email,
                username:username,
                age:age,
                weight:weight,
                height:height,
                gender:gender,
                activity:"",
                goal:"",
                calories:""
            };

           set(ref(database, "users/" + user.uid), {
               email: email,
               username: username,
               age: age,
               weight: weight,
               height: height,
               gender:gender,
               activity:"",
               goal:"",
               calories:""
           }). then(r =>console.log(database))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

export function signin(email, password) {

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function logout() {
    return auth.signOut()
}