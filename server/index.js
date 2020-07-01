const express = require('express');
const Datastore = require('nedb');
const app = express();
const cors = require('cors');
const request = require('request-promise');

app.listen(3000, () => console.log('Now listening on port 3000'));
app.use(cors());
app.use(express.json());

app.use(express.static('../public'));

const API_ENDPOINT = 'https://14921cb6e3f194f30bea0a165d9ef2fd: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@leloyerdesrois.myshopify.com/admin/api/2020-04/orders.json?fields=created_at,line_items,name,total_price,financial_status,product_id'


const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api/send/store-data', (req, res) => {
    console.log('I have a request');

    const data = req.body;

    if (isDataValid(data)) {
        console.log('Content is valid');
        const storeData = {
            storeName: data.storeName.toString(),
            api_key: data.api_key.toString(),
            api_pass: data.api_pass.toString(),
            gSheet: data.gSheet.toString(),
        }
        database.insert(storeData);

        console.log(storeData);
    }
    else {
        res.status(422);
        console.error('Content is not valid');
    }
})

app.get('/api/get/store-data', (req, res) => {
    console.log('I have a request');
    database.find({}, (err, data) => {
        if(err) {
            res.end(err);
            return;
        }

        res.json(data);
    })
})

function isDataValid(data) {
    return data.storeName && data.storeName.toString().trim() !== '' &&
        data.api_key && data.api_key.toString().trim() !== '' &&
        data.api_pass && data.api_pass.toString().trim() !== '' &&
        data.gSheet && data.gSheet.toString().trim() !== '';
}




// app.get('/app/orders', (req, res) => {

//     console.log('I have a request');

//     const options = {
//         method: 'GET',
//         uri: API_ENDPOINT,
//         json: true,
//         headers: { 
//             'Content-Type': 'application/json',
//         }
//     };

//     request(options)
//         .then(function(response) {
//             console.log(response);
//             res.status(200);
//             res.json(response);

//         })
//         .catch(function (err) {
//             console.log(err);
//             res.status(500)
//         })

// })

