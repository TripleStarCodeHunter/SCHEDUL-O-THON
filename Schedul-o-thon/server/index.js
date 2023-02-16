const client = require("./utils/conn");
const routes = require("./utils/routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["url of angular app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

client.connect();

app.use("/", routes);
app.use(`${rootUrl}/register`, routes);
app.use(`${rootUrl}/isUserAuth`, routes);
app.use(`${rootUrl}/login`, routes);

app.listen(3000, () => {
  console.log("port running on port 3000");
});
