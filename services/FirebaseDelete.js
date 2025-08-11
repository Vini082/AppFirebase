// services/FirebaseDelete.js
import { db } from '../firebaseConfig';
import { remove, ref } from 'firebase/database';
 
export default class FirebaseDelete {
  static deleteTask(id) {
    return remove(ref(db, `tasks/${id}`));
  }
}
 