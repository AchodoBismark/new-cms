const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');



//set Mongooes
mongoose.connect('mongodb://localhost:27017/cms', {
    useNewUrlParser: true
}).then(db => {
    console.log('Mongo is connected');
}).catch(error => console.log('COULD NOT CONNECT ' + error));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

 
app.get('/', (req, res)=>{
    res.render('home/index');
});




const port = process.env.PORT || 4600;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});