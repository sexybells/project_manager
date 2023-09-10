import React, { useEffect, useState } from "react";
import firebase from "../../helper/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { taskStatus } from "../../config/taskConfig";
import { parseInt } from "lodash";
import Select from 'react-select'
const bgr = {
  1: "btn btn-success",
  2: "btn btn-secondary",
  3: "btn btn-primary",
  4: "btn btn-dark",
  5: "btn btn-light",
  6: "btn btn-danger",
  7: "btn btn-info",
};
const DetailTask = () => {

  const task = firebase.firestore().collection("Tasks");
  const { id } = useParams();
  const [taskDetail, setTaskDetail] = useState(null);
  const projects = firebase.firestore().collection('Projects');
  const [devList, setDevList] = useState([]);
  const [testList, setTestList] = useState([]);
  const getDetailTask = async () => {
    await task.doc(id).get().then((querySnapshot) => {
      if (querySnapshot.exists) {
        setTaskDetail(querySnapshot.data());
        fetchMemberInProject(querySnapshot.data().projectId);
      }
    });
  };

  const handleUpdateStatus = async (status) => {
      // status.target.value
      await task.doc(id).update({
          status: parseInt(status.target.value)
      }).then(() => {
        alert('Thay đổi thành công')
      })
  };

  const fetchMemberInProject = async (projectId) => {
    await projects.doc(projectId).get().then((querySnapshot) => {
      setDevList(querySnapshot.data().dev);
      setTestList(querySnapshot.data().test);
    })
  }

  const changeDev = async (selected) => {
    await task.doc(id).update({
      dev: selected
  }).then(() => {
    alert('Thay đổi thành công')
  })
  };

  const changeTest = async (selected) => {
    await task.doc(id).update({
      test: selected
  }).then(() => {
    alert('Thay đổi thành công')
  })
  };

  useEffect(() => {
    getDetailTask();
  }, [id]);


  return (
    <Container>
      {/* <button onClick={() => getDetailTask()}>Call api</button> */}
      {taskDetail !== null && (
        <table className="table">
          <thead className="thead-light">
          <tr>
            <th width="20%">Tiêu đề</th>
            <td>{taskDetail.name}</td>
            <td>Sửa</td>
          </tr>
          <tr>
            <th width="10%">Nội dung</th>
            <td>{taskDetail.description}</td>
          </tr>
          <tr>
            <th width="10%">Người phụ trách</th>
            <td>
            <div style={{width: '30%'}}>
            <Select
                classNamePrefix='select'
                name='developer'
                placeholder='Select Dev'
                options={devList}
                defaultValue={taskDetail.dev}
                onChange={(select) => changeDev(select)}
              />
            </div>
              </td>
          </tr>
          <tr>
            <th width="10%">Tester</th>
            <td>              
              <div style={{width: '30%'}}>
              <Select
                classNamePrefix='select'
                name='developer'
                placeholder='Select Dev'
                options={testList}
                defaultValue={taskDetail.test}
                onChange={(select) => changeTest(select)}
              />
              </div>
              </td>
          </tr>
          <tr>
            <th width="10%">Trạng thái</th>
            <td>
              <select onChange={(item) => handleUpdateStatus(item)} defaultValue={taskDetail.status} className="form-select" style={{ width: "20%" }} aria-label="Default select example">
                <option value={1} selected={taskDetail.status === 1}>Open</option>
                <option value={2} selected={taskDetail.status === 2}>In Progress</option>
                <option value={3} selected={taskDetail.status === 3}>Resolved</option>
                <option value={4} selected={taskDetail.status === 4}>Reject</option>
                <option value={5} selected={taskDetail.status === 5}>Paused</option>
                <option value={6} selected={taskDetail.status === 6}>Closed</option>
              </select>
            </td>
          </tr>
          </thead>
        </table>
      )}

    </Container>
  );

};

export default DetailTask;
