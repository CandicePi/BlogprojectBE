const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema(

    {
        title: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        subtitle: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            default: null
        },

        type: {
            type: String,
            enum: ["UPLOAD", "POPULATE"],
            require: true
        }
    

    },{ timestamps : true}
);
module.exports = mongoose.model('Post', PostSchema);