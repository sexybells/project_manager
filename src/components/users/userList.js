import React, {useEffect, useState} from 'react';
import firebase from '../../helper/firebaseConfig';
import { Container } from 'react-bootstrap';
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

        </Container>
    )


}

export default UserList;