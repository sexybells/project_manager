import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DetailProject = () => {
    return (
        <Container>
            <Link to={'/create-task'}>Create Task</Link>
        </Container>
    )
}

export default DetailProject; 