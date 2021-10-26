import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  databaseURL: 'gs://mern-ecommerce-b848d.appspot.com',
  apiKey: 'AIzaSyAzbkFs8eUKq4G9RYIV9uhiw-juG02LWcE',
  authDomain: 'mern-ecommerce-b848d.firebaseapp.com',
  projectId: 'mern-ecommerce-b848d',
  storageBucket: 'mern-ecommerce-b848d.appspot.com',
  messagingSenderId: '121156975071',
  appId: '1:121156975071:web:a323dcff880e0bf6876c6a',
  measurementId: 'G-JYP6NTSNJ0'
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
