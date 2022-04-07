import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

const collectionRef = collection(db, "task");

class firebaseService {
  addTask(newTask) {
    return addDoc(collectionRef, newTask);
  }

  getAllTask() {
    return getDocs(collectionRef);
  }

  getOneTask(id) {
    const taskDoc = doc(collectionRef, id);
    return getDoc(taskDoc);
  }

  updateTask(id, updatedTask) {
    const taskDoc = doc(collectionRef, id);
    return updateDoc(taskDoc, updatedTask);
  }

  deleteTask(id) {
    const taskDoc = doc(collectionRef, id);
    return deleteDoc(taskDoc);
  }
}

export default new firebaseService();
