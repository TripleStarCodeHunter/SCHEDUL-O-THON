const express = require('express');
const bodyParser = require("body-parser");
const app = express();

/*Importing pg module for connecting to database*/
const {Client}=require('pg'); 
const client = new Client({
  connectionString: "postgres://qdueebqu:m-MJpr6-Emwb-9TqMeacMM2nOBqUV6GX@kandula.db.elephantsql.com/qdueebqu"
});

/* Connecting our file to database*/
client.connect();

/*Not sure but updateUserData will add user data everytime to an empty array which can be sent to postgresql database*/
let user = [];

const rootUrl = '/api';

app.use(bodyParser.json());

/*Some dummy requests */
app.get(`${rootUrl}/user`, (req, res) => { res.json(user); });
app.post(`${rootUrl}/user`, (req, res) => {
  const reqUser = req.body.user;
  user = [];
  user.push(reqUser);
  res.json(user);
});

/*A dummy request of the server fetching the data from database*/ 

app.get(`${rootUrl}/data`, (req, res) => {
  client.query("SELECT * FROM batch_info", (err, result) => {
    if (err) {
      res.status(500).send("Error fetching data from the database");
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/status', (req, res) => {
  res.json({info: 'Node.js, Express, and Postgres API'});
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen to the specified port, otherwise 3000
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
});
/**
 * The SIGTERM signal is a generic signal used to cause program 
 * termination. Unlike SIGKILL , this signal can be blocked, 
 * handled, and ignored. It is the normal way to politely ask a 
 * program to terminate. The shell command kill generates 
 * SIGTERM by default.
 */
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server Close: Process Terminated!');
    });
});