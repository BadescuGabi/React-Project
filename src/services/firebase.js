import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const config = {
  apiKey: "AIzaSyCu-nZJ1oU-wCxp9U1cYZEf3Dt5uoku0hk",
  authDomain: "project-react-ef769.firebaseapp.com",
  projectId: "project-react-ef769",
  databaseURL: "https://project-react-ef769-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "project-react-ef769.appspot.com",
  messagingSenderId: "72245839548",
  appId: "1:72245839548:web:af811fec12af6a93a8b2b9"
};

export const app = initializeApp(config);

// Get a reference to the database service
export const database = getDatabase(app);
export const auth=getAuth();
