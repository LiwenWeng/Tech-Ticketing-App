import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./firebase.mjs";
import { createTicket } from "./createTicket.mjs";

const ticketsTab = document.querySelector(".tickets-tab");
const ticketsContainer = document.querySelector(".tickets-container");
const newTicketButton = document.querySelector("#new-ticket-button");
const signOutButton = document.querySelector("#sign-out-button");

const buttonToName = new Map();
Array.from(ticketsTab.children).forEach((button) => buttonToName.set(button, `${button.classList[0]} ${button.classList[1]}`))

function openTab() {
    Array.from(ticketsTab.children).forEach((button) => {
        button.insertAdjacentText("afterbegin", buttonToName.get(button));
    });
    ticketsContainer.style.left = "25vmax";
    ticketsContainer.style.width = "75vmax";
}

function closeTab() {
    Array.from(ticketsTab.children).forEach((button) => {
        button.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) node.remove();
        });
    });
    ticketsContainer.style.left = "5vmax";
    ticketsContainer.style.width = "95vmax";
}

ticketsTab.onclick = () => {
    if (ticketsTab.classList.contains("active")) {
        ticketsTab.classList.remove("active");
        closeTab();
    } else {
        ticketsTab.classList.add("active");
        openTab();
    }
}

newTicketButton.onclick = () => {
    ticketsContainer.appendChild(createTicket());
}

signOutButton.onclick = () => signOut(auth);