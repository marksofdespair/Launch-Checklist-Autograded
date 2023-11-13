// Write your JavaScript code here!
window.addEventListener("load", function() {
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function(result) {
        listedPlanets = result;
        console.log(listedPlanets);

        // Below this comment call the appropriate helper functions
        // to pick a planet from the list of planets and add that information to your destination.
        const selectedPlanet = pickPlanet(listedPlanets);

        const name = selectedPlanet.name;
        const diameter = selectedPlanet.diameter;
        const star = selectedPlanet.star;
        const distance = selectedPlanet.distance;
        const moons = selectedPlanet.moons;
        const imageUrl = selectedPlanet.image;

        // Update the mission target div with the selected planet's information
        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);

        // Gets values from the form
        const pilotName = document.getElementById("pilotName").value;
        const coPilotName = document.getElementById("copilotName").value;
        const fuelLevel = document.getElementById("fuelLevel").value;
        const cargoMass = document.getElementById("cargoMass").value;

        // Call formSubmission with the selected planet's data and form values
        formSubmission(
            document,
            listedPlanets,
            pilotName,
            coPilotName,
            fuelLevel,
            cargoMass,
            document.getElementById("launchStatus")
        );        
    });
});
