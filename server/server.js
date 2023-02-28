const express = require('express');
const app = express();
const fs = require('fs');
var cors = require('cors')


app.listen(3001, () => {
    console.log('Server listening on port 3000');
});
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.get('/api/data/Medal', cors(corsOptions), (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/medals.json'));
    let modifiedData = data.map((country) => {
        let sum = country.gold + country.bronze + country.silver;
        country["total"] = country.gold + country.bronze + country.silver;
        return country;
    });
    return res.json(modifiedData);
});