// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBuBjfatNKP4shmJM2GqYW3rD_b3v56_q4",
    authDomain: "appjapones-1df67.firebaseapp.com",
    projectId: "appjapones-1df67",
    storageBucket: "appjapones-1df67.appspot.com",
    messagingSenderId: "526621691561",
    appId: "1:526621691561:web:1d53d9b509bae2275ae3b8"
  };
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
// Inicializa o Firestore
const db = getFirestore(app);
export { db };
