import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { auth } from "./firebase.mjs";
import { Enum } from "./enums.mjs";
import { getCookie } from "./utils/getCookie.mjs";

const authenticationButton = document.querySelector(".authentication-button");
const emailInput = document.querySelector(".authentication-email-input");
const passwordInput = document.querySelector(".authentication-password-input");
const nameInput = document.querySelector("#sign-up-name-input");

const isSignInPage = nameInput === null;
const emailCookie = getCookie("email");
emailInput.value = emailCookie !== null ? emailCookie : "";

const originalPlaceholder = new Map();
originalPlaceholder.set(emailInput, emailInput.placeholder);
originalPlaceholder.set(passwordInput, passwordInput.placeholder);
if (nameInput !== null) originalPlaceholder.set(nameInput, nameInput.placeholder);

const authErrorFuncs = {
    "invalid-email": () => errorInput(emailInput, Enum.Error.InvalidEmail, true),
    "invalid-credential": (email) => {
        document.cookie = `email=${email}; max-age=${5 * 60}; path=/; Secure; SameSite=Strict`
        errorInput(passwordInput, Enum.Error.InvalidCredentials, true)
    },
    "weak-password": () => errorInput(passwordInput, Enum.Error.WeakPassword, true),
    "email-already-in-use": () => errorInput(emailInput, Enum.Error.EmailInUse, true),
}

function handleAuthError(error, task) {
    console.log(error);
    const errorCode = error.code.split("/")[1];
    console.error(`An error occurred while ${task}: ${errorCode}`);
    const func = authErrorFuncs[errorCode];
    if (func) func(emailInput.value);
}

function errorInput(element, errorMessage, clearInput) {
    if (clearInput) element.value = "";
    element.style.outline = "solid red 2px";
    element.style.color = "red";
    element.placeholder = errorMessage;
}

function resetErrorInput(element, placeholder) {
    element.style.color = "";
    element.style.outline = "";
    element.placeholder = placeholder;
}

function handleInput(element, value) {
    const hasInput = value !== "";
    if (!hasInput) {
        errorInput(element, Enum.Error.MissingInput);
    }

    return hasInput;
}

[emailInput, passwordInput, nameInput].forEach((inputEl) => {
    if (inputEl === null) return;
    inputEl.addEventListener("focus", () => resetErrorInput(inputEl, originalPlaceholder.get(inputEl)));
})

authenticationButton.onclick = () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    let noneMissing = true;
    noneMissing &&= !isSignInPage ? handleInput(nameInput, nameInput.value) : true;
    noneMissing &&= handleInput(emailInput, email);
    noneMissing &&= handleInput(passwordInput, password);

    if (noneMissing) {
        if (isSignInPage) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => window.location.assign("html/dashboard.html"))
                .catch(handleAuthError, "signing in");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    const auth = userCredentials.user.auth;
                    sendEmailVerification(auth.currentUser);
                    window.location.assign("../index.html")
                })
                .catch(handleAuthError, "creating user");
        }
    };
}
