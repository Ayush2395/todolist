import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Container, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import AddTodo from "../components/addTodo";
import TaskList from "../components/taskList";
import { useAppState } from "../context/AppState";

export default function Todo() {
  const { user, logOutUser } = useAppState();
  const [toast, setToast] = useState(false);
  const [taskId, setTaskId] = useState("");
  const navigate = useNavigate();

  function getTaskID(id) {
    setTaskId(id);
  }

  const logOut = async () => {
    try {
      await logOutUser();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleProfileCheck = () => {
    if (user.displayName === null) {
      setToast(true);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser.emailVerified) {
        navigate("/verifyemail");
      } else if (currentUser.emailVerified) {
        navigate("/todo");
      }
    });
    handleProfileCheck();
  }, []);
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          {toast ? (
            <Toast onClick={() => setToast("")}>
              <Toast.Header>
                <img src="#" className="rounded me-2" alt="" />
                <strong className="me-auto">Todo</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Setup your Profile first</Toast.Body>
            </Toast>
          ) : null}
          <Button onClick={logOut} variant="outline-warning">
            Logout
          </Button>
          <Button as={Link} className="mx-3" to="/settings">
            Profile Setting
          </Button>
          <AddTodo id={taskId} setID={setTaskId} />
          <TaskList getTaskID={getTaskID} />
        </div>
      </Container>
    </>
  );
}
