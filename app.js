const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const User = require('./models/User');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost:27017/mongoose',
  { useNewUrlParser: true },
);
mongoose.connection
  .once('open', () => {
    console.log('CONNECTED');
  })
  .on('error', (err) => {
    console.log('Could not connect', err);
  });

app.get('/', (req, res) => {
  res.send('ROOT');
});

app.post('/users', (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isActive: req.body.isActive,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.send(`User saved!\n${savedUser}`);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.status(500).send(`Error: ${err}`);
    });
});

const port = process.env.PORT || 4444;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.get('/users', (req, res) => {
  // User.findOne({

  // });
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(`Erro: ${err}`);
    });
});

app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(
    id,
    {
      firstName: 'Letícia',
    },
    { new: true },
  ).then((updatedUser) => {
    res.status(200).send(`User Updated: ${updatedUser}`);
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(500).send(`Error: ${err}`);
    } else {
      res.status(200).send(`User Removed: ${result}`);
      console.log(result);
    }
  });
});
