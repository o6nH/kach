const express = require('express');
const app = express();
const path = require('path');
//const routes = require('./routes/routes');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: process.env.SECRET || 'Darn cool secret!',
    resave: false,
    saveUninitialized: false,
  }))
//app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
    app,
}
