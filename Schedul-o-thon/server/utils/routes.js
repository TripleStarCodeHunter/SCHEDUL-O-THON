// const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const client = require("./conn");
const cookieParser = require("cookie-parser");
const rootUrl = "/api";

const saltrounds = 10;

// router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(
  session({
    secret: "chitkara",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // set to true if you are using HTTPS
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
  // console.log(username);
  const password = req.body.password;
  const usertype = req.body.userType;
  // console.log(password);
  //
  let sqlquery =
    "SELECT * FROM register_info where user_name='" +
    username +
    "' and roll='" +
    usertype +
    "'";

  client.query(sqlquery, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (username == "" || password == "" || usertype == "") {
      res.send({ auth: false, message: "enter username and password" });
    } else if (result.rows.length > 0) {
      // console.log(result);
      bcrypt.compare(password, result.rows[0].password, (error, response) => {
        if (response) {
          // const id = result.rows[0].user_name;
          const token = jwt.sign({ username: req.body.username }, "chitkara", {
            expiresIn: "1h",
          });

          req.session.user = { username: req.body.username, token: token };

          console.log(req.session.user);
          res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });

          res.json({
            auth: true,
            token: token,
            username: req.body.username,
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

router.get("/api/login", (req, res) => {
  res.send(req.session.user.username);
});

router.get("/api/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("token");
    res.send({ message: "successful logout" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//batch creation

// Define API endpoints for batch creation
router.post(`${rootUrl}/batch`, async (req, res) => {
  const {
    b_batchname,
    num_sub_batches,
    size_batch,
    location_batch,
    start_batch,
    batch_type,
  } = req.body;

  console.log(req.body);
  const currentDate = new Date();
  const created_on = currentDate;

  let sqlq = "SELECT * FROM batch_info where batch_name='" + b_batchname + "'";

  client.query(sqlq, (err, result) => {
    if (err) {
      res.json({ message: err });
    }
    if (result.rows.length > 0) {
      res.json({ add: false, message: "already exists" });
    } else {
      const query = {
        text: "INSERT INTO batch_info(batch_name, subbatch_count, batch_size, location, start_date, batch_type, created_by, created_on) VALUES($1, $2, $3, $4, $5, $6, 'Gulshan', $7) RETURNING *",
        values: [
          b_batchname,
          num_sub_batches,
          size_batch,
          location_batch,
          start_batch,
          batch_type,
          created_on,
        ],
      };

      try {
        const result = client.query(query);
        res.json({ add: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

////////////////////////////////////////////////////////////////////
//disply batches

router.get(`${rootUrl}/batch`, async (req, res) => {
  try {
    // Fetch batch information from the database
    const result = await client.query("SELECT * FROM batch_info");

    // Return the batch information as a JSON response
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("error here");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// route for sub_batch

router.post(`${rootUrl}/sub_batch`, async (req, res) => {
  const {
    s_batchname,
    batch_name,
    stream_name,
    size_batch,
    location_batch,
    start_batch,
    end_batch,
    admin_batch,
  } = req.body;

  // console.log(req.body);

  let sqlq =
    "SELECT * FROM sub_batches where sub_batch_name='" + s_batchname + "'";

  client.query(sqlq, (err, result) => {
    if (err) {
      res.json({ message: err });
    }
    if (result.rows.length > 0) {
      res.json({ add: false, message: "already exists" });
    } else {
      const query = {
        text: "INSERT INTO sub_batches(sub_batch_name,f_batchid, batch_name,stream,size, location, start_date, end_date,batch_admin, feedback, dl_name) VALUES($1,1,$2,$3,$4,$5,$6,$7,$8,'this is dummy feedback','kanika@gmail.com') RETURNING *",
        values: [
          s_batchname,
          batch_name,
          stream_name,
          size_batch,
          location_batch,
          start_batch,
          end_batch,
          admin_batch,
        ],
      };

      try {
        const result = client.query(query);
        res.json({ add: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

router.get(`${rootUrl}/sub_batch`, (req, res) => {
  let sqlqeury = "SELECT * FROM sub_batches";
  client.query(sqlqeury, (err, result) => {
    if (err) throw err;
    else res.json(result.rows);
  });
});

////////////////////////////////////////////////////
//section creation

router.post(`${rootUrl}/section`, async (req, res) => {
  const {
    sectionName,
    strength,
    track,
    section_owner,
    classroom,
    section_dl,
    trainee_list,
  } = req.body;

  console.log(req.body);

  const query = {
    text: "INSERT INTO sections_info(section_name,strength,track,section_owner,classroom,section_dl, trainee_list,sub_batch_id) VALUES($1,$2,$3,$4,$5,$6,$7,3) RETURNING *",
    values: [
      sectionName,
      strength,
      track,
      section_owner,
      classroom,
      section_dl,
      trainee_list,
    ],
  };

  try {
    const result = await client.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(`${rootUrl}/sections`, (req, res) => {
  let sqlqeury = "SELECT * FROM sections_info";
  client.query(sqlqeury, (err, result) => {
    if (err) throw err;
    else res.json(result.rows);
  });
});

/////////////////////////////////
//delete batches

router.delete(`${rootUrl}/:batchId`, async (req, res, next) => {
  const { batchId } = req.params;

  try {
    const result = await client.query(
      "DELETE FROM batch_info WHERE batch_id = $1",
      [batchId]
    );
    if (result.rowCount > 0) {
      res.status(200).send(`Batch ${batchId} has been deleted.`);
    } else {
      res.status(404).send(`Batch ${batchId} not found.`);
    }
  } catch (err) {
    next(err);
  }
});

//////////////////
//subbatch deletaion

router.delete(`${rootUrl}/:batchId/:subbatchId`, async (req, res, next) => {
  const { subbatchId } = req.params;
  try {
    const result = await client.query(
      "DELETE FROM sub_batches WHERE sub_batch_id = $1",
      [subbatchId]
    );
    if (result.rowCount > 0) {
      res.status(200).send(`Subbatch ${subbatchId} has been deleted.`);
    } else {
      res.status(404).send(`Subbatch ${subbatchId} not found.`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
