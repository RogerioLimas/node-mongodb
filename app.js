const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) throw err;
    // console.log(ObjectId());

    console.log('CONNECTED!');

    const db = client.db('animals');
    // Fetching data
    // db.collection('mammals')
    //   .find()
    //   .toArray((err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //   });
    // db.collection('mammals').deleteOne({_id: ObjectId('5bd5939e7f302e0cd887a5d4')},);

    // DELETING DATA
    const mammals = db.collection('mammals');
    mammals
      .deleteOne({
        name: 'fish',
      })
      .then((result) => {
        console.log(result);
      });

    // UPDATING DATA - usnaod Operators
    // mammals
    //   .findOneAndUpdate(
    //     { _id: new ObjectId('5bd593f24d08b944fc76bb9f') },
    //     { $set: { legs: 2 } },
    //   )
    //   .then((result) => {
    //     console.log('Atualizado!');

    //     if(result.ok !== '1') {
    //       console.error('NÃO HOUVE ATUALIZAÇÃO!');

    //     }
    //   }).catch((err) => {
    //     console.log('Erro: ', err);
    //   });

    // Creating data
    // db.collection('mammals').insertOne(
    //   {
    //     name: 'fish',
    //     legs: 2,
    //   },
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     console.log('INSERTED');
    //   },
    // );
  },
);
// const mongoose = require('mongoose');

// mongoose.connect(
//   'mongodb://localhost:27017/animals',
//   { useNewUrlParser: true },
// );
// mongoose.connection.once('open', () => {
//   console.log('Connected!');
// })
// .on('error', (err) => {
//   console.error(err);
// });

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/animals', { useNewUrlParser: true }, function(err, db) {
//     if(err) throw err;
//     console.log('CONNECTED');
//   },
// );
