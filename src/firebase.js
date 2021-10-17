import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBq2rixE8NsGsAWILi152Vwkcc-WWimYY0",
    authDomain: "whatsapp-react-e0a50.firebaseapp.com",
    projectId: "whatsapp-react-e0a50",
    storageBucket: "whatsapp-react-e0a50.appspot.com",
    messagingSenderId: "120199455564",
    appId: "1:120199455564:web:aaa5cbfe6b9f647103a5e9",
    measurementId: "G-KG2X1B3JSC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //Setting firebase as database
  const db = firebaseApp.firestore();

  //Setting firebase for authentication
  const auth = firebase.auth();

  //Setting google authentication
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth , provider };
  export default db;