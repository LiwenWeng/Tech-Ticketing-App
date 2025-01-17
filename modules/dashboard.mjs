const ticketsTab = document.querySelector(".tickets-tab");
const ticketsContainer = document.querySelector(".tickets-container");

const buttonToName = new Map();
Array.from(ticketsTab.children).forEach((button) => buttonToName.set(button, `${button.classList[0]} ${button.classList[1]}`))

function openTab() {
    Array.from(ticketsTab.children).forEach((button) => {
        button.insertAdjacentText("afterbegin", buttonToName.get(button));
    });
    ticketsContainer.style.left = "25vmax";
}

function closeTab() {
    Array.from(ticketsTab.children).forEach((button) => {
        button.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) node.remove();
        });
    });
    ticketsContainer.style.left = "5vmax";
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