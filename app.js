const { MongoClient } = require('mongodb');

const express = require('express');
const { urlencoded, static } = require('express');

const app = express();
const port = 3000;

const url = 'mongodb://admin:password@localhost:27017';
const dbName = 'mongodb';

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/' });
});

app.post('/save', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.send('Error connecting to MongoDB');
            return;
        }

        const db = client.db(dbName);
        const collection = db.collection('users');

        collection.insertOne(req.body, (err, result) => {
            if (err) throw err;

            res.send('User profile saved successfully');
            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});