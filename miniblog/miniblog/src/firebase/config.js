import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBuIYGc9ooV-FasKM4njRIEBLj_SjXLGgU",
  authDomain: "miniblog-b38b9.firebaseapp.com",
  projectId: "miniblog-b38b9",
  storageBucket: "miniblog-b38b9.appspot.com",
  messagingSenderId: "1039702486542",
  appId: "1:1039702486542:web:859f4383d5791a8997965f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)//Firesore - serviço de banco de dados dentro do firebase

export{db}