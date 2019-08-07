const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');
const session = require('express-session');
require('dotenv').config();
const port = process.env.PORT || 3000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionDB = require('./db/index');

function extendDefaultFields(defaults, _session){
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: _session.userId,
    isAuthenticated: _session.isAuthenticated,
  }
}

const sequelizeSessionStore = new SequelizeStore({
  db: sessionDB,
  sessionModel: 'sessions'
})

console.log("ssstore", sequelizeSessionStore);

let sess = {
  secret: process.env.SECRET || 'Darn cool secret!',
  store: sequelizeSessionStore,
  // checkExpirationInterval: 15 * 60 * 1000,
  // expiration: 90 * 24 * 60 * 60 * 1000,
  resave: false,
  saveUninitialized: true,
  // cookie: {}
}

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session(sess))
app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '../public')));

sequelizeSessionStore.sync();

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = {
    app,
}
