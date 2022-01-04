require('dotenv').config({path: './config/.env'});
require('./config/db');

let gigsRoutes = require('./src/routers/gigs.routes');
let userRoutes = require('./src/routers/user.routes');
let articleRoutes = require('./src/routers/article.routes');
let editoRoutes = require('./src/routers/edito.routes');
// let adminRoutes = require('./src/routers/admin.routes')

let {checkUser, home, requireAuth} = require('./middlewares/auth.middleware');
// let {checkAdmin} = require('./middlewares/permissions.middleware');

let bodyParser = require("body-parser");
let ejs = require('ejs');
let cookieParser = require('cookie-parser');
let cors = require('cors');

let express = require('express');
let app = express();

var whitelist = ["http://localhost:3000", "http://192.168.1.38:3000", undefined];
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
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
app.use(checkUser);


app.get('/', home);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use('/api/gigs', gigsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/edito', editoRoutes)

// app.use('/api/admin', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log('Listen on : ' + process.env.PORT);
})