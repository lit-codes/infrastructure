require('dotenv').config();
const http = require('http');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const serveStatic = require('serve-static');
const path = require('path');
const { BasicStrategy } = require('passport-http');
const CubejsServerCore = require('@cubejs-backend/server-core');
const Database = require('./src/Database');

const app = express();
app.use(require('cors')());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({ secret: process.env.CUBEJS_API_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
const database = new Database();

passport.use(new BasicStrategy(
    (user, password, done) => {
        if (user === 'admin' && password === process.env.LOGIN_PASSWORD) {
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
    /* TODO: pass token for development too */
    if (process.env.NODE_ENV !== 'production') {
        return next();
    }
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    next();
});

app.get('/auth/cubejs-token', (req, res) => {
    res.json({
        // Take note: cubejs expects the JWT payload to contain an object!
        token: jwt.sign({ u: req.user }, process.env.CUBEJS_API_SECRET, { expiresIn: '1d' })
    })
})

app.get('/search', async(req, res) => {
    const { teacher, count } = req.query;
    let numOfRows = count || 0;

    if (numOfRows < 1 || numOfRows > 10) {
        numOfRows = 5;
    }

    if (!teacher) return res.json([]);

    try {
        const teachers = await database.query(`
            SELECT first_name, last_name, id
            FROM   teacher
            WHERE  first_name || ' ' || last_name ILIKE '%' || $1 || '%'
            LIMIT $2
        `, [teacher, numOfRows]);
        res.json(teachers.rows);
    } catch(err) {
        console.log('Failed to get the teacher name, error: %s', err);
    }
})

if (process.env.NODE_ENV === 'production') {
    app.use(serveStatic(path.join(__dirname, 'dashboard-app/build')));
}

const serverCore = CubejsServerCore.create({
    checkAuth: (req, auth) => {
        /* TODO: pass token for development too */
        if (process.env.NODE_ENV !== 'production') {
            return;
        }
        if (!req.user) {
            throw new Error(`Unauthorized`);
        }
        req.authInfo = { u: req.user };
    }
});

serverCore.initApp(app);

app.use((req, res) => {
    res.redirect(`/?tid=${req.query.tid}`);
});

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, (err) => {
    if (err) {
        console.error('Fatal error during server start: ');
        console.error(e.stack || e);
    }
    console.log(`🚀 Cube.js server (${CubejsServerCore.version()}) is listening on ${port}`);
});
