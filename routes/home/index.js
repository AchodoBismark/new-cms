const express= require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');


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
                message: 'Please add a title'
            });
        }

        if (!req.body.lastName) {
            errors.push({
                message: 'Please add a status'
            });
        }

        if (!req.body.email) {
            errors.push({
                message: 'Please add a discription'
            });
        }
        


        if (errors.length > 0) {
            res.render('admin/posts/create', {
                errors: errors
            });
        }


    res.send('home/register');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).then(posts =>{
         res.render('home/blog-post', {posts: posts});
    });
  
});

module.exports = router; 