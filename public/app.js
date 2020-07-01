
const storeForm = document.querySelector('.form-input');

storeForm.addEventListener('submit', (event) => {
    
    event.preventDefault();
    const formElements = new FormData(storeForm);

    const storeName = formElements.get('store-name');
    const api_key = formElements.get('api-key');
    const api_pass = formElements.get('api-pass');
    const gSheet = formElements.get('google-link');

    const storeData = {
        storeName,
        api_key,
        api_pass,
        gSheet,
    }

    sendData(storeData);

    console.log(storeData);
})

async function sendData(data) {

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

