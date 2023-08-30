import React from 'react';
import firebase from '../../helper/firebaseConfig'
const CreateTask = () => {

    const task = firebase.firestore().collection('Tasks');
    const users = firebase.firestore().collection('Users');


    

}

export default CreateTask;