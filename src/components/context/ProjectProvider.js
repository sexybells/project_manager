import React, { useEffect, useState } from "react";
import { ProjectContext } from "../context/context";
import firebase from "../../helper/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectProvider = ({ children }) => {
  const users = firebase.firestore().collection("Users");
  const projects = firebase.firestore().collection("Projects");
  const tasks = firebase.firestore().collection("Tasks");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [devList, setDevList] = useState([]);
  const [testerList, setTesterList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);
  const { currentUser } = useSelector(({ state }) => ({
    currentUser: state.currentUser,
  }));

  const setUser = () => {
   return new Promise((resolve, reject) => {
      resolve(1);
      try {
        const localUser = localStorage.getItem("localUser");
        if (localUser) {
           dispatch({
            type: "SET_CURRENT_USER",
            payload: JSON.parse(localUser),
          });
          // return navigate("/");
        } else {
          // return navigate("/login");
        }
      } catch(e) {
        reject(1);
      }
    })
  };

  const fetchUsers = async () => {
    try {
      await users.get().then((querySnapshot) => {
        const result = [];
        if (querySnapshot.size > 0) {
          querySnapshot.docs.map((item) => {
            const params = {
              id: item.id,
              name: item.data().name,
              department: item.data().department,
            };
            result.push(params);
          });
          setUserList(result);
        }
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  const getProject = async () => {
    if (currentUser.info) {
      await projects
      .where(currentUser.info.department, "array-contains", {
        value: `${currentUser.id}`,
        label: currentUser.info.name,
      })
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const result = [];
          querySnapshot.docs.map((v) => {
            const data = v.data();
            const params = {
              name: data.name,
              dev: data.dev,
              test: data.test,
              id: v.id
            };
            result.push(params);
          });
          setProjectList(result);
        }
      });
    }
  };


  useEffect(() => {
    // setUser().then(() =>  {
    //   debugger;
      if (currentUser) {
        fetchUsers();
        
        // getProject();
      }
    // });
  }, [currentUser]);

  useEffect(() => {
    const dev = [];
    const test = [];
    userList.map((v) => {
      const params = { value: v.id, label: v.name };

      if (v.department === "tester") {
        test.push(params);
      } else if (v.department === "dev") {
        dev.push(params);
      }
      setDevList(dev);
      setTesterList(test);
    });
  }, [userList]);

  const contextValues = {
    devList,
    testerList,
    currentUser,
    projectList
  };

  return (
    <ProjectContext.Provider value={contextValues}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
