const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const cors = require('cors');
const bodyparser = require('body-parser')

dotenv.config();

// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = process.env.DB_NAME;
const app = express()
const port = 3000

// Middleware
app.use(bodyparser.json())
app.use(cors())



// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
     const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save Passwords
app.post('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
})

// Delete the Password
app.delete('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})
app.listen(port, () => {
  console.log(`PassHive listening at http://localhost:${port}`)
})