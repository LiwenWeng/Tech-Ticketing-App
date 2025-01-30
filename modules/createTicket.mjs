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

let id = 0;

export function createTicket(data) {
    id++;

    const container = document.createElement("div");
    container.classList.add("ticket-container");

    const category = document.createElement("select");
    category.id = "ticket-category"; 
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
    saveTicketButton.textContent = `Save Ticket`;
    buttonContainer.appendChild(saveTicketButton);

    const closeTicketButton = document.createElement("button");
    closeTicketButton.classList.add("close-ticket-button");
    closeTicketButton.textContent = `Close Ticket`;
    buttonContainer.appendChild(closeTicketButton);

    return container;
}