let backgroundColors = [
    'rgba(255, 85, 94, 0.8)',
    'rgba(255, 134, 80, 0.8)',
    'rgba(255, 233, 129, 0.8)',
    'rgba(139, 241, 139, 0.8)',
    'rgba(131, 178, 255, 0.8)',
    'rgba(155, 110, 243, 0.8)'
];

let borderColors = [
    'rgba(255, 85, 94, 1)',
    'rgba(255, 134, 80, 1)',
    'rgba(255, 233, 129, 1)',
    'rgba(139, 241, 139, 1)',
    'rgba(131, 178, 255, 1)',
    'rgba(155, 110, 243, 1)'
];

let url = "https://akabab.github.io/superhero-api/api/all.json";
const form = document.querySelector('form');
const heroOneName = document.getElementById('heroOneName');
const heroTwoName = document.getElementById('heroTwoName');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    getApiJson();
})

// function findIfExists(data) {
//     data.every(element => {
//         if(heroOneName.value === element.name)
//             return true;
//     })
// }

function isExists(data) {
    

    if(found1 === true && found2 === true) {

    }
}


function findNames(data) {
    const heroOneInfo = document.getElementById('heroOneInfo');
    const heroTwoInfo = document.getElementById('heroTwoInfo');

    let found1 = false;
    let found2 = false;

    data.forEach(element => {
        if(heroOneName.value === element.name) {
            found1 = true;
        }

        if(heroTwoName.value === element.name) {
            found2 = true;
        }
    })

    // let found = findIfExists(data);
    // console.log(found);


    if(found1 === true &&  found2 === true) {
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
                
                //create array for chart to use as data
                let stats1 = element.powerstats;
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
                //create array for chart to use as data
                let stats2 = element.powerstats;
            } 
        })
    }

    if(found1 === true &&  found2 === false) {
        let error = document.createElement('p');
        error.setAttribute('color', 'red');
        heroOneInfo.appendChild(error);
        error.innerText = 'Second input is not found. Please, try again.';
    }

    if(found1 === false && found2 === true) {
        let error = document.createElement('p');
        error.setAttribute('color', 'red');
        heroOneInfo.appendChild(error);
        error.innerText = 'First input is not found. Please, try again.';
    }
    
    if(found1 === false && found2 === false) {
        let error = document.createElement('p');
        error.setAttribute('color', 'red');
        heroOneInfo.appendChild(error);
        error.innerText = 'Names not found. Please, try again.';
    }

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