// js file to show a hero that was clicked on by a user
// from the card.html page
// Makes use of the sessionStorage object available on html

// Syntax for get a single character from the api:
//      https://akabab.github.io/superhero-api/api/id/#.json
// Where # is the id number of the hero in the api
// Need to grab the number from the sessionStorage
let base_url = "https://akabab.github.io/superhero-api/api/id/";

// Declaring sessionStorage key string
let sessionKey = "heroID";

const headerName = document.getElementById("character-name");

const characterDiv = document.querySelector('.character-data');

const characterChart = document.querySelector('.character-chart');

// background colors for the chart
let backgroundColors = [
    'rgba(255, 85, 94, 0.8)',
    'rgba(255, 134, 80, 0.8)',
    'rgba(255, 233, 129, 0.8)',
    'rgba(139, 241, 139, 0.8)',
    'rgba(131, 178, 255, 0.8)',
    'rgba(155, 110, 243, 0.8)'
];

// border colors for the chart
let borderColors = [
    'rgba(255, 85, 94, 1)',
    'rgba(255, 134, 80, 1)',
    'rgba(255, 233, 129, 1)',
    'rgba(139, 241, 139, 1)',
    'rgba(131, 178, 255, 1)',
    'rgba(155, 110, 243, 1)'
];

// Call function upon window loading
window.onload = getCharacterapi();

// Function to display the character from sessionStorage
function displayCharacter(character) {
    // Set the header to the hero's name
    headerName.innerHTML = character.name;

    // The first div. Contains all the hero details and image
    let div1 = document.createElement("div");
    // Set the ID of the element so that it can be search for
    // later in the resetData() function
    //div1.setAttribute("id",descriptionID);

    // Creating the image tag to display the hero image
    // Using the md image, because it seems like a happy medium
    let imgTag = document.createElement("img");
    imgTag.src = character.images.md;
    imgTag.alt = character.name;
    imgTag.title = character.name;
    div1.appendChild(imgTag);

    // Creating a paragraph tag to display the hero's
    // biographical information
    let p1 = document.createElement("p");
    if(character.appearance.race === null){
        p1.innerHTML = `Full Name: ${character.name}<br />`;
    }
    else if(character.biography.fullName.localeCompare("-") === 0) {
        p1.innerHTML = `Full Name: ${character.name}<br />`;
    }
    else {
        p1.innerHTML = `Full Name: ${character.biography.fullName}<br />`;
    }

    p1.innerHTML += `Alter Egos: ${character.biography.alterEgos}<br />
    Aliases:<br />`;
    // The aliases are stored in an array, so it's necessary to
    // to loop through each element
    if(character.biography.aliases[0].localeCompare("-") === 0) {
        p1.innerHTML += `&emsp;None<br />`;
    }
    else {
        character.biography.aliases.forEach((x) => {
            p1.innerHTML += `&emsp;${x}<br />`;
        });
    }

    if(character.biography.placeOfBirth === null){
        p1.innerHTML += `Place of Birth: "Unknown"<br />`;
    }
    else if(character.biography.placeOfBirth.localeCompare("-") === 0) {
        p1.innerHTML += `Place of Birth: "Unknown"<br />`;
    }
    else {
        p1.innerHTML += `Place of Birth: ${character.biography.placeOfBirth}<br />`;
    }

    p1.innerHTML += `First Appearance: ${character.biography.firstAppearance}<br />
    Publisher: ${character.biography.publisher}<br />`;

    if(character.biography.alignment === null){
        p1.innerHTML += `Alignment: None`;
    }
    else if(character.biography.alignment.localeCompare("-") === 0) {
        p1.innerHTML += `Alignment: None`;
    }
    else {
        p1.innerHTML += `Alignment: ${character.biography.alignment}`;
    }
    div1.appendChild(p1);

    // Creating the 2nd paragraph tag that displays the hero's appearance
    // No need to loop during the height and weight arrays since
    // there's only two values in those arrays
    let p2 = document.createElement("p");
    if(character.appearance.gender === null){
        p2.innerHTML = `Gender: "Unknown"<br />`;
    }
    else if(character.appearance.gender.localeCompare("-") === 0) {
        p2.innerHTML = `Gender: "Unknown"<br />`;
    }
    else {
        p2.innerHTML = `Gender: ${character.appearance.gender}<br />`;
    }

    if(character.appearance.race === null){
        p2.innerHTML += `Race: "Unknown"<br />`;
    }
    else if(character.appearance.race.localeCompare("-") === 0) {
        p2.innerHTML += `Race: "Unknown"<br />`;
    }
    else {
        p2.innerHTML += `Race: ${character.appearance.race}<br />`;
    }

    if(character.appearance.height[0].localeCompare("-") === 0) {
        p2.innerHTML += `Height: Unknown<br />`;
    }
    else {
        p2.innerHTML += `Height: ${character.appearance.height[0]} (${character.appearance.height[1]})<br />`;
    }

    if(character.appearance.weight[0].localeCompare("- lb") === 0) {
        p2.innerHTML += `Weight: Unknown<br />`;
    }
    else {
        p2.innerHTML += `Weight: ${character.appearance.weight[0]} (${character.appearance.weight[1]})<br />`;
    }

    if(character.appearance.eyeColor === null){
        p2.innerHTML += `Eye Color: "Unknown"<br />`;
    }
    else if(character.appearance.eyeColor.localeCompare("-") === 0) {
        p2.innerHTML += `Eye Color: "Unknown"<br />`;
    }
    else {
        p2.innerHTML += `Eye Color: ${character.appearance.eyeColor}<br />`;
    }

    if(character.appearance.hairColor === null){
        p2.innerHTML += `Hair Color: "Unknown"<br />`;
    }
    else if(character.appearance.hairColor.localeCompare("-") === 0) {
        p2.innerHTML += `Hair Color: "Unknown"<br />`;
    }
    else {
        p2.innerHTML += `Hair Color: ${character.appearance.hairColor}<br />`;
    }
    div1.appendChild(p2);

    // Creating the 3rd paragraph tag to display the hero's work
    // The api is very inconsistent with formatting.
    // Some items are comma separated, while others are semi-colon separated
    // So it's necessary to split the strings by semi-colons first,
    // then by commas next.
    // &emsp: tab formatting (supposed to be 4 spaces, but displaying 2)
    let p3 = document.createElement("p");
    if(character.work.occupation === null){
        p3.innerHTML = `Occupation: None<br />`;
    }
    else if(character.work.occupation.localeCompare("-") === 0) {
        p3.innerHTML = `Occupation: None<br />`;
    }
    else {
        p3.innerHTML = `Occupation:<br />`;
        let workSemiColon = character.work.occupation.split(";");
        workSemiColon.forEach((y) => {
            let workComma = y.split(",");
            workComma.forEach((z) => {
                p3.innerHTML += `&emsp;${z}<br />`;
            });
        });
    }

    if(character.work.base === null){
        p3.innerHTML += `Base: None<br />`;
    }
    else if(character.work.base.localeCompare("-") === 0) {
        p3.innerHTML += `Base: None<br />`;
    }
    else {
        p3.innerHTML += `Base:<br />`;
        let baseSemiColon = character.work.base.split(";");
        baseSemiColon.forEach((base) => {
            p3.innerHTML += `&emsp;${base}<br />`;        
        });
    }
    div1.appendChild(p3);

    // Creating the forth and final paragraph tag to display the
    // hero's connections
    // Similar to the work details, the connections are split up by
    // semi-colons and commas.
    let p4 = document.createElement("p");
    if(character.connections.groupAffiliation === null) {
        p4.innerHTML = `Group Affiliation: None<br />`;
    }
    else if(character.connections.groupAffiliation.localeCompare("-") === 0) {
        p4.innerHTML = `Group Affiliation: None<br />`;
    }
    else {
        p4.innerHTML = `Group Affiliation:<br />`;
        let groupSemiColon = character.connections.groupAffiliation.split(";");
        groupSemiColon.forEach((group) => {
            p4.innerHTML += `&emsp;${group}<br />`;        
        });
    }
    
    if(character.connections.relatives === null) {
        p4.innerHTML += `Relatives: None<br />`;
    }
    else if(character.connections.relatives.localeCompare("-") === 0) {
        p4.innerHTML += `Relatives: None<br />`;
    }
    else {
        p4.innerHTML += `Relatives:<br />`;
        let relSemiColon = character.connections.relatives.split(";");
        relSemiColon.forEach((r) => {
            let relComma = r.split(",");
            relComma.forEach((rel) => {
                p4.innerHTML += `&emsp;${rel}<br />`;
            });       
        });
    }
    div1.appendChild(p4);

    // Create the canvas element to add to the html page
    // This canvas will hold and display the hero's powerstats
    // via a bar chart.
    let chartCanvas = document.createElement("canvas");

    // Sets the canvas's ID attribute to a previously defined str
    // so that it may be search for later in the resetData()
    // function.
    //chartCanvas.setAttribute("id",chartID);

    // Also set the role to be img, I don't know if this is
    // necessary. But in the examples I'm basing this off of
    // they include a role attribute
    chartCanvas.setAttribute("role","img");
    //chartCanvas.setAttribute("width","600");
    chartCanvas.setAttribute("height","300");

    // append the chart canvas to the html div
    characterChart.appendChild(chartCanvas);

    // get the keys of the powerstats object in an array
    let statslabels = Object.keys(character.powerstats);

    // get the values of the powerstats object in an array
    let stats = Object.values(character.powerstats);
    
    // Creating a chart context to well...create a chart
    let chartCtx = chartCanvas.getContext('2d');
    
    // Entering all the hero data and styling the chart
    let chart = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: statslabels,
            datasets: [{
                data: stats,            
                backgroundColor: backgroundColors,
                borderColor: borderColors
            }]
        },
        options: {
            title: {
                text: "Hero's Powerstats",
                display: true
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // After appending everything to their respective divs
    // Now append the divs to the one in the actual html page.
    characterDiv.appendChild(div1);
}

// Function to grab the sessionStorage data
// syntax: "heroID": #
// At the moment I'm not sure if # is going to be a number or
//      a string representation of a number
function getCharacterId() {
    let charId = sessionStorage.getItem(sessionKey);

    // Check that the sessionStorage value exists
    if(charId) {
        //console.log("Value exists: " + charId);
        return charId;
    }
    //console.log("Value doesn't exist: " + charId);
    return false;
}

// Function to call the api to get character data
async function getCharacterapi() {
    let id = getCharacterId();

    if(id === false) {
        console.log("Error getting id value: " + id);
        return;
    }

    let jsonParam = id + ".json";

    let api_url = base_url + jsonParam;

    let getCharapi = await fetch(api_url);

    if(getCharapi === undefined){
        console.log("Error calling fetch");
        return;
    }

    let charJson = await getCharapi.json();

    if(charJson === undefined) {
        console.log("Error get json from fetched data");
        return;
    }

    //console.log(charJson);
    displayCharacter(charJson);
}