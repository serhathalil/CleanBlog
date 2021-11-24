const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
// const path = require('path');
const Article = require('./models/Article');
const app = express();
// const blog = { id: 1, title: 'Blog title', description: 'Blog description' };

//connect db
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const articles = await Article.find({});

  res.render('index', {
    articles,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.post('/articles', async (req, res) => {
  await Article.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
