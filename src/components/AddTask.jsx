import { serverTimestamp } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Card, Form } from "react-bootstrap";
import { uid } from "uid";
import firebaseService from "../service/firebase.service";

function AddTask({ id, setID }) {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const uuid = uid();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    if (task === "") {
      setMessage({ error: true, msg: "type your task" });
      return;
    }

    const newTask = { task, status, timeStamp: serverTimestamp(), uuid };

    // try {
    //   if (id !== undefined && id !== "") {
    //     await firebaseService.updateTask(id, newTask);
    //     setMessage({ error: false, msg: "Your task is Updated" });
    //     setID("");
    //   } else {
    //     await firebaseService.addTask(newTask);
    //     setMessage({ error: false, msg: "Your task added" });
    //   }
    // } catch (err) {
    //   setMessage({ error: true, msg: err.message });
    // }

    try {
      if (id !== undefined && id !== "") {
        await firebaseService.addTask(newTask);
        setMessage({ error: false, msg: "Task added in database" });
        setID("");
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }

    setTask("");
  };

  return (
    <div>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <Card>
        <Card.Body>
          <h1 className="w-100">Add Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                value={task}
                onChange={(e) => setTask(e.target.value)}
                type="text"
                placeholder="type your task here"
              />
            </Form.Group>
            <ButtonGroup className="mb-3 w-100">
              <Button
                disabled={flag}
                onClick={() => {
                  setFlag(true);
                  setStatus("Checked");
                }}
                variant="outline-success"
              >
                Checked
              </Button>
              <Button
                disabled={!flag}
                onClick={() => {
                  setFlag(false);
                  setStatus("Unchecked");
                }}
                variant="outline-danger"
              >
                Unchecked
              </Button>
            </ButtonGroup>
            <Button className="w-100" type="submit" variant="primary">
              Add Task
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddTask;
