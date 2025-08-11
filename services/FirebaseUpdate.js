// services/FirebaseUpdate.js
import { db } from '../firebaseConfig';
import { update, ref } from 'firebase/database';
 
export default class FirebaseUpdate {
  static updateTask(id, title) {
    return update(ref(db, `tasks/${id}`), { title });
  }
}