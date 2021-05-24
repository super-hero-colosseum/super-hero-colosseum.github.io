// Access token: 287893849691649
// Make fetch calls to: https://superheroapi.com/api/287893849691649/reference
// character ids range from 1-733

const section = document.getElementById("images");
const divContainer = document.createElement("div");
divContainer.className = "container";
let url = "https://superheroapi.com/api/287893849691649/";
let charIds = [];
let i;
// stores 3 random integers into the IDs array
for(i=0; i < 3; i++) {
    let num = Math.floor(Math.random() * 733) + 1; // random integer from 1 to 733
     charIds.push(num);
 }

//console.log(charIds);
// This did not work, need to find some way around CORS blocking

// function updateHTML() {
//     let parentDiv = document.createElement("div");
//     parentDiv.className = "row";
//     let cardDiv = document.createElement("div");
//     cardDiv.style.display = "inline-block";
//     cardDiv.className = "card-div col-sm-6 col-lg-3 pt-2 pb-2 pl-2 pr-2";
//     cardDiv.style.color = "black";
//     let image = document.createElement("img");
//     image.src = url + charIds[0];

//     cardDiv.appendChild(image);
//     parentDiv.appendChild(cardDiv);

//     section.appendChild(parentDiv);
// }

// updateHTML();

// add three random images to the index.html
/*
async function addImages() {
    urlWithID = url + charIds[0];
    //console.log(urlWithID);
    try {
        let response = await fetch(urlWithID);
        console.log(response);
        let data = await response.json();
        console.log(data);

    }catch (error) {
        console.log(error);
    }
}

addImages();
*/
