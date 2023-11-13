// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
   // Use the document parameter to locate the missionTarget div
   const missionTargetDiv = document.getElementById('missionTarget');

   // Should update the innerHTML with the provided information
   missionTargetDiv.innerHTML = `
       <h2>Mission Destination</h2>
       <ol>
           <li>Name: ${name}</li>
           <li>Diameter: ${diameter}</li>
           <li>Star: ${star}</li>
           <li>Distance from Earth: ${distance}</li>
           <li>Number of Moons: ${moons}</li>
       </ol>
       <img src="${imageUrl}">
   `;
 }
 
 function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return isNaN(parseFloat(testInput)) ? "Not a Number" : "Is a Number";
    } else {
        return "Is a Number";
    }
 }
 
function formSubmission(document, faultyItems, pilot, copilot, fuelLevel, cargoLevel) {
    // Validate input
    const pilotValidation = validateInput(pilot);
    const copilotValidation = validateInput(copilot);
    const fuelValidation = validateInput(fuelLevel);
    const cargoValidation = validateInput(cargoLevel);

    // This update pilot and copilot statuses
    document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;

    // Check fuel level
    if (fuelValidation === "Is a Number") {
        if (fuelLevel < 10000) {
            // Set the status for fuel level too low for launch
            document.getElementById("fuelStatus").textContent = "Fuel level too low for launch";
            document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
        } else {
            // Set the status for a fuel level high enough for launch
            document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch";
        }
        } else {
            // Handle the case when fuel is not a number
            console.error("Fuel is not a valid number");
        }

    // Check cargo mass
    if (cargoValidation === "Is a Number") {
        if (cargoLevel > 10000) {
            document.getElementById("cargoStatus").textContent = "Cargo mass too heavy for launch";
            document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
        } else {
            document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch";
        }
    } else {
        console.error("Cargo mass is not a valid number");
    }

    // If all checks pass, update status for launch
    if (fuelValidation === "Is a Number" && cargoValidation === "Is a Number" && fuelLevel >= 10000 && cargoLevel <= 10000) {
        document.getElementById("launchStatus").textContent = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "green";
    } else {
        // this should handle cases where conditions are not met
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
        document.getElementById("faultyItems").style.visibility = "visible"; // Show faultyItems when there are issues
    }
}
 
 async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
        // Check if the fetch was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON data and return it
        return response.json();
    }).catch(function(error) {
        console.error(`Error fetching planetary data: ${error.message}`);
        return []; // Return an empty array in case of an error
    });

    return planetsReturned;
 }
 
 function pickPlanet(planets) {
    // Use Math.random() to get a random index
    const randomIndex = Math.floor(Math.random() * planets.length);

    // Return the randomly selected planet
    return planets[randomIndex];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;