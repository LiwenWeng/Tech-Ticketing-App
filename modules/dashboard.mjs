import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./firebase.mjs";
import { createTicket } from "./createTicket.mjs";
import { ticketData } from "./data.mjs";

export const onLoaded = new EventTarget();

const ticketsTab = document.querySelector(".tickets-tab");
const ticketsContainer = document.querySelector(".tickets-container");
const signOutButton = document.querySelector("#sign-out-button");
const toggleTabButton = document.querySelector("#toggle-tab-button");

const tabOptions = Array.from(ticketsTab.children).slice(0, 3);
const activeTicketsButton = tabOptions[0];
const closedTicketsButton = tabOptions[1];
const newTicketButton = tabOptions[2];

const buttonNames = new Map();
buttonNames.set("active-tickets-button", "Active Tickets");
buttonNames.set("closed-tickets-button", "Closed Tickets");
buttonNames.set("new-ticket-button", "New Ticket");

const buttonToName = new Map();
tabOptions.forEach((button) => buttonToName.set(button, buttonNames.get(button.id)));

function openTab() {
    tabOptions.forEach((button) => {
        button.insertAdjacentText("afterbegin", buttonToName.get(button));
    });
    ticketsContainer.style.left = "25vmax";
    ticketsContainer.style.width = "75vmax";
}

function closeTab() {
    tabOptions.forEach((button) => {
        button.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) node.remove();
        });
    });
    ticketsContainer.style.left = "5vmax";
    ticketsContainer.style.width = "95vmax";
}

toggleTabButton.onclick = () => {
    if (ticketsTab.classList.contains("active")) {
        ticketsTab.classList.remove("active");
        closeTab();
    } else {
        ticketsTab.classList.add("active");
        openTab();
    }
}

export let editingTicket = false;
export function updateEditingTicket(newValue) {
    editingTicket = newValue;
}

newTicketButton.onclick = () => {
    if (!editingTicket) {
        editingTicket = true;
        ticketsContainer.appendChild(createTicket("active"));
    }
}

function populateTicketsContainer(status) {
    const tickets = [];
    Object.entries(ticketData[status]).forEach(([key, value]) => {
        tickets.push(createTicket(status, key, value));
    })
    ticketsContainer.replaceChildren(...tickets);
}

activeTicketsButton.classList.add("active");
onLoaded.addEventListener("loaded", () => {
    populateTicketsContainer("active"); 
    
    activeTicketsButton.onclick = () => {
        if (editingTicket) return; 

        populateTicketsContainer("active");
        activeTicketsButton.classList.add("active");
        closedTicketsButton.classList.remove("active");
    }
    
    closedTicketsButton.onclick = () => {
        if (editingTicket) return; 

        populateTicketsContainer("closed");
        closedTicketsButton.classList.add("active");
        activeTicketsButton.classList.remove("active");
    }
})

signOutButton.onclick = () => signOut(auth);