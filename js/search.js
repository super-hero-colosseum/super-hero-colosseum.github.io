// Search file
// looks through the api to find a selected hero

// API url
// Contains all the characters in the api
let url = "https://akabab.github.io/superhero-api/api/all.json";
// Have to do "all.json" because the api doesn't have an option to
// search for characters by name

// Get the form element to handle submit events
const form = document.getElementById("search-form");

// Get the main div where everything will be appended
const mainDiv = document.getElementById("search-content");

// Get the element that contains the user input
const userInput = document.querySelector('#search-term');

// Get the input button element
const searchEvent = document.querySelector('.btn-info');

// The h2 tag that displays the hero name,
// or displays a message that the hero couldn't be found
const heroHeader = document.querySelector('.hero-name');

// Get the div where the hero description will be displayed
const heroDiv = document.querySelector('.hero-data');

// Get the div that should contain the canvas that will contain the chart data
const chartDiv = document.querySelector('.chart');

// ID for a div that will be created in the updateDOM() function
// will set the id attribute to this string
const descriptionID = "description";

// ID for a div that contains the canvas
// will set the id attribute to this string
const chartID = "myChart";

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

// empty array to be fill upon loading script
const characters = [];

// Function to fill the characters array
// To be searched later on
function loadCharacters(data) {
    data.forEach((item) => {
        characters.push(item);
    });
}

// Function for getting all the data from the api
async function getCharacters() {
    // fetch all the characters
    let response = await fetch(url);

    // Check that the response is valid
    if(response == undefined){
        console.log('Error fetching from API');
    }

    // get the JSON from the response
    let data = await response.json();

    // Check that the data is valid
    if(data == undefined) {
        console.log('Error getting data from response');
    }
    
    // call function to display three random heroes
    loadCharacters(data);    
}

// Calling function to fetch the data from the api
getCharacters();

// Add an event listener to the button
// Listen for the 'click' event
// call the handleClick() function
searchEvent.addEventListener('click', handleClick);

// handle a form submit event
// Now a user can submit by either pressing 'Enter' key
// or by pressing the 'submit' button
form.addEventListener('submit', handleClick);

// Function to handle the event when the user presses the submit button
// Makes a call to searchCharacters() to see if we have the character
// Then either prints an error message to html, or the hero data
function handleClick(event) {
    event.preventDefault();

    // Call function to erase the previous data that may be there
    resetData();

    // Determines whether the hero is contained in the data set
    // Updates the DOM depending on if a hero was found
    if(userInput.value.localeCompare("") === 0) {
        // Don't allow empty strings
        heroHeader.innerHTML = "Please Enter a Hero Name";
    }
    else if(searchCharacters() === false) {
        heroHeader.innerHTML = "Hero Not Found";
    }
    return;
}

// Function clears any previous html data, allowing new data to update
// as anticipated
function resetData() {
    // Setting the h2 tag that's on the html page to the
    // empty string.
    heroHeader.innerHTML = "";

    // Checking that a div has already been created for the hero data
    // If it has, then the remove() function takes it out of the DOM
    let dElement = document.getElementById(descriptionID);
    if(!!dElement){
        dElement.remove();
    }

    // Checking that the canvas has been created already
    // Remove it if it has
    let chartElement = document.getElementById(chartID);
    if(!!chartElement) {
        chartElement.remove();
    }
}

// Searches through the characters array that was populated upon page loading
// returns the index of the character if found, else it returns false
function searchCharacters() {
    let input = userInput.value;
    let hero = input.toLowerCase();

    let i;
    for(i = 0; i < characters.length; i++) {
        // if the character exists, call function to update the DOM
        // Then return true
        // convert the character name to a lowercase str for comparison
        toCompareName = characters[i].name.toLowerCase();
        if(hero.localeCompare(toCompareName) === 0){
            updateDOM(characters[i]);
            return true;
        }
        // There are some characters who share the name hero name
        // So we'll also accept character's real full name
        // Example: when searching for "Batman"
        //          You'll get Terry McGinnis Batman (Batman Beyond)
        //          But now you can get Bruce Wayne Batman (original) by
        //          searching for his real full name
        toCompareFullName = characters[i].biography.fullName.toLowerCase();
        if(hero.localeCompare(toCompareFullName) === 0){
            updateDOM(characters[i]);
            return true;
        }
    }
    // Character was not found
    return false;
}

