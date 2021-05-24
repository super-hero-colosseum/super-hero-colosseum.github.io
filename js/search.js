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

// Add an event listener to the button
// Listen for the 'click' event
// call the handleClick() function
searchEvent.addEventListener('click', handleClick);



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
    
    
}