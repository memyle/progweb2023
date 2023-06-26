import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCio4M9GlqF_UrkDMRZ3YeGF6oTb4lpRyQ",
  authDomain: "progweb-1cb51.firebaseapp.com",
  projectId: "progweb-1cb51",
  storageBucket: "progweb-1cb51.appspot.com",
  messagingSenderId: "910194208066",
  appId: "1:910194208066:web:4f9823ab3358e342cbecdb",
  measurementId: "G-JRLS7195QV"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
