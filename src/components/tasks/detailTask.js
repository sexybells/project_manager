import React, {useEffect, useState} from 'react';
import firebase from '../../helper/firebaseConfig'
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { taskStatus } from "../../config/taskConfig";

const DetailTask = () => {

    const task = firebase.firestore().collection('Tasks');
    const {id} = useParams();
    const [devList, setDevList] = useState([]);
    const [testerList, setTesterList] = useState([]);
    const [selectedDev, setSelectedDev] = useState([]);
    const [selectedTest, setSelectedTest] = useState([]);
    const [userList, setUserList] = useState([]);
    const [taskDetail, setTaskDetail] = useState({});
    const getDetailTask = async () => {
        await task.doc(id).get().then((querySnapshot) => {
            if (querySnapshot.exists) {
                setTaskDetail(querySnapshot.data());
            }
        })
    }

    const handleUpdateStatus = async () => {

    }

    const changeDev = async () => {

    }

    const changeTest = async () => {

    }

    useEffect(() => {
        getDetailTask()
    }, [id]);

    return (
      <Container>
          {taskDetail && (
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th width='20%'>Tiêu đề</th>
                    <td>{taskDetail.name}</td>
                </tr>
                <tr>
                    <th width='10%'>Nội dung</th>
                    <td>{taskDetail.description}</td>
                </tr>
                <tr>
                    <th width='10%'>Người phụ trách</th>
                    <td>{taskDetail.dev.label}</td>
                </tr>
                <tr>
                    <th width='10%'>Tester</th>
                    <td>{taskDetail.test.label}</td>
                </tr>
                <tr>
                    <th width='10%'>Trạng thái</th>
                    <td>{taskStatus[taskDetail.status]}</td>
                </tr>
                </thead>
            </table>
          )}

      </Container>
    )

}

export default DetailTask;
