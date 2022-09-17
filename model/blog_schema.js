const { Schema, default: mongoose } = require('mongoose');

const blogs_schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model('Blog', blogs_schema);
module.exports = Blog;
