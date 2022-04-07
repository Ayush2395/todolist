import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function App() {
  const [taskId, setTaskId] = useState("");
  const getTaskId = (id) => {
    setTaskId(id);
  };
  return (
    <div>
      <Container
        className="my-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <AddTask id={taskId} setID={setTaskId} />
          <ListTask getTaskId={getTaskId} />
        </div>
      </Container>
    </div>
  );
}

export default App;
