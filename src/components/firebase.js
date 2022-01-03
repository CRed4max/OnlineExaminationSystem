import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB9hJiLvp42n4EJ1yhupU4Fp7Mgml-lsm0",
    authDomain: "onlineexaminationsystem-60648.firebaseapp.com",
    databaseURL: "https://onlineexaminationsystem-60648-default-rtdb.firebaseio.com",
    projectId: "onlineexaminationsystem-60648",
    storageBucket: "onlineexaminationsystem-60648.appspot.com",
    messagingSenderId: "177347779259",
    appId: "1:177347779259:web:eef1a0c1a3570cecd0e79e"
};


const app = initializeApp(firebaseConfig);
export default app;