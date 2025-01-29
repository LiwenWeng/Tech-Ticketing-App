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

export function createTicket() {
    id++;

    const container = document.createElement("div");
    container.classList.add("ticket-container");

    const category = document.createElement("select");
    category.id = "ticket-category";
    createOptions(categoryOptions, category);
    container.appendChild(category);

    const affectedDevices = document.createElement("select");
    affectedDevices.id = "affected-devices";
    createOptions(affectedDeviceOptions, affectedDevices);
    container.appendChild(affectedDevices);

    const roomNumber = document.createElement("input");
    roomNumber.id = "room-number";
    roomNumber.placeholder = "Room number"
    container.appendChild(roomNumber);

    const problem = document.createElement("input");
    problem.id = "problem-description";
    problem.placeholder = "Describe the problem";
    container.appendChild(problem);

    const closeTicketButton = document.createElement("button");
    closeTicketButton.id = "close-ticket-button";
    closeTicketButton.textContent = `Close Ticket #${id}`;
    container.appendChild(closeTicketButton);

    return container;
}