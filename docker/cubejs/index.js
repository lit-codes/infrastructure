require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const serveStatic = require('serve-static');
const path = require('path');
const { BasicStrategy } = require('passport-http');
const CubejsServerCore = require('@cubejs-backend/server-core');

const app = express();
app.use(require('cors')());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({ secret: process.env.CUBEJS_API_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new BasicStrategy(
  (user, password, done) => {
    if (user === 'admin' && password === 'admin') {
      done(null, { user });
    } else {
      done(null, false);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/login', passport.authenticate('basic'), (req, res) => {
  res.redirect('/')
});

app.use((req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic(path.join(__dirname, 'dashboard-app/build')));
}

const serverCore = CubejsServerCore.create({
  checkAuth: (req, auth) => {
    if (!req.user) {
      throw new Error(`Unauthorized`);
    }
    req.authInfo = { u: req.user };
  }
});

serverCore.initApp(app);

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.error('Fatal error during server start: ');
    console.error(e.stack || e);
  }
  console.log(`🚀 Cube.js server (${CubejsServerCore.version()}) is listening on ${port}`);
});
