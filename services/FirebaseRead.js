// services/FirebaseRead.js
import { db } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
 
export default class FirebaseRead {
  static listenTasks(callback) {
    const tasksRef = ref(db, 'tasks/');
    return onValue(tasksRef, snapshot => {
      const data = snapshot.val() || {};
      callback(data);
    });
  }
}