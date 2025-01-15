import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { auth } from "./firebase.mjs";
import { Enum } from "./enums.mjs";

const authenticationButton = document.querySelector(".authentication-button");
const emailInput = document.querySelector(".authentication-email-input");
const passwordInput = document.querySelector(".authentication-password-input");
const nameInput = document.querySelector("#sign-up-name-input");

const isSignInPage = nameInput === null;

const originalPlaceholder = new Map();
originalPlaceholder.set(emailInput, emailInput.placeholder);
originalPlaceholder.set(passwordInput, passwordInput.placeholder);
if (nameInput !== null) originalPlaceholder.set(nameInput, nameInput.placeholder);

const handleAuthError = {
    "invalid-email": () => errorInput(emailInput, Enum.Error.InvalidEmail, true),
    "invalid-credential": () => window.location.assign("html/sign-up.html"),
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
    } else {
        element.style.outline = "";

        if (element === passwordInput && value.length < 3) {
            errorInput(element, Enum.Error.ShortPassword, true);
            return false;
        }
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
        passwordInput.style.color = "";
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => {
                const errorCode = error.code.split("/")[1];
                console.error(`An error occurred while signing in: ${errorCode}`);
                const func = handleAuthError[errorCode];
                if (func) func();
            }
        );
    };
    
}
