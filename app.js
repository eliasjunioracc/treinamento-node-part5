const express = require('express');
const app = express();
const port = 3000;
const consign = require('consign');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign({ verbose: false })
.include('libs')
.then('models')
.then('utils')
.then('middlewares')
.then('controllers')
.then('routers')
.into(app);

app.get('*', (req, res) => {
    res.status(404).json({
        status: 'URL NOT FOUND'
    });
});

app.listen(port, () => {
    console.log(`Enviroment selected: ${env}!!!`);
    console.log(`Server is listening !!!`);
});