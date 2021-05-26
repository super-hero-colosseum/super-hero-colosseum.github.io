let url = "https://akabab.github.io/superhero-api/api/all.json";
let cardsInfo = document.getElementById('cards');

window.onload = getApiJson();

function displayCards(data) {
    data.forEach(element => {
        let div = document.createElement('div');
        // div.className = 'card-border';
        cardsInfo.appendChild(div);
        // let a = document.createElement('a');
        let img = document.createElement('img');
        img.src = element.images.sm;
        img.alt = element.name;
        div.appendChild(img);
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