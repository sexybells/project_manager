import React, {useEffect, useState} from 'react'
import {ProjectContext} from '../context/context'
import firebase from '../../helper/firebaseConfig'
import { useSelector } from 'react-redux';

const ProjectProvider = ({children}) => {

    const users = firebase.firestore().collection('Users');
    const projects = firebase.firestore().collection('Projects');
    const tasks = firebase.firestore().collection('Tasks');
    const [devList, setDevList] = useState([]);
    const [testerList, setTesterList] = useState([]);
    const [selectedDev, setSelectedDev] = useState([]);
    const [selectedTest, setSelectedTest] = useState([]);
    const [userList, setUserList] = useState([]);
    const {currentUser} = useSelector(({state}) => ({
        currentUser: state.currentUser,
    }))
    
    const fetchUsers = async () => {
        try {
          await users.get().then((querySnapshot) => {
                const result = [];
            if (querySnapshot.size > 0) {
              querySnapshot.docs.map((item) => {
                const params = {
                  id: item.id,
                  name: item.data().name,
                  department: item.data().department
                }
                result.push(params);
              });
              setUserList(result);
            }
            console.log(result)
          })
        } catch (errors) {
          console.log(errors);
        }
    
      }
      useEffect(() => {
        fetchUsers();
      }, [])
    
      useEffect(() => {
        const dev = [];
        const test = [];
        userList.map((v) => {
          const params = {value: v.id, label: v.name}
    
          if (v.department === 'tester') {
            test.push(params)
          } else if (v.department === 'dev') {
            dev.push(params);
          }
          setDevList(dev);
          setTesterList(test);
        })
      }, [userList])

      console.log(userList);
    const contextValues = {
        devList,
        testerList,
        selectedDev,
        selectedTest,
        setSelectedDev,
        selectedTest
    }

    return (
        <ProjectContext.Provider value={contextValues}>
            {children}
        </ProjectContext.Provider>
    )

}

export default ProjectProvider;