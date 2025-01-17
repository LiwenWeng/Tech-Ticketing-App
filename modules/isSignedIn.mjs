import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { auth } from "./firebase.mjs";

onAuthStateChanged(auth, (user) => {
    if (!user) window.location.assign("../index.html");
});
