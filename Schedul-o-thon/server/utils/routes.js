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

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(
  session({
    key: "userid",
    secret: "hello and welcome to schedulothon",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 30,
    },
  })
);

router.get(`${rootUrl}/register`, (req, res) => {
  let sqlqeury = "SELECT * FROM register_info";
  client.query(sqlqeury, (err, result) => {
    if (err) throw err;
    else res.json(result);
  });
});

router.post(`${rootUrl}/register`, (req, res) => {
  const name = req.body.fullname;
  const username = req.body.username;
  const email = req.body.email;
  const phonenumber = req.body.mobile;
  const password = req.body.password;
  const cpassword = req.body.conf_password;
  const authority = req.body.userType;

  // console.log(req.body);

  let sqlq =
    "SELECT * FROM register_info where user_name='" +
    username +
    "' OR email = '" +
    email +
    "'";

  client.query(sqlq, (err, response) => {
    if (err) {
      res.json({ message: err });
    }
    if (response.rows.length > 0) {
      res.json({ message: "already exists" });
    } else {
      // res.json({ message: "done" });
      bcrypt.hash(password, saltrounds, (err, hash) => {
        if (err) console.log(err);

        let sqlquery =
          "INSERT INTO register_info (name,user_name,email,phone_number,password,roll) VALUES ($1, $2,$3,$4,$5,$6)";

        if (password !== cpassword) {
          res.send({ message: "passwords do not match!!!" });
        } else {
          bcrypt.hash(password, saltrounds, (err, hash) => {
            if (err) console.log(err);
            else {
              client.query(
                sqlquery,
                [name, username, email, phonenumber, hash, authority],
                (err, results) => {
                  if (err) console.log(err);
                  // else res.send({ message: "user registered successfully" });
                }
              );
            }
          });
        }
      });
      res.json({ message: "done" });
    }
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

router.get(`${rootUrl}/isUserAuth`, verifyJWT, (req, res) => {
  res.send("you are authenticated!!");
});

router.post(`${rootUrl}/login`, (req, res) => {
  const username = req.body.username;
  console.log(username);
  const password = req.body.password;
  console.log(password);

  let sqlquery =
    "SELECT * FROM register_info where user_name='" + username + "'";

  client.query(sqlquery, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.rows.length > 0) {
      console.log(result);
      bcrypt.compare(password, result.rows[0].password, (error, response) => {
        if (response) {
          const id = result.rows[0].id;
          const token = jwt.sign({ id }, "jwtsecret", {
            expiresIn: 300,
          });
          req.session.user = result.rows[0].user_name;
          res.json({
            auth: true,
            token: token,
            username: result.rows[0].user_name,
          });
        } else {
          res.send({ auth: false, message: "wrong username and password!!" });
        }
      });
    } else {
      res.send({ auth: false, message: "user does not exist" });
    }
  });
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////

//batch creation

// Define API endpoints for batch creation 
router.post(`${rootUrl}/batch`, async (req, res) => {
  const { batchname, noOfSubBatch, batchSize, location, start, batchType, created_by } = req.body;

  console.log(req.body)
  const currentDate = new Date();
  const created_on = currentDate;

  const query = {
    text: 'INSERT INTO batch_info(batch_name, subbatch_count, batch_size, location, start_date, batch_type, created_by, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [batchname, noOfSubBatch, batchSize, location, start, batchType, created_by, created_on],
  };

  try {
    const result = await client.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


////////////////////////////////////////////////////////////////////
//disply batches


router.get(`${rootUrl}/display-batches`, async (req, res) => {
  try {
    // Fetch batch information from the database
    const result = await client.query('SELECT batch_name, created_by,batch_size,start_date,location, batch_type,subbatch_count FROM batch_info');

    // Return the batch information as a JSON response
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("eerror here")
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
