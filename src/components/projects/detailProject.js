import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import firebase from "../../helper/firebaseConfig";
import data from "bootstrap/js/src/dom/data";
import TaskListItem from "../tasks/taskListItem";
import { useDispatch, useSelector } from "react-redux";

const DetailProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState([]);
  const taskFirebase = firebase.firestore().collection("Tasks");
  const { projectList } = useSelector(({ state }) => ({
    projectList: state.projectList,
  }));
  const [devList, setDevList] = useState([])
  const [testList, setTestList] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
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
              id: v.id,
            };
            result.push(params);
          });
          setTaskList(result);
        }
      }).catch((error) => console.log(error));
  };

  const fetchUserInProject = async () => {
    const currentProject = projectList.filter((v) => v.id === id);
    setCurrentProject(currentProject[0]);
    const params = {
      dev: currentProject[0].dev,
      test: currentProject[0].test
    }
    dispatch({type: 'SET_MEMBER_IN_PROJECT', payload: params})
  };

  useEffect(() => {
    fetchTasks();
    fetchUserInProject();
  }, [id]);

  return (
    <Container>
      <div className='row'>
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
        <div className='p-2'>
          <Link className={'btn btn-primary'} to={`/create-task/${id}`}>Create Task</Link>
        </div>
        <TaskListItem list={taskList} />
      </div>
    </Container>
  );
};

export default DetailProject;
