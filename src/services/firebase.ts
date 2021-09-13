import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAfpjNhy725PrcHZwJ1PUnDlCKL-iO-Wz8",
    authDomain: "letmeask-f935d.firebaseapp.com",
    databaseURL: "https://letmeask-f935d-default-rtdb.firebaseio.com",
    projectId: "letmeask-f935d",
    storageBucket: "letmeask-f935d.appspot.com",
    messagingSenderId: "1094627441307",
    appId: "1:1094627441307:web:5f1334ca37a4e2f7d3a43e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }