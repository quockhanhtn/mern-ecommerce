import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

// const firebaseConfig = {
//   databaseURL: '',
//   apiKey: '',
//   authDomain: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '',
//   measurementId: ''
// };
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
if (!firebaseConfig) {
  console.error('Please set up your firebase config in .env file');
}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage, firebase as default };
