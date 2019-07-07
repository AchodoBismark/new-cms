const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostShema = new Schema({
    title: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'private'
    },

    allowComments:{
        type: Boolean,
        required: true
    },

    body:{
        type: String,
        required: true
    },
    file:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('posts', PostShema);