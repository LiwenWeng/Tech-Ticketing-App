import { updateEditingTicket } from "./dashboard.mjs";
import { deleteTicketFromFirestore, saveTicketToFirestore, ticketData } from "./data.mjs";
import { createOptions } from "./utils/createOptions.mjs";

const categoryOptions = [
    ["none", "Select a category"],
    ["hardware", "Hardware"],
    ["software", "Software"],
    ["smartboard", "Smartboard"],
    ["devices", "Devices"],
    ["internet", "Internet"],
    ["printer", "Printer"],
    ["copier", "Copier"],
    ["other", "Other"],
];

const affectedDeviceOptions = [
    ["none", "Select affected devices"],
    ["one", "One device"],
    ["few", "A few devices"],
    ["most", "Most devices"],
    ["all", "All devices"],
]

export let id = 0;
export function updateId(newId) {
    id = Math.max(id, newId);
}

export function createTicket(status, ticketId, data) {
    let tId = undefined;
    if (ticketId !== undefined) {
        tId = ticketId;
    } else {
        id++;
        tId = id;
    }

    console.log(tId);

    const container = document.createElement("div");
    container.id = tId;
    container.classList.add("ticket-container");

    const category = document.createElement("select");
    category.classList.add("ticket-category");
    createOptions(categoryOptions, category);
    category.value = data !== undefined ? data.category : "none";
    container.appendChild(category);

    const affectedDevices = document.createElement("select");
    affectedDevices.classList.add("affected-devices");
    createOptions(affectedDeviceOptions, affectedDevices);
    affectedDevices.value = data !== undefined ? data.affectedDevices : "none";
    container.appendChild(affectedDevices);

    const roomNumber = document.createElement("input");
    roomNumber.classList.add("room-number");
    roomNumber.placeholder = "Room number"
    roomNumber.value = data !== undefined ? data.roomNumber : "";
    container.appendChild(roomNumber);

    const problem = document.createElement("input");
    problem.classList.add("problem-description");
    problem.placeholder = "Describe the problem";
    problem.value = data !== undefined ? data.problem : "";
    container.appendChild(problem);

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "ticket-button-container";
    container.appendChild(buttonContainer);

    const saveTicketButton = document.createElement("button");
    saveTicketButton.classList.add("save-ticket-button");
    saveTicketButton.textContent = `Save Ticket #${tId}`;
    saveTicketButton.onclick = () => {
        ticketData.active[tId] = {
            category: category.value,
            affectedDevices: affectedDevices.value,
            roomNumber: roomNumber.value,
            problem: problem.value,
        }
        saveTicketToFirestore(tId, "active", ticketData.active[tId]);
        updateEditingTicket(false);
        if (status === "closed") {
            delete ticketData.closed[tId];
            deleteTicketFromFirestore(tId, "closed");
            container.remove();
        }
    }
    buttonContainer.appendChild(saveTicketButton);

    if (status === "active") {
        const closeTicketButton = document.createElement("button");
        closeTicketButton.classList.add("close-ticket-button");
        closeTicketButton.textContent = `Close Ticket`;
        closeTicketButton.onclick = () => {
            delete ticketData.active[tId];
            ticketData.closed[tId] = {
                category: category.value,
                affectedDevices: affectedDevices.value,
                roomNumber: roomNumber.value,
                problem: problem.value,
            }
            deleteTicketFromFirestore(tId, "active");
            saveTicketToFirestore(tId, "closed", ticketData.closed[tId]);
            container.remove();
            updateEditingTicket(false);
        }
        buttonContainer.appendChild(closeTicketButton);
    }

    return container;
}