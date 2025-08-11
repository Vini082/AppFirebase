// services/FirebaseCreate.js
import { db } from '../firebaseConfig';
import { ref, push } from 'firebase/database';
 
export default class FirebaseCreate {
  static addTask(title) {
    return push(ref(db, 'tasks/'), { title });
  }
}