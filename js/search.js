// Search file
// looks through the api to find a selected hero

// API url
// Contains all the characters in the api
let url = "https://akabab.github.io/superhero-api/api/all.json";
// Have to do "all.json" because the api doesn't have an option to
// search for characters by name

// Get the main div where everything will be appended
const mainDiv = document.getElementById("search-content");

// Get the element that contains the user input
const userInput = document.querySelector('#search-term');

// Get the input button element
const searchEvent = document.querySelector('.btn-info');

// These Elements will be updated every time the user
// enters a hero name and presses the submit button
//Get the header div to enter hero name
//const headerDiv = document.querySelector('.data-header');

// The h2 tag that displays the hero name,
// or displays a message that the hero couldn't be found
const heroHeader = document.querySelector('.hero-name');

// Get the div where the hero description will be displayed
const heroDiv = document.querySelector('.hero-data');

// Get the div that will contain the chart data
const chartDiv = document.querySelector('.chart');

// ID for a div that will be created in the updateDOM() function
// will set the id attribute to this string
const descriptionID = "description";

// ID for a div that contains the canvas
// will set the id attribute to this string
const chartID = "chart-data";

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

// Function to handle the event when the user presses the submit button
// Makes a call to searchCharacters() to see if we have the character
// Then either prints an error message to html, or the hero data
function handleClick(event) {
    event.preventDefault();
    resetData();
    if(searchCharacters() === false) {
        heroHeader.innerHTML = "Hero Not Found";
    }
    return;
}

// Function clears any previous html data, allowing new data to update
// as anticipated
function resetData() {
    heroHeader.innerHTML = "";
    let dElement = document.getElementById(descriptionID);
    if(!!dElement){
        dElement.remove();
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
        toCompare = characters[i].name.toLowerCase();
        if(hero.localeCompare(toCompare) === 0){
            updateDOM(characters[i]);
            return true;
        }
    }
    // Character was not found
    return false;
}

// Function updates the DOM to display the character object passed in
function updateDOM(item) {
    heroHeader.innerHTML = item.name;
    let div1 = document.createElement("div");
    div1.setAttribute("id",descriptionID);
    let imgTag = document.createElement("img");
    imgTag.src = item.images.md;
    imgTag.alt = item.name;
    div1.appendChild(imgTag);

    let p1 = document.createElement("p");
    p1.innerHTML = `Full Name: ${item.biography.fullName}<br />
    Alter Egos: ${item.biography.alterEgos}<br />
    Aliases:<br />`;
    item.biography.aliases.forEach((x) => {
        p1.innerHTML += `&emsp;${x}<br />`;
    });
    p1.innerHTML += `Place of Birth: ${item.biography.placeOfBirth}<br />
    First Appearance: ${item.biography.firstAppearance}<br />
    Publisher: ${item.biography.publisher}<br />
    Alignment: ${item.biography.alignment}`;
    div1.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = `Gender: ${item.appearance.gender}<br />
    Race: ${item.appearance.race}<br />
    Height: ${item.appearance.height[0]} (${item.appearance.height[1]})<br />
    Weight: ${item.appearance.weight[0]} (${item.appearance.weight[1]})<br />
    Eye Color: ${item.appearance.eyeColor}<br />
    Hair Color: ${item.appearance.hairColor}`;
    div1.appendChild(p2);

    // The api is very inconsistent with formatting
    // some items are comma separated, while others are semi-colon separated
    let p3 = document.createElement("p");
    p3.innerHTML = `Occupation:<br />`;
    let workSemiColon = item.work.occupation.split(";");
    workSemiColon.forEach((y) => {
        let workComma = y.split(",");
        workComma.forEach((z) => {
            p3.innerHTML += `&emsp;${z}<br />`;
        });
    });
    p3.innerHTML += `Base:<br />`;
    let baseSemiColon = item.work.base.split(";");
    baseSemiColon.forEach((base) => {
            p3.innerHTML += `&emsp;${base}<br />`;        
    });
    div1.appendChild(p3);

    let p4 = document.createElement("p");
    p4.innerHTML = `Group Affiliation:<br />`;
    let groupSemiColon = item.connections.groupAffiliation.split(";");
    groupSemiColon.forEach((group) => {
            p4.innerHTML += `&emsp;${group}<br />`;        
    });
    p4.innerHTML += `Relatives:<br />`;
    let relSemiColon = item.connections.relatives.split(";");
    relSemiColon.forEach((r) => {
            let relComma = r.split(",");
            relComma.forEach((rel) => {
                p4.innerHTML += `&emsp;${rel}<br />`;
            });       
    });
    div1.appendChild(p4);

    heroDiv.appendChild(div1);
}