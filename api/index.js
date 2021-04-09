require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const redis = require('redis');

const redisClient = redis.createClient();
const RedisStore = require('connect-redis')(session);

const router = require('./controllers/index');

const app = express();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: 'sid',
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: true,
  },
}));

app.listen(process.env.PORT, () => {
  console.log(`Api listening at http://localhost:${process.env.PORT}`);
});

app.use(express.static('public'));

app.use('/', router);
