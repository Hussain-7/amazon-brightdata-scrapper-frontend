import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtNj_ik96mBhZbgN_cU-zc6UYwVYdkh_k",
  authDomain: "brightdata--scrapper-7d154.firebaseapp.com",
  projectId: "brightdata--scrapper-7d154",
  storageBucket: "brightdata--scrapper-7d154.appspot.com",
  messagingSenderId: "834453137161",
  appId: "1:834453137161:web:63963e580281441db915d8",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
