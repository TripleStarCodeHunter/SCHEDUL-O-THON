/* */

// Use Express
const express = require("express");
// Use body-parser
const bodyParser = require("body-parser");
const router = express.Router();

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/", function (req, res) {
    // res.sendFile('index.html',{root:'./src'});
    res.status(200).json({ status: "UP" });
});


app.post('/register', async (req, res) => {
    /*
    postgresql related code comes here
    */
  });
  
  
