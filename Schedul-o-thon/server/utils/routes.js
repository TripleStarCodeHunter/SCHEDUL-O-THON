const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const client = require("./conn");

const rootUrl = "/api";

const saltrounds = 10;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userid",
    secret: "hello and welcome to chitkara university",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 60 * 12,
    },
  })
);

app.post(`${rootUrl}/register`, (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;
  const authority = req.body.authority;
  console.log(username, password);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log(err);

    let sqlquery =
      "INSERT INTO register_info(name,user_name,email,phonenumber,password,authority) values(?,?,?,?,?,?);";

    client.query(
      sqlquery,
      [name, username, email, phonenumber, password, authority],
      (err, results) => {
        if (err) console.log(err);
        else res.send({ message: "user registered successfully" });
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    res.send("we need a token....");
  } else {
    jwt.verify(token, "jwtsecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "you failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get(`${rootUrl}/isUserAuth`, verifyJWT, (req, res) => {
  res.send("you are authenticated!!");
});

app.post(`${rootUrl}/login`, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let sqlquery = "SELECT * from register_info where username=?;";

  db.query(sqlquery, [username], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      console.log(result);
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtsecret", {
            expiresIn: 300,
          });
          req.session.user = result;
          res.json({ auth: true, token: token, result: result });
        } else {
          res.send({ auth: false, message: "wrong username and password!!" });
        }
      });
    } else {
      res.send({ auth: false, message: "user does not exist" });
    }
  });
});
