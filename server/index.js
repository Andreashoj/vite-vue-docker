const keys = require("./keys");

const express = require('express')
const app = express()
app.use(express.json())

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log("PG ERROR!", err));
});

app.get('/users', async (req, res) => {
  const users = await db.select().from('users')
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db('users').insert({ name: req.body.name }).returning('*')
  res.json(user)
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(5000, (req, res) => {
    console.log('listening on port: 5000!!')
})