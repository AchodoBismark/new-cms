const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {
    res.render('admin/posts/index');
});


router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});

router.post('/create', (req, res) => {
    res.send('IT WORKED');
});

router.get('/edit', (req, res) => {
    res.render('admin/posts/edit');
});

module.exports = router;