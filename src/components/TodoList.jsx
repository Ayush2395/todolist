import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthState";
import { auth } from "../service/firebase.config";
import AddTask from "./AddTask";
import ListTask from "./ListTask";

function TodoList() {
  const [taskId, setTaskId] = useState("");
  const getTaskId = (id) => {
    setTaskId(id);
  };

  const { logOut, user } = useAuthContext();
  const navigate = useNavigate("");

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (!user) {
        navigate("/");
      }
    });
  });
  return (
    <div>
      <Container
        className="my-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Button onClick={handleLogOut} className="mb-3 btn-info">
            Log out
          </Button>
          <AddTask id={taskId} setID={setTaskId} />
          <ListTask getTaskId={getTaskId} />
        </div>
      </Container>
    </div>
  );
}

export default TodoList;
