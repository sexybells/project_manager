import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import firebase from "../helper/firebaseConfig";
import { useSelector } from "react-redux";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskListItem from "./tasks/taskListItem";
const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const task = firebase.firestore().collection('Tasks')
    const initialValues = {name: ''}
    const {currentUser} = useSelector(({state}) => ({
      currentUser: state.currentUser,
  }));

  const getTasks = async () => {
    if (currentUser) {
      await task.where(currentUser.info.department + '.value', '==', `${currentUser.id}`)
        .get().then((querySnapShot) => {
          if (querySnapShot.size > 0) {
            const result = [];
            querySnapShot.docs.map((v) => {
              const data = v.data();
              const params = {
                name: data.name,
                description: data.description,
                dev: data.dev,
                test: data.test,
                status: data.status,
                id: v.id
              }
              result.push(params);
            });
            setTaskList(result);
          }
        })
    }
  }

  useEffect(() => {
      getTasks()
  }, [currentUser]);
  return (
      <Container>

        <form className="form">
          <div className="form-group">
            <label>Tìm kiếm theo tên</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Tìm kiếm theo từ khóa</label>
            <input className="form-control" />
          </div>
          <div className="form-group d-flex justify-content-center m-2">
              <button type="submit" className="btn btn-primary m-2">Tìm kiếm</button>
              <Link to={'/register'} className="btn btn-primary m-2">Create user</Link>
              <Link to={'/create-project'} className="btn btn-primary m-2">Them du an</Link>
          </div>
        </form>
        <TaskListItem list={taskList} />
      </Container>
  );
};

export default Home;
