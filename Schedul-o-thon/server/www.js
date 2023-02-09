// /* */

// // Use Express
// const express = require("express");
// // Use body-parser
// const bodyParser = require("body-parser");
// const router = express.Router();

// // Create new instance of the express server
// var app = express();

// // Define the JSON parser as a default way 
// // to consume and produce data through the 
// // exposed APIs
// app.use(bodyParser.json());

// // Create link to Angular build directory
// // The `ng build` command will save the result
// // under the `dist` folder.
// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

// // Init the server
// var server = app.listen(process.env.PORT || 3000, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
// });

// /*  "/api/status"
//  *   GET: Get server status
//  *   PS: it's just an example, not mandatory
//  */
// app.get("/", function (req, res) {
//     // res.sendFile('index.html',{root:'./src'});
//     res.status(200).json({ status: "UP" });
// });


// app.post('/register', async (req, res) => {
//     /*
//     postgresql related code comes here
//     */
//   });
  
/*Code starts here*/ 

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

//Not sure but updateUserData will add user data everytime to an empty array which can be sent to postgresql database
let user = [];

const rootUrl = '/api';

app.use(bodyParser.json());
app.get(`${rootUrl}/user`, (req, res) => { res.json(user); });
app.post(`${rootUrl}/user`, (req, res) => {
  const reqUser = req.body.user;
  user = [];
  user.push(reqUser);
  res.json(user);
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