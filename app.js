const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require ('express-fileupload');
const session = require ('express-session');
const flash = require ('connect-flash');
const {mongoDbUrl} = require ('./config/database');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




app.use(upload());
//set Mongooes
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true
}).then(db => {
    console.log('Mongo is connected');
}).catch(error => console.log('COULD NOT CONNECT TO DB' + error));


//Static files CSS & JS
app.use(express.static(path.join(__dirname, 'public')));

//use handlebars helpers
const {select, generateTime} = require('./helpers/handlebars-helpers');

//Set View Engine
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers:{select: select,generateTime: generateTime}}));
app.set('view engine', 'handlebars');


//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method override
app.use(methodOverride('_method'));

//Flash message
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

//PASSPORT
app.use(passport.initialize());
app.use(passport.session())

// Local variables using middleware
app.use((req, res, next)=>{
    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.form_message = req.flash('form_message');
    res.locals.error = req.flash('error');
    next();
}); 


 //Load Routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

//Use Routes Middleware
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

const port = process.env.PORT || 4600;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});