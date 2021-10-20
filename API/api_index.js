require('dotenv').config({path: './config/.env'});
require('./config/db');

let gigsRouter = require('./src/routers/gigs.router');
let userRouter = require('./src/routers/user.router');

let {checkUser, home} = require('./middlewares/auth.middleware');

let bodyParser = require("body-parser");
let ejs = require('ejs');
let cookieParser = require('cookie-parser');

let express = require('express');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.set('view engine', 'ejs');

//jwt
app.get('*', checkUser);
app.post('*', checkUser);
app.put('*', checkUser);
app.patch('*', checkUser);
app.delete('*', checkUser);

app.get('/', home);

app.use('/api/gigs', gigsRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log('Listen on : ' + process.env.PORT);
})