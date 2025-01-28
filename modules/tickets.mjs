import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { app } from "./firebase.mjs"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

const db = getFirestore(app)

console.log(app)
 
const descriptionFieldEl = document.getElementById("descriptionField")
const submitButton = document.getElementById("submit-btn")
const backButton = document.getElementById("back-btn")
const saveButton = document.getElementById("save-btn")
const typeSelect = document.getElementById("ticket-category")
const affectedObjectSelect = document.getElementById("affected-objects")
const floorNum = document.getElementById("floorNum")
const wingSelect = document.getElementById("wing")
const roomNum = document.getElementById("roomNum")
let fullTicket = []

saveButton.addEventListener("click", save)
submitButton.addEventListener("click", addTicketToDB)
 
// database stuff and also error when a field is blank/has the value "none"
function save(){
    fullTicket = [typeSelect.value, affectedObjectSelect.value, floorNum.value, wingSelect.value, roomNum.value, descriptionFieldEl.value]

    alert("Form has been saved.")
}


async function addTicketToDB(ticketBody) {
    save()
    try {
        const docRef = await addDoc(collection(db, "tickets"), {
          type: fullTicket[0],
          affectedObjects: fullTicket[1],
          floorNum: fullTicket[2],
          wing: fullTicket[3],
          roomNum: fullTicket[4],
          description: fullTicket[5]
        });
        console.log("Doc written.");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}