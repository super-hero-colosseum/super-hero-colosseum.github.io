// using this api now: base api: https://akabab.github.io/superhero-api/api
// geting ids: /id/#.json

// Get the section Element
const section = document.getElementById("images");

// Create the div container where all the data goes
const divContainer = document.createElement("div");

// Make the class name = "container" for bootstrap
divContainer.className = "container";

// API url
// Contains all the characters in the api
let url = "https://akabab.github.io/superhero-api/api/all.json";

// Updates the index.html page when the page loads
// Displays three random heroes everytime the page loads
function displayHeroes(data) {
    // get three random numbers
    // use the length of the data array for the random() call
    let charIds = [];
    let i;
    // stores 3 random integers into the IDs array
    for(i=0; i < 3; i++) {
        // random integer from 1 to data.length
        let num = Math.floor(Math.random() * data.length) + 1;
    
        // adding random number to the charIds array
        charIds.push(num);
    }

    // Create the parent div to store the row for bootstrap
    let parentDiv = document.createElement("div");
    
    // make the class = row
    // parentDiv.className = "row";

    // get the images from the data
    charIds.forEach((num) =>{
        // create three cards in a loop
        let cardDiv = document.createElement("div");
        
        // Change the display of the card to inline-block
        cardDiv.style.display = "inline-block";

        // Make the class = to cols of varying size
        // col-sm-6: for mobile devices
        // col-lg-3: for regular computer screens
        // pt-2: padding top
        // pb-2: padding bottom
        // pl-2: padding left
        // pr-2: padding right
        cardDiv.className = "card-div";

        // change the color of texts to black
        cardDiv.style.color = "black";

        // Create image tag for the character
        let image = document.createElement("img");

        // Set the source to one of the images from the data
        // data[num].images.md
        image.src = data[num].images.md;

        // Set the image alt
        // data[num].name
        image.alt = data[num].name;
        
        // Append the image to the card div
        cardDiv.appendChild(image);

        // Append the cardDiv to the parent div
        parentDiv.appendChild(cardDiv);
    });
    
    // Append the parent div to the div container
    divContainer.appendChild(parentDiv);

    // append divContainer to the section
    section.appendChild(divContainer);
}

// fetches the characters from the API
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
    displayHeroes(data);
    
}

// Calling function upon html page reaching the script tag
getCharacters();
