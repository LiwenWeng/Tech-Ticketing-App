import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7iD9JL2kBs8-k2EDvmyz3wMKD_gS6gu8",
    authDomain: "tech-ticketing-app-218fc.firebaseapp.com",
    databaseURL: "https://tech-ticketing-app-218fc-default-rtdb.firebaseio.com",
    projectId: "tech-ticketing-app-218fc",
    storageBucket: "tech-ticketing-app-218fc.firebasestorage.app",
    messagingSenderId: "226344012245",
    appId: "1:226344012245:web:f821784d6874cafd44d55c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
