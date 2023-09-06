import React, {useEffect, useState} from 'react';
import firebase from '../../helper/firebaseConfig'
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { taskStatus } from "../../config/taskConfig";

const DetailTask = () => {

    const task = firebase.firestore().collection('Tasks');
    const {id} = useParams();
    const [taskDetail, setTaskDetail] = useState(null);
    const getDetailTask = async () => {
        console.log('text')
        await task.doc(id).get().then((querySnapshot) => {
            console.log(querySnapshot);
            if (querySnapshot.exists) {
                console.log(querySnapshot.data())
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
    }, []);


    return (
      <Container>
        {/* <button onClick={() => getDetailTask()}>Call api</button> */}
          {taskDetail !== null && (
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
