import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Card, Form } from "react-bootstrap";
import { uid } from "uid";
import { db } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";

export default function AddTodo({ id, setID }) {
  const [flag, setFlag] = useState(false);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const { error, setError, user } = useAppState();
  const uuid = uid(8);
  const collectionRef = collection(db, `task/${user.uid}/userTask`);
  // const collectionRef = collection(db, `testtask`);

  const addNewtask = (newTask) => {
    return addDoc(collectionRef, newTask);
  };

  const updateTask = (id, task) => {
    const taskDoc = doc(collectionRef, id);
    return updateDoc(taskDoc, task);
  };

  const getSingleDoc = (id) => {
    const taskDoc = doc(collectionRef, id);
    return getDoc(taskDoc);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    setError("");

    if (task === "") {
      return setError({ error: true, msg: "Your task field is empty" });
    }

    const newTask = {
      task: task,
      status: status,
      timeStamp: serverTimestamp(),
    };

    try {
      if (id !== undefined && id !== "") {
        await updateTask(id, newTask);
        setID("");
        setError({ error: false, msg: "Task updated" });
      } else {
        await addNewtask(newTask);
        setError({ error: false, msg: "Task added" });
      }
    } catch (err) {
      setError({ error: true, msg: err.message });
    }

    setTask("");
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
      handleEditTask();
    }
  }, [id]);

  const handleEditTask = async () => {
    const snap = await getSingleDoc(id);
    setTask(snap.data().task);
    setStatus(snap.data().status);
  };

  return (
    <>
      {error?.msg && (
        <Alert
          variant={error?.error ? "danger" : "success"}
          dismissible
          onClose={() => {
            setError("");
          }}
        >
          {error?.msg}
        </Alert>
      )}
      <Card>
        <Card.Body>
          <h1>{user.displayName}'s Todo List</h1>
          <Form onSubmit={handleAddTask}>
            <Form.Group className="mb-3">
              <Form.Control
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Type your task here"
              />
            </Form.Group>
            <ButtonGroup className="mb-3 w-100">
              <Button
                disabled={flag}
                onClick={() => {
                  setFlag(true);
                  setStatus("checked");
                }}
                variant="success"
              >
                Checked
              </Button>
              <Button
                disabled={!flag}
                onClick={() => {
                  setFlag(false);
                  setStatus("unchecked");
                }}
                variant="danger"
              >
                Unchecked
              </Button>
            </ButtonGroup>
            <Button type="submit" className="mb-3 w-100">
              Add Task
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
