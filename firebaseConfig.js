// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
 
const firebaseConfig = {
  apiKey: "AIzaSyC5Yth-YtjKZfJmffCT92Gl6p2juNajywE",
  authDomain: "crudaula01-c51eb.firebaseapp.com",
  databaseURL: "https://crudaula01-c51eb-default-rtdb.firebaseio.com",
  projectId: "crudaula01-c51eb",
  storageBucket: "crudaula01-c51eb.firebasestorage.app",
  messagingSenderId: "202860281562",
  appId: "1:202860281562:web:d0d66013d363c899302fe3",
  measurementId: "G-BKJLFM445T"
};
 
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
 
export { db };