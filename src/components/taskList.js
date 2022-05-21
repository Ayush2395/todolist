import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { db } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function TaskList({ getTaskID }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useAppState();

  const collectionRef = collection(db, `task/${user.uid}/userTask`);
  const que = query(collectionRef, orderBy("timeStamp", "desc"));

  async function getAllTask() {
    onSnapshot(que, (snap) => {
      const data = snap.docs.map((todo) => ({
        ...todo.data(),
        id: todo.id,
      }));
      setTasks(data);
    });
  }

  useEffect(() => {
    getAllTask();
  }, []);

  function deleteTask(id) {
    const taskDoc = doc(collectionRef, id);
    return deleteDoc(taskDoc);
  }

  const deleteUsersTask = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Table responsive className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Tasks</th>
                <th>Status</th>
                <th>Edit/Delete</th>
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
                          getTaskID(item.id);
                        }}
                        variant="outline-warning"
                        className="mx-1"
                      >
                        <AiFillEdit />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteUsersTask(item.id);
                        }}
                        variant="outline-warning"
                        className="mx-1"
                      >
                        <AiFillDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
