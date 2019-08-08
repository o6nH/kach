const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');
const session = require('express-session');
require('dotenv').config();
const sessionDB = require('./db/index');
const port = process.env.PORT || 3000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const store = new SequelizeStore({
  db: sessionDB,
  table: 'sessions',
  extendDefaults: (defaults, _session) => {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: _session.userId,
      isAuthenticated: _session.isAuthenticated
    }
  }
})
console.log(store);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'a;ldf;alskdf',
  resave: false,
  saveUninitialized: true,
  store
}))

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
    app,
}
