// Firebase Configuration
// Project: monitoring-iot-29ac6

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

  const firebaseConfig = {
  apiKey: "AIzaSyAGTi8kBghILclmxI519CRnkhTlq2ToSm8",
  authDomain: "organisasi-papua-memanci-c7abf.firebaseapp.com",
  databaseURL: "https://organisasi-papua-memanci-c7abf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "organisasi-papua-memanci-c7abf",
  storageBucket: "organisasi-papua-memanci-c7abf.firebasestorage.app",
  messagingSenderId: "569705444659",
  appId: "1:569705444659:web:d99487a2e7241a2f1e3a46"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
