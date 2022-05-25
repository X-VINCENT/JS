const port = process.env.PORT || 3001;
const express = require('express');
const app = express();
const router = (global.router = (express.Router()));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
