const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');
const session = require('express-session');
const db = require('./db/index');
const sessionModel = require('./db/models/Session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();
const port = process.env.PORT || 3000;
const store = new SequelizeStore({
  db,
  table: 'session',
  extendDefaults: (defaults, _session) => {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: _session.userId,
    }
  }
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '..', 'public')))
app.use('/api', routes);
app.use(session({
  secret: 'a;ldf;alskdf',
  resave: false,
  saveUninitialized: true,
  store
}))
app.listen(port, () => console.log(`listening on port ${port}`));

db.sync();

module.exports = {
    app,
}
