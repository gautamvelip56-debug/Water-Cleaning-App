
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGtCdaQqADh_bL3_4KB2rzX0B8DqnMupo",
  authDomain: "it-project-862ca.firebaseapp.com",
  projectId: "it-project-862ca",
  storageBucket: "it-project-862ca.firebasestorage.app",
  messagingSenderId: "963777202663",
  appId: "1:963777202663:web:7de45baf6cd3d1f9c11542",
  measurementId: "G-9L6RPCJ3H6"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export default app;
