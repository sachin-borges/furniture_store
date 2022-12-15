const express = require("express")
const app = express();
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
const morganApiLogger = require('morgan');
const passport = require("passport");
const path = require("path")
const htmlTemplates = path.join(__dirname, 'templates');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morganApiLogger('dev'));
app.use(passport.initialize())
require('./config/passport')
app.use(require('express').static(path.join(__dirname, 'public')));
const routes = require('./routes')(express.Router(),app)
const frontendRoutes = require('./routes/frontendRoutes')(express.Router(),app,htmlTemplates)
app.use('/', routes)
app.use('/', frontendRoutes)
app.listen(4000, function(){
    console.log("app is listening to port 4000")
})