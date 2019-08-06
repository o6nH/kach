const express = require('express');
const app = express();
const path = require('path');
//const routes = require('./routes/index');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 3000;
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionDB = require('./db/index');

function extendDefaultFields(defaults, _session){
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: _session.userId,
    isAuthenticated: _session.isAuthenticated,
  }
}

const sequelizeSessionStore = new sequelizeStore({
  db: sessionDB,
  table: 'session',
  extendDefaultFields
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET || 'Darn cool secret!',
    store: sequelizeSessionStore,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 90 * 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: false,
  }))
//app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '../public')));

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
    app,
}
