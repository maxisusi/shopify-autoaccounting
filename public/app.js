const generate = document.querySelector('#generate');
generate.addEventListener('click', async (event) => {
    event.preventDefault();

    console.log('Button submitted');


    const response = await fetch('/app/orders')
    const data = await response.json();

    const fullData = data.orders;
    console.log(fullData);

})

