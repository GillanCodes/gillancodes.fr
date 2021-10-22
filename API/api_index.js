require('dotenv').config({path: './config/.env'});
require('./config/db');

let gigsRoutes = require('./src/routers/gigs.routes');
let userRoutes = require('./src/routers/user.routes');
// let adminRoutes = require('./src/routers/admin.routes')

let {checkUser, home} = require('./middlewares/auth.middleware');
// let {checkAdmin} = require('./middlewares/permissions.middleware');

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

app.use('/api/gigs', gigsRoutes);
app.use('/api/user', userRoutes);

// app.use('/api/admin', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log('Listen on : ' + process.env.PORT);
})