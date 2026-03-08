const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    subtitle: {
      type: String,
      required: true
    },

    imageUrl: {
      type: String,
      required: true
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    type: {
      type: String,
      enum: ["UPLOAD", "POPULATE"],
      default: "UPLOAD"
    },

    content: {
      type: String,
      required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);