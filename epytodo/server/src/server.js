const port = process.env.PORT || 3001;
const express = require('express');
const app = express();
const router = (global.router = (express.Router()));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

require('./middleware/auth');
require('./routes/user/user.query');
require('./routes/todos/todos.query');
require('./routes/auth/auth');
require('./routes/user/user');
require('./routes/todos/todos');
app.use(router);

app.listen(port, () =>
    console.log(`App listening on port ${port}`)
);
