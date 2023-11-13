window.addEventListener("load", function() {
    const form = document.querySelector("form")
    
    // Below this comment call the appropriate helper functions
    form.addEventListener("submit", event=>{
        event.preventDefault(); // Prevents default form submission
            let pilot = document.querySelector("input[name=pilotName]").value;
            let copilot = document.querySelector("input[name=copilotName]").value;
            let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
            let cargoLevel = document.querySelector("input[name=cargoMass]").value;
            let list = document.getElementById("faultyItems");
            
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) // Moved formsub call up here or it wont work????

    })

    // Calls the asynchronous function myFetch to fetch planetary data.
    // Stores the fetched data in the listedPlanets variable.
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // to pick a planet from the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        let name = planet.name;
        let diameter = planet.diameter;
        let star = planet.star;
        let distance = planet.distance;
        let imageUrl = planet.image;
        let moons = planet.moons;

        // Update the mission target div with the selected planet's information
        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
    })
    
 });