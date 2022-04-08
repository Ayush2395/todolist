import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import { auth, db } from "../service/firebase.config";
import { FiEdit, FiDelete } from "react-icons/fi";
import { onValue, ref, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import firebaseService from "../service/firebase.service";

function ListTask({ getTaskId }) {
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllTask();
    setLoader(false);
  }, []);

  const getAllTask = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snap) => {
          setTasks([]);
          const data = snap.val();
          if (data != null) {
            Object.values(data).map((doc) =>
              setTasks((oldArray) => [...oldArray, doc])
            );
          }
        });
      }
    });
  };

  const handleDeleteTask = (id) => {
    firebaseService.deleteTask(id);
  };

  return (
    <div className="mt-3 text-center">
      <Card>
        <Card.Body>
          {loader ? (
            <Button
              disabled
              className="d-block mb-3"
              variant="outline-secondary"
            >
              <Spinner
                animation="border"
                size="sm"
                role="status"
                as="span"
                aria-hidden="true"
              />
              Refreshing...
            </Button>
          ) : (
            <Button
              onClick={() => {
                setLoader(true);
                getAllTask();
              }}
              className="mb-3 btn-secondary d-block"
            >
              Refresh
            </Button>
          )}

          <p className="d-block fs-3">Your Task list</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Your Task</th>
                <th>Status</th>
                <th>Edit/delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                return (
                  <tr key={task.uuid}>
                    <td>{index + 1}</td>
                    <td>{task.task}</td>
                    <td>{task.status}</td>
                    <td>
                      <Button
                        onClick={() => {
                          getTaskId(task.uuid);
                        }}
                        className="mx-1 btn-warning"
                      >
                        <FiEdit />
                      </Button>
                      <Button
                        onClick={() => {
                          handleDeleteTask(task.uuid);
                        }}
                        className="mx-1 btn-danger"
                      >
                        <FiDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListTask;
