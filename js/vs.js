let backgroundColors = [
    ''
];

let url = "https://akabab.github.io/superhero-api/api/all.json";
const form = document.querySelector('form');
const heroOneName = document.getElementById('heroOneName');
const heroTwoName = document.getElementById('heroTwoName');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    getApiJson();
})

function findNames(data) {
    const heroOneInfo = document.getElementById('heroOneInfo');
    const heroTwoInfo = document.getElementById('heroTwoInfo');

    data.forEach(element => {
        if(heroOneName.value === element.name) {
            let name = document.createElement('h5');
            heroOneInfo.appendChild(name);
            name.innerText = element.name;
            let img = document.createElement('img');
            img.src = element.images.sm;
            img.alt = element.name;
            heroOneInfo.appendChild(img);
            let realName = document.createElement('p');
            heroOneInfo.appendChild(realName);
            if(element.biography.fullName === '') {
                realName.innerText = 'REAL NAME: same'
            } else {
                realName.innerText = 'REAL NAME: ' + element.biography.fullName;
            }
            let publisher = document.createElement('p');
            heroOneInfo.appendChild(publisher);
            publisher.innerText = 'PUBLISHER: ' + element.biography.publisher;
            let alignment = document.createElement('p');
            heroOneInfo.appendChild(alignment);
            alignment.innerText = 'ALIGNMENT: ' + element.biography.alignment;
        }

        if(heroTwoName.value === element.name) {
            let name = document.createElement('h5');
            heroTwoInfo.appendChild(name);
            name.innerText = element.name;
            let img = document.createElement('img');
            img.src = element.images.sm;
            img.alt = element.name;
            heroTwoInfo.appendChild(img);
            let realName = document.createElement('p');
            heroTwoInfo.appendChild(realName);
            if(element.biography.fullName === '') {
                realName.innerText = 'REAL NAME: same'
            } else {
                realName.innerText = 'REAL NAME: ' + element.biography.fullName;
            }
            let publisher = document.createElement('p');
            heroTwoInfo.appendChild(publisher);
            publisher.innerText = 'PUBLISHER: ' + element.biography.publisher;
            let alignment = document.createElement('p');
            heroTwoInfo.appendChild(alignment);
            alignment.innerText = 'ALIGNMENT: ' + element.biography.alignment;

        }
    })

    //console.log(heroOneName.value);
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

    findNames(getJson);

}