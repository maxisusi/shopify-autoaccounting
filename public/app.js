const storeForm = document.querySelector('.form-input');
const accountingSide = document.querySelector('.accounting-controller');
getStoreData();

storeForm.addEventListener('submit', (event) => {
    
    const formElements = new FormData(storeForm);

    const storeName = formElements.get('store-name');
    const api_key = formElements.get('api-key');
    const api_pass = formElements.get('api-pass');
    const gSheet = formElements.get('google-link');
    const shopifySite = formElements.get('shopify-link');

    const storeData = {
        storeName,
        api_key,
        api_pass,
        gSheet,
        shopifySite,
    }

    sendStoreData(storeData);
    storeForm.reset();
})

async function sendStoreData(data) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    const response = await fetch('/api/send/store-data', options);
    const answer = await response.json();
    console.log(answer); 
    getStoreData();
}

async function getStoreData() {
    const response = await fetch('/api/get/store-data');
    const data = await response.json();
    displayStoreData(data);
    console.log(data);
}

function displayStoreData(data) {

    data.forEach(elem => {
        const labelCard = document.createElement('div');
        labelCard.classList.add('label-card');

        const sName = document.createElement('p');
        sName.textContent = elem.storeName;

        const sStatus = document.createElement('p');
        sStatus.innerHTML += `<a href="${elem.gSheet}">Google Sheet</a>`;

        const sendDataButton = document.createElement('button');
        sendDataButton.textContent = 'Send Data';
        sendDataButton.classList.add('primary-button');

        labelCard.append(sName, sStatus, sendDataButton);
        accountingSide.appendChild(labelCard);
    })
}








// const generate = document.querySelector('#generate');
// generate.addEventListener('click', async (event) => {
//     event.preventDefault();

//     console.log('Button submitted');


//     const response = await fetch('/app/orders')
//     const data = await response.json();

//     const fullData = data.orders;
//     console.log(fullData);

// })

