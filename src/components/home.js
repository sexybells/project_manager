import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import firebase from "../helper/firebaseConfig";
import { useSelector } from "react-redux";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskListItem from "./tasks/taskListItem";
import Loading from "./loading";
const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const task = firebase.firestore().collection("Tasks");
  const initialValues = { name: "" };
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector(({ state }) => ({
    currentUser: state.currentUser,
  }));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("localUser")))

  const getTasks = async () => {
    setIsLoading(true);
    if (user.info.department) {
      await task
        .where(
          user.info.department + ".value",
          "==",
          `${currentUser.id}`
        )
        .get()
        .then((querySnapShot) => {
          if (querySnapShot.size > 0) {
            const result = [];
            querySnapShot.docs.map((v) => {
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
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getTasks();
  }, [currentUser]);
  return (
    <>
    {isLoading ? (
      <Loading />
    ) : (
    <Container>
      <Formik initialValues={{ name: "", key: "", status: 1 }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="form">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Tìm kiếm theo tên</label>
                  <input
                    name="name"
                    value={values.name}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Tìm kiếm theo từ khóa</label>
                  <input
                    name="key"
                    type="text"
                    value={values.key}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group m-1">
                  <label>Trạng thái</label>
                  <div className="d-flex justify-content-around">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={0}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={1}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Open
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={2}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      In Progress
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={3}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Resolved
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={4}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Reject
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={5}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Pause
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="status"
                      type="radio"
                      values={6}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Closed
                    </label>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group d-flex justify-content-center m-2">
              <button type="submit" className="btn btn-primary m-2">
                Tìm kiếm
              </button>
              {currentUser.info.role === "admin" && (
                <>
                  <Link to={"/register"} className="btn btn-primary m-2">
                    Thêm tài khoản
                  </Link>
                  <Link to={"/create-project"} className="btn btn-primary m-2">
                    Thêm dự án
                  </Link>
                </>
              )}
            </div>
          </form>
        )}
      </Formik>

      <TaskListItem list={taskList} />
    </Container>
    )}
    </>
  );
};

export default Home;
