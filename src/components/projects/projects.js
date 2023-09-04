import React, { useContext, useEffect, useState } from "react";
import firebase from "../../helper/firebaseConfig";
import { ProjectContext } from "../context/context";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Projects = () => {
  const [list, setList] = useState([]);
  const projects = firebase.firestore().collection("Projects");
  const { currentUser } = useContext(ProjectContext);
  const fetchProject = async () => {
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
          setList(result);
        }
      });
  };

  useEffect(() => {
    console.log(projects);
    fetchProject();
  }, []);

  return (
    <Container>
      <h2>Danh sách dự án</h2>
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

      {list.map((v) => (
        <table class="table">
  <thead class="thead-light">
    <tr>
      <th width='10%'>Key</th>
      <th width='100%'>Thông tin dự án</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td><Link to={`/detail-project/${v.id}`}>{v.name}</Link></td>
    </tr>
  </tbody>
</table>
      ))}
    </Container>
  );
};

export default Projects;
