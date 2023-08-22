// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgACQkKqxWdnS4wqlch83PO1xjUDXNWUo",
  authDomain: "project-manager-338007.firebaseapp.com",
  projectId: "project-manager-338007",
  storageBucket: "project-manager-338007.appspot.com",
  messagingSenderId: "288909511924",
  appId: "1:288909511924:web:1a08bd7329e805f1f1a2a1",
  measurementId: "G-4HJSMX8KNS"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

export default firebase