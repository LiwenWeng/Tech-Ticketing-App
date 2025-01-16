import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

const appSettings = {
    databaseURL: "https://tech-ticketing-app-218fc-default-rtdb.firebaseio.com/"
 }

 const app = initializeApp(appSettings)


console.log(app)
 
const descriptionFieldEl = document.getElementById("descriptionField")
const submitButton = document.getElementById("submit-btn")
const backButton = document.getElementById("back-btn")
const typeSelect = document.getElementById("ticket-category")
const affectedObjectSelect = document.getElementById("affected-objects")
const floorNum = document.getElementById("floorNum")
const wingSelect = document.getElementById("wing")
const roomNum = document.getElementById("roomNum")

submitButton.addEventListener("click", function() {
    let inputValue = typeSelect.value
   
    console.log(`${inputValue},  added to database`)
 })
 
// database stuff and also error when a field is blank/has the value "none"
function savedAlert(){
    alert("Form has been saved.")
}

