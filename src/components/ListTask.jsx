import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import { db } from "../service/firebase.config";
import { FiEdit, FiDelete } from "react-icons/fi";
import firebaseService from "../service/firebase.service";

function ListTask({ getTaskId }) {
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const collectionRef = collection(db, "task");
  const que = query(collectionRef, orderBy("timeStamp", "desc"));

  useEffect(() => {
    getAllTask();
    setLoader(false);
  }, []);

  const getAllTask = async () => {
    // const data = await firebaseService.getAllTask();
    // setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // setLoader(false)
    onSnapshot(que, (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(data);
      setLoader(false);
    });
  };

  const delteTask = async (id) => {
    await firebaseService.deleteTask(id);
    getAllTask();
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
                getAllTask();
                setLoader(true);
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button
                        onClick={() => {
                          getTaskId(item.id);
                        }}
                        variant="warning"
                        className="mx-1"
                      >
                        <FiEdit />
                      </Button>
                      <Button
                        onClick={() => {
                          delteTask(item.id);
                        }}
                        variant="danger"
                        className="mx-1"
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
