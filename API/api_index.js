require('dotenv').config({path: './config/.env'});
require('./config/db');

let gigsRoutes = require('./src/routers/gigs.routes');
let userRoutes = require('./src/routers/user.routes');
let articleRoutes = require('./src/routers/article.routes');
// let adminRoutes = require('./src/routers/admin.routes')

let {checkUser, home, requireAuth} = require('./middlewares/auth.middleware');
// let {checkAdmin} = require('./middlewares/permissions.middleware');

let bodyParser = require("body-parser");
let ejs = require('ejs');
let cookieParser = require('cookie-parser');
let cors = require('cors');

let express = require('express');
let app = express();

const corsOptions = {
    origin : process.env.CLIENT_URL,
    'credentials': true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.set('view engine', 'ejs');


//jwt
app.use('*', checkUser);

app.get('/', home);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use('/api/gigs', gigsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);

// app.use('/api/admin', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log('Listen on : ' + process.env.PORT);
})