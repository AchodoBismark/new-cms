const express= require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const  passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


 router.all('/*', (req, res, next) => {
     req.app.locals.layout = 'home';
     next();
 });



router.get('/', (req, res) => {

    Post.find({}).then(posts =>{
         res.render('home/index', {posts: posts});
    });
   
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

router.get('/login', (req, res) => {
    res.render('home/login');
});

// APP LOGIN
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user) return done(null, false, {message: 'NO USER FOUND'});
        bcrypt.compare(password, user.password, (err, matched)=>{
            if(err) return err;
            if(matched){
                return done(null, user);
            } else{
                return done(null, false, {message: 'INCORRECT PASSWORD'});
            }

        });
    });

}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
    
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);

});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.post('/register', (req, res) => {

    let errors = [];
    const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });


        if (!req.body.firstName) {
            errors.push({
                message: 'Please add a First Name'
            });
        }

        if (!req.body.lastName) {
            errors.push({
                message: 'Please add a Last Name'
            });
        }

        if (!req.body.email) {
            errors.push({
                message: 'Please add an email'
            });
        }
        


        if (errors.length > 0) {
            res.render('admin/posts/create', {
                errors: errors
            });
        }

         bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(newUser.password, salt, (err, hash) => {
                 if (err) return err;
                 newUser.password = hash;
                newUser.save().then(saveUser => {
                        req.flash('success_message', `User ${saveUser.firstName} was created successfully`);
                        res.redirect('/login');
                    }).catch(err => {
                        req.flash('error_message', `User ${saveUser.firstName} was not created`+ err);
                 });
             });
         });


});

router.get('/post/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).then(posts =>{
         res.render('home/blog-post', {posts: posts});
    });
  
});

module.exports = router; 