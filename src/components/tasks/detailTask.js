import React, {useEffect, useState} from 'react';
import firebase from '../../helper/firebaseConfig'

const DetailTask = () => {
    
    const task = firebase.firestore().collection('Tasks');
    const [devList, setDevList] = useState([]);
    const [testerList, setTesterList] = useState([]);
    const [selectedDev, setSelectedDev] = useState([]);
    const [selectedTest, setSelectedTest] = useState([]);
    const [userList, setUserList] = useState([]);
    const getDetailTask = async () => {

    }

    const handleUpdateStatus = async () => {

    }

    const changeDev = async () => {

    }

    const changeTest = async () => {

    }


    return (
        <>
        
        </>
    )

}

export default DetailTask;