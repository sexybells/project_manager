import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import firebase from "../helper/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskListItem from "./tasks/taskListItem";
import Loading from "./loading";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const task = firebase.firestore().collection("Tasks");
  const users = firebase.firestore().collection("Users");

  const initialValues = { name: "" };
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector(({ state }) => ({
    currentUser: state.currentUser,
  }));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("localUser")));
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch()
  const getTasks = async () => {
    setIsLoading(true);
    if (user.info.department) {
      await task
        .where(
          user.info.department + ".value",
          "==",
          `${currentUser.id}`,
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

  const fetchUsers = async () => {
    try {
      await users.get().then((querySnapshot) => {
        const result = [];
        if (querySnapshot.size > 0) {
          querySnapshot.docs.map((item) => {
            const params = {
              id: item.id,
              name: item.data().name,
              department: item.data().department,
            };
            result.push(params);
          });
          setUserList(result);
        }
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    const dev = [];
    const test = [];
    userList.map((v) => {
      const params = { value: v.id, label: v.name };

      if (v.department === "tester") {
        test.push(params);
      } else if (v.department === "dev") {
        dev.push(params);
      }
      dispatch({type: 'SET_DEV_LIST', payload: dev});
      dispatch({type: 'SET_TESTER_LIST', payload: test});
    });
  }, [userList]);

  useEffect(() => {
    getTasks();
    fetchUsers()
  }, [currentUser]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Formik
            initialValues={{ name: "", key: "", status: 1 }}
            onSubmit={(values) => {

            }}
          >
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
                            value={0}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            All
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="status"
                            type="radio"
                            value={1}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Open
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="status"
                            type="radio"
                            value={2}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            In Progress
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="status"
                            type="radio"
                            value={3}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Resolved
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="status"
                            type="radio"
                            value={4}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Reject
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="status"
                            type="radio"
                            value={5}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Pause
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="status"
                            type="radio"
                            value={6}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
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
