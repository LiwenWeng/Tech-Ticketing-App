import { collection, setDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { auth, firestore } from "./firebase.mjs";
import { id, updateId } from "./createTicket.mjs";
import { onLoaded } from "./dashboard.mjs";

export const ticketData = {
    active: {},
    closed: {},
};
export let isLoaded = false;
export function updateIsLoaded(newValue) {
    isLoaded = newValue;
}

export async function loadData() {
    const user = auth.currentUser;
    const userUid = user.uid;

    try {
        const activeTicketsSnapshot = await getDocs(collection(firestore, "users", userUid, "active_tickets"));
        activeTicketsSnapshot.forEach((ticketDoc) => {
            const ticketId = parseInt(ticketDoc.id, 10);
            if (!isNaN(ticketId)) {
                updateId(ticketId);
            }
            ticketData.active[ticketId] = ticketDoc.data();
        });

        const closedTicketsSnapshot = await getDocs(collection(firestore, "users", userUid, "closed_tickets"));
        closedTicketsSnapshot.forEach((ticketDoc) => {
            const ticketId = parseInt(ticketDoc.id, 10);
            if (!isNaN(ticketId)) {
                updateId(ticketId);
            }
            ticketData.closed[ticketId] = ticketDoc.data();
        });

        isLoaded = true;
        onLoaded.dispatchEvent(new CustomEvent("loaded", { detail: ticketData }));
        console.log(id, ticketData);
    } catch (error) {
        console.error("Error loading tickets: ", error);
    }
}

export async function saveTicketToFirestore(ticketId, status, data) {
    const user = auth.currentUser;
    const userUid = user.uid;

    const ticketCollection = `${status}_tickets`;
    const ticketRef = doc(firestore, "users", userUid, ticketCollection, String(ticketId));

    try {
        await setDoc(ticketRef, data);
    } catch (error) {
        console.error("Error saving ticket: ", error);
    }
}

export async function deleteTicketFromFirestore(ticketId, status) {
    const user = auth.currentUser;
    const userUid = user.uid;

    try {
        const ticketCollection = `${status}_tickets`;
        const ticketRef = doc(firestore, "users", userUid, ticketCollection, String(ticketId));
        
        await deleteDoc(ticketRef);
        console.log(`Ticket ${ticketId} deleted successfully from ${ticketCollection}`);
    } catch (error) {
        console.error("Error deleting ticket:", error);
    }
}