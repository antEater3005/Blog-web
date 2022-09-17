const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const Blog = require('./model/blog_schema');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const dbURI =
  'mongodb+srv://avinash:avi1234@nodetest.suppcli.mongodb.net/nodetest?retryWrites=true&w=majority';

mongoose
  .connect(dbURI)
  .then((res) => {
    console.log('Connected to mongoDB.');

    app.listen(PORT, console.log('Listening to port 8800...'));
  })
  .catch((err) => {
    console.log('Cannot connect to mongodb\n', err);
  });

app.use(morgan('dev'));

// heroku
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

// get list of blogs
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
      console.log('data found');
    })
    .catch((err) => {
      console.log('There is server issue');
    });
});

// get single blog
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Blog.findById(id)
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(`Cannot fetch data ERROR:${err}`);
    });
});

// create a new blog
app.post('/create', (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog
    .save()
    .then(() => {
      console.log('Blog created.');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Cannot created new blog ERROR:${err}`);
    });
});

// deleting a blog by id
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
    });
});
