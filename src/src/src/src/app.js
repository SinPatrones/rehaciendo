const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//Settingsls
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());


//Middlewares
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.use('/', require('./routes/index'));
app.use('/panel', require('./routes/panel.routes'));

//app.use('/', require('./routes/acceso.routes'));


//Static files
app.use(express.static(path.join(__dirname, 'public')));


//Start the server

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
