const port = process.env.PORT || 3001;
const express = require('express');
const app = express();
const router = (global.router = (express.Router()));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes/about');
require('./routes/contact');
require('./routes/home');
require('./routes/services');
app.use(router);

app.listen(port, () =>
    console.log(`API listening on port ${port}`)
);