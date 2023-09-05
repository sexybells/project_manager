import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import firebase from "../../helper/firebaseConfig";
import data from "bootstrap/js/src/dom/data";
import TaskListItem from "../tasks/taskListItem";

const DetailProject = () => {
  const { id } = useParams();
  const [taskList, setTaskList] = useState([]);
  const taskFirebase = firebase.firestore().collection("Tasks");

  const fetchTasks = async () => {
    await taskFirebase.where("projectId", "==", id).get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const result = [];
          querySnapshot.docs.map((v) => {
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
      }).catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

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
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Tìm kiếm</button>
        </div>
      </form>
      <Link to={`/create-task/${id}`}>Create Task</Link>
      <TaskListItem list={taskList} />
    </Container>
  );
};

export default DetailProject;
