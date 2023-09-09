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