// Function updates the DOM to display the character object passed in
function updateDOM(item) {
    // Set the header to the hero's name
    heroHeader.innerHTML = item.name;

    // The first div. Contains all the hero details and image
    let div1 = document.createElement("div");
    // Set the ID of the element so that it can be search for
    // later in the resetData() function
    div1.setAttribute("id",descriptionID);

    // Creating the image tag to display the hero image
    // Using the md image, because it seems like a happy medium
    let imgTag = document.createElement("img");
    imgTag.src = item.images.md;
    imgTag.alt = item.name;
    imgTag.title = item.name;
    div1.appendChild(imgTag);

    // Creating a paragraph tag to display the hero's
    // biographical information
    let p1 = document.createElement("p");
    if(item.appearance.race === null){
        p1.innerHTML = `Full Name: ${item.name}<br />`;
    }
    else if(item.biography.fullName.localeCompare("-") === 0) {
        p1.innerHTML = `Full Name: ${item.name}<br />`;
    }
    else {
        p1.innerHTML = `Full Name: ${item.biography.fullName}<br />`;
    }

    p1.innerHTML += `Alter Egos: ${item.biography.alterEgos}<br />
    Aliases:<br />`;
    // The aliases are stored in an array, so it's necessary to
    // to loop through each element
    if(item.biography.aliases[0].localeCompare("-") === 0) {
        p1.innerHTML += `&emsp;None<br />`;
    }
    else {
        item.biography.aliases.forEach((x) => {
            p1.innerHTML += `&emsp;${x}<br />`;
        });
    }

    if(item.biography.placeOfBirth === null){
        p1.innerHTML += `Place of Birth: "Unknown"<br />`;
    }
    else if(item.biography.placeOfBirth.localeCompare("-") === 0) {
        p1.innerHTML += `Place of Birth: "Unknown"<br />`;
    }
    else {
        p1.innerHTML += `Place of Birth: ${item.biography.placeOfBirth}<br />`;
    }

    p1.innerHTML += `First Appearance: ${item.biography.firstAppearance}<br />
    Publisher: ${item.biography.publisher}<br />`;

    if(item.biography.alignment === null){
        p1.innerHTML += `Alignment: None`;
    }
    else if(item.biography.alignment.localeCompare("-") === 0) {
        p1.innerHTML += `Alignment: None`;
    }
    else {
        p1.innerHTML += `Alignment: ${item.biography.alignment}`;
    }
    div1.appendChild(p1);

    // Creating the 2nd paragraph tag that displays the hero's appearance
    // No need to loop during the height and weight arrays since
    // there's only two values in those arrays
    let p2 = document.createElement("p");
    if(item.appearance.gender === null){
        p2.innerHTML = `Gender: "Unknown"<br />`;
    }
    else if(item.appearance.gender.localeCompare("-") === 0) {
        p2.innerHTML = `Gender: "Unknown"<br />`;
    }
    else {
        p2.innerHTML = `Gender: ${item.appearance.gender}<br />`;
    }

    if(item.appearance.race === null){
        p2.innerHTML += `Race: "Unknown"<br />`;
    }
    else if(item.appearance.race.localeCompare("-") === 0) {
        p2.innerHTML += `Race: "Unknown"<br />`;
    }
    else {
        p2.innerHTML += `Race: ${item.appearance.race}<br />`;
    }

    if(item.appearance.height[0].localeCompare("-") === 0) {
        p2.innerHTML += `Height: Unknown<br />`;
    }
    else {
        p2.innerHTML += `Height: ${item.appearance.height[0]} (${item.appearance.height[1]})<br />`;
    }

    if(item.appearance.weight[0].localeCompare("- lb") === 0) {
        p2.innerHTML += `Weight: Unknown<br />`;
    }
    else {
        p2.innerHTML += `Weight: ${item.appearance.weight[0]} (${item.appearance.weight[1]})<br />`;
    }

    if(item.appearance.eyeColor === null){
        p2.innerHTML += `Eye Color: "Unknown"<br />`;
    }
    else if(item.appearance.eyeColor.localeCompare("-") === 0) {
        p2.innerHTML += `Eye Color: "Unknown"<br />`;
    }
    else {
        p2.innerHTML += `Eye Color: ${item.appearance.eyeColor}<br />`;
    }

    if(item.appearance.hairColor === null){
        p2.innerHTML += `Hair Color: "Unknown"<br />`;
    }
    else if(item.appearance.hairColor.localeCompare("-") === 0) {
        p2.innerHTML += `Hair Color: "Unknown"<br />`;
    }
    else {
        p2.innerHTML += `Hair Color: ${item.appearance.hairColor}<br />`;
    }
    div1.appendChild(p2);

    // Creating the 3rd paragraph tag to display the hero's work
    // The api is very inconsistent with formatting.
    // Some items are comma separated, while others are semi-colon separated
    // So it's necessary to split the strings by semi-colons first,
    // then by commas next.
    // &emsp: tab formatting (supposed to be 4 spaces, but displaying 2)
    let p3 = document.createElement("p");
    if(item.work.occupation === null){
        p3.innerHTML = `Occupation: None<br />`;
    }
    else if(item.work.occupation.localeCompare("-") === 0) {
        p3.innerHTML = `Occupation: None<br />`;
    }
    else {
        p3.innerHTML = `Occupation:<br />`;
        let workSemiColon = item.work.occupation.split(";");
        workSemiColon.forEach((y) => {
            let workComma = y.split(",");
            workComma.forEach((z) => {
                p3.innerHTML += `&emsp;${z}<br />`;
            });
        });
    }

    if(item.work.base === null){
        p3.innerHTML += `Base: None<br />`;
    }
    else if(item.work.base.localeCompare("-") === 0) {
        p3.innerHTML += `Base: None<br />`;
    }
    else {
        p3.innerHTML += `Base:<br />`;
        let baseSemiColon = item.work.base.split(";");
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
    if(item.connections.groupAffiliation === null) {
        p4.innerHTML = `Group Affiliation: None<br />`;
    }
    else if(item.connections.groupAffiliation.localeCompare("-") === 0) {
        p4.innerHTML = `Group Affiliation: None<br />`;
    }
    else {
        p4.innerHTML = `Group Affiliation:<br />`;
        let groupSemiColon = item.connections.groupAffiliation.split(";");
        groupSemiColon.forEach((group) => {
            p4.innerHTML += `&emsp;${group}<br />`;        
        });
    }
    
    if(item.connections.relatives === null) {
        p4.innerHTML += `Relatives: None<br />`;
    }
    else if(item.connections.relatives.localeCompare("-") === 0) {
        p4.innerHTML += `Relatives: None<br />`;
    }
    else {
        p4.innerHTML += `Relatives:<br />`;
        let relSemiColon = item.connections.relatives.split(";");
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
    chartCanvas.setAttribute("id",chartID);

    // Also set the role to be img, I don't know if this is
    // necessary. But in the examples I'm basing this off of
    // they include a role attribute
    chartCanvas.setAttribute("role","img");
    //chartCanvas.setAttribute("width","600");
    chartCanvas.setAttribute("height","300");

    // append the chart canvas to the html div
    chartDiv.appendChild(chartCanvas);

    // get the keys of the powerstats object in an array
    let statslabels = Object.keys(item.powerstats);

    // get the values of the powerstats object in an array
    let stats = Object.values(item.powerstats);
    
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
    heroDiv.appendChild(div1);
}