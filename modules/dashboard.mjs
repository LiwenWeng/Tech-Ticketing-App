const ticketsTab = document.querySelector(".tickets-tab");

function openTab() {
    Array.from(ticketsTab.children).forEach((button) => {
        
    });
}

function closeTab() {
    Array.from(ticketsTab.children).forEach((button) => {
        
    });
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