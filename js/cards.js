let url = "https://akabab.github.io/superhero-api/api/all.json";
let cardsInfo = document.getElementById('cards');

let sessionKey = "heroID";

window.onload = getApiJson();


function displayCards(data) {
    data.forEach(element => {
        let div = document.createElement('div');
        // div.className = 'card-border';
        cardsInfo.appendChild(div);
        
        let anchor = document.createElement('a');
        anchor.id = element.id;
        anchor.href = "character.html";

        anchor.addEventListener('click', (event) => {
            sessionStorage.setItem(sessionKey, anchor.id);
        });

        div.appendChild(anchor);
        //cardsInfo.appendChild(anchor);

        let img = document.createElement('img');
        img.src = element.images.sm;
        img.alt = element.name;

        anchor.appendChild(img);
        //div.appendChild(img);

        let name = document.createElement('h5');
        name.setAttribute('width', '160');
        name.className = 'heroName';
        div.appendChild(name);
        name.innerText = element.name;
        let realName = document.createElement('p');
        realName.setAttribute('width', '160');
        div.appendChild(realName);

        if(element.biography.fullName === '') {
            realName.innerText = element.name;
        } else {
            realName.innerText = element.biography.fullName;
        }

        //anchor.appendChild(div);
        
        // console.log(element.biography.fullName);
        // console.log(typeof(element.biography.fullName));
    })
}

async function getApiJson() {
    let getApi = await fetch(url);

    if(getApi == undefined) {
        console.log('error');
    }

    let getJson = await getApi.json();

    if(getJson == undefined) {
        console.log('error');
    }

    displayCards(getJson);

}