/********************Signature*************************/
// Author: Lanz Ruiz
// Framework: Nodejsframework
// npm: express mvc generator
/******************************************************/

require('dotenv').config();
var express = require('express');
var SwaggerExpress = require('swagger-express-mw');
var cors = require('cors');
var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');
var favicon = require('serve-favicon');
var MongoDbService = require ('./services/mongodb.service');

var port = process.env.PORT || 9000;
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var subdomain = require('express-subdomain');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb',extended: true}));

require('./config/passport')(passport); // pass passport for configuration

// use it before all route definitions
app.use(cors());


//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating

app.use(favicon(__dirname + '/public/images/favicon.ico'));

var swaggerConfig = {
    appRoot: __dirname // required config
};

MongoDbService.connect();
SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) { throw err; }


	let storage = multer.memoryStorage(); //you might need to change this, check multer docs

	let mult = multer({ //you might need to change this, check multer docs
	storage: storage,
	limits: {
	  fileSize: 52428800
	}
	}).fields([{name: "file"}]);

	app.use(mult);


    // install middleware
    swaggerExpress.register(app);

    //don't listen if we are being run by mocha testing library
    if (!module.parent) {
        app.listen(port);
    }
});

module.exports = app;