import { ref, remove, set } from "firebase/database";
import { uid } from "uid";
import { auth, db } from "./firebase.config";

const uuid = uid();

class firebaseService {
  addTask(newTask) {
    return set(ref(db, `/${auth.currentUser.uid}/${uuid}`), newTask);
  }

  deleteTask = (id) => {
    return remove(ref(db, `/${auth.currentUser.uid}/${id}`));
  };
}

export default new firebaseService();
