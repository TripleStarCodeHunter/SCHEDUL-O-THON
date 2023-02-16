const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgres://qdueebqu:m-MJpr6-Emwb-9TqMeacMM2nOBqUV6GX@kandula.db.elephantsql.com/qdueebqu",
});

/* Connecting our file to database*/

module.exports = client;
