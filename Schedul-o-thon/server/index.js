const client = require("./utils/conn");
const routes = require("./utils/routes");
const express = require("express");
const cors = require("cors");

const app = express();

const rootUrl = "/api";

app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  })
);

client.connect();

app.use("/", routes);
app.use(`/${rootUrl}`, routes);
app.use(`${rootUrl}/register`, routes);
app.use(`${rootUrl}/isUserAuth`, routes);
app.use(`${rootUrl}/login`, routes);
app.use(`${rootUrl}/batch`, routes);
app.use(`${rootUrl}/batches`, routes);
app.use(`${rootUrl}/sub_batch`, routes);
app.use(`${rootUrl}/section`, routes);
app.use(`${rootUrl}/sections`, routes);
app.use(`${rootUrl}/event`, routes);
app.use(`${rootUrl}/:batchId`, routes);
app.use(`${rootUrl}/:batchId/:subbatchId`, routes);
app.use(`${rootUrl}/register_info`, routes);


app.listen(3000, () => {
  console.log("port running on port 3000");
});
