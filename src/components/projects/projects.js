import React, { useContext, useEffect, useState } from "react";
import firebase from "../../helper/firebaseConfig";
import { ProjectContext } from "../context/context";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditProject from "./editProject";

const Projects = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const projects = firebase.firestore().collection("Projects");
  const [isModal, setIsModal] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const { currentUser } = useSelector(({ state }) => ({
    currentUser: state.currentUser,
  }));
  const fetchProject = async () => {
    if (currentUser.info) {
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
              console.log(v.data());
              const data = v.data();
              const params = {
                name: data.name,
                dev: data.dev,
                test: data.test,
                id: v.id,
              };
              result.push(params);
            });
            setList(result);
            dispatch({ type: "SET_PROJECT_LIST", payload: result });
          }
        });
    }
  };

  const openEditModal = (id) => {
    const current = list.filter((v) => v.id === id);
    console.log(current);
    setCurrentProject(current[0]);
    setIsModal(true);
  };

  const closeEditModal = () => {
    console.log('close')
    setIsModal(false);
  };
  console.log(currentUser);
  useEffect(() => {
    fetchProject();
  }, [currentUser]);

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
          <button type="submit" className="btn btn-primary">
            Tìm kiếm
          </button>
        </div>
      </form>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th width="10%">STT</th>
            <th>Thông tin dự án</th>
            <th>Số lượng thành viên</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {list.map((v, k) => (
            <tr key={k}>
              <th scope="row">{k + 1}</th>
              <td>
                <Link to={`/detail-project/${v.id}`}>{v.name}</Link>
              </td>
              <th className="align-center">{v.dev.length + v.test.length}</th>

                <th className="align-center">
                  <button
                    onClick={() => openEditModal(v.id)}
                    className="btn btn-info"
                  >
                    Chỉnh sửa
                  </button>
                </th>
            </tr>
          ))}
        </tbody>
      </table>
      <EditProject
        isModal={isModal}
        currentProject={currentProject}
        closeEditModal={closeEditModal}
      />
    </Container>
  );
};

export default Projects;
