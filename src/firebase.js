import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyA_2ZhAdJDrQji_uRIr1YHoYHxY1MEfvMQ",
    authDomain: "age-calculator-97e0d.firebaseapp.com",
    projectId: "age-calculator-97e0d",
    storageBucket: "age-calculator-97e0d.appspot.com",
    messagingSenderId: "555925692155",
    appId: "1:555925692155:web:011fb127cdd98299249a5e",
    measurementId: "G-W6NH71JYNF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebaseApp.firestore();