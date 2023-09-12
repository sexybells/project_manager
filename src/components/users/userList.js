import React, {useEffect, useState} from 'react';
import firebase from '../../helper/firebaseConfig';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { taskStatus } from "../../config/taskConfig";
const UserList = () => {

    const users = firebase.firestore().collection('Users');
    const [userList, setUserList] = useState([])
    const fetchData = async () => {
        await users.get().then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                const result = [];
                querySnapshot.docs.map((v) => {
                    const data = v.data();
                    const params = {
                        name: data.name,
                        email: data.email,
                        id: v.id,
                        role: data.role,
                        department: data.department
                    }
                    result.push(params);
                })
                setUserList(result);
            }
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Container>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Họ Tên</th>
                    <th>Email</th>
                    <th>Bộ Phận</th>
                    <th>Vị trí</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((v, k) => (
                  <tr key={k}>
                      <td>{v.name}</td>
                      <td>{v.email}</td>
                      <td>{v.department}</td>
                      <td>
                          {v.role}
                      </td>
                  </tr>
                ))}
                </tbody>
            </table>
        </Container>
    )


}

export default UserList;
