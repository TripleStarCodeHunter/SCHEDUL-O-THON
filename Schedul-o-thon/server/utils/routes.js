// const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const client = require("./conn");
const cookieParser = require("cookie-parser");
const { query } = require("express");
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
          "INSERT INTO register_info (name,user_name,email,phone_number,password,role) VALUES ($1, $2,$3,$4,$5,$6)";

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
    "' and role='" +
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
  res.send({ username: req.session.user.username });
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

  const new_location_batch = location_batch.slice(3);

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
          new_location_batch,
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
//display batches

router.get(`${rootUrl}/batch`, async (req, res) => {
  try {
    // Fetch batch information from the database
    const result = await client.query("SELECT * FROM batch_info");

    // Return the batch information as a JSON response
    // console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("error here");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//batch dispaly form
router.get(`${rootUrl}/batch-display-form/:batch_id`, async (req, res) => {
  try {
    // Fetch batch information from the database
    const { batch_id } = req.params;
    const result = await client.query(
      "SELECT * FROM batch_info WHERE batch_id=$1",
      [batch_id]
    );

    // Return the batch information as a JSON response
    console.log(result.rows);
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
  const new_batch_name = batch_name.slice(3);
  const new_stream_name = stream_name.slice(3);
  const new_location = location_batch.slice(3);
  console.log(new_batch_name);
  // console.log(req.body);

  let sqlq =
    "SELECT * FROM sub_batches where sub_batch_name='" + s_batchname + "'";
  let f_batchid;
  let get_fbatchid =
    "SELECT batch_id FROM batch_info WHERE batch_name = '" +
    new_batch_name +
    "'";
  console.log(get_fbatchid);
  client.query(get_fbatchid, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      f_batchid = result.rows[0].batch_id;
    }
  });

  client.query(sqlq, (err, result) => {
    if (err) {
      res.json({ message: err });
    }
    if (result.rows.length > 0) {
      res.json({ add: false, message: "already exists" });
    } else {
      const query = {
        text: "INSERT INTO sub_batches(sub_batch_name,f_batchid, batch_name,stream,size, location, start_date, end_date,batch_admin, feedback, dl_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'this is dummy feedback','kanika@gmail.com') RETURNING *",
        values: [
          s_batchname,
          f_batchid,
          new_batch_name,
          new_stream_name,
          size_batch,
          new_location,
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

//Subbatch display
router.get(`${rootUrl}/sub_batch`, (req, res) => {
  const f_batchid = req.query.fbatch_id;
  let sqlQuery = "SELECT * FROM sub_batches";
  if (f_batchid) {
    sqlQuery += ` WHERE f_batchid = '${f_batchid}'`;
  }
  client.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result.rows);
    }
  });
});

//Getting subbatch for update form
router.get(`${rootUrl}/update-subbatch-form/:subbatch_id`, async (req, res) => {
  try {
    // Fetch batch information from the database
    const { subbatch_id } = req.params;
    const result = await client.query(
      "SELECT * FROM sub_batches WHERE sub_batch_id=$1",
      [subbatch_id]
    );

    // Return the batch information as a JSON response
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("error here");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(`${rootUrl}/batches`, (req, res) => {
  if (req.session.user) {
    let sqlqeury =
      "SELECT * FROM batch_info where created_by='" +
      req.session.user.username +
      "'";
    client.query(sqlqeury, (err, result) => {
      if (err) throw err;
      else res.json(result.rows);
    });
  }
});

router.get(`${rootUrl}/sub_batches`, (req, res) => {
  if (req.session.user) {
    let sqlqeury =
      "SELECT * FROM sub_batches where batch_admin='" +
      req.session.user.username +
      "'";
    client.query(sqlqeury, (err, result) => {
      if (err) throw err;
      else res.json(result.rows);
    });
  }
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
    subb,
  } = req.body;

  console.log(req.body);

  const new_sub_batch_name = subb;
  console.log(new_sub_batch_name);

  let sqlq =
    "SELECT * FROM sections_info where section_name='" + sectionName + "'";
  let sub_batch_id;
  let get_subbatchid =
    "SELECT sub_batch_id FROM sub_batches WHERE sub_batch_name = '" +
    new_sub_batch_name +
    "'";
  // console.log(get_subbatchid)
  client.query(get_subbatchid, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      sub_batch_id = result.rows[0].sub_batch_id;
    }
  });

  client.query(sqlq, (err, result) => {
    // console.log(result)
    if (err) {
      res.json({ message: err });
    }
    if (result.rows.length > 0) {
      res.json({ add: false, message: "already exists" });
    } else {
      const query = {
        text: "INSERT INTO sections_info(section_name,strength,track,section_owner,classroom,section_dl, trainee_list,sub_batch_id,sub_batch_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        values: [
          sectionName,
          strength,
          track,
          section_owner,
          classroom,
          section_dl,
          trainee_list,
          sub_batch_id,
          subb,
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

////////////////////////////

router.get(`${rootUrl}/sections`, async (req, res) => {
  try {
    // Fetch batch information from the database
    const result = await client.query("SELECT * FROM sections_info");

    // Return the batch information as a JSON response
    // console.log(result.rows)
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("error here");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

////////////////////////////////////////////////////

router.get(`${rootUrl}/event`, (req, res) => {
  const id = req.query.id;
  let sqlQuery = "SELECT * FROM events";
  if (id) {
    sqlQuery += ` WHERE section_id = '${id}'`;
  }
  client.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result.rows);
    }
  });
});

router.post(`${rootUrl}/event`, async (req, res) => {
  const {
    eventname,
    start,
    end,
    instructor,
    additionalInfo,
    scheduleName,
    batch,
    sub_batch,
    section,
    description,
  } = req.body;

  console.log(req.body);

  try {
    const sub_batch_query =
      "SELECT sub_batch_id FROM sub_batches WHERE sub_batch_name = $1";
    const sub_batch_result = await client.query(sub_batch_query, [sub_batch]);
    const sub_batch_id = sub_batch_result.rows[0].sub_batch_id;

    const batch_query = "SELECT batch_id FROM batch_info WHERE batch_name = $1";
    const batch_result = await client.query(batch_query, [batch]);
    const batch_id = batch_result.rows[0].batch_id;

    const section_query =
      "SELECT id FROM sections_info WHERE section_name = $1";
    const section_result = await client.query(section_query, [section]);
    const section_id = section_result.rows[0].id;

    const insert_query =
      "INSERT INTO events(event_name,start_date,end_date,instructor,additional_info, schedule_name,batch,sub_batch,section,description,batch_id,sub_batch_id,section_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *";
    const values = [
      eventname,
      start,
      end,
      instructor,
      additionalInfo,
      scheduleName,
      batch,
      sub_batch,
      section,
      description,
      batch_id,
      sub_batch_id,
      section_id,
    ];

    const result = await client.query(insert_query, values);
    res.json({ add: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete(`${rootUrl}/del-event/:id`, async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await client.query("DELETE FROM events WHERE id = $1", [id]);
    res.status(200).send(`Event ${id} has been deleted.`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

////////////////////////////

router.get(`${rootUrl}/sections`, (req, res) => {
  const sub_batch_id = req.query.sub_batch_id;
  let sqlQuery = "SELECT * FROM sections_info";
  if (sub_batch_id) {
    sqlQuery += ` WHERE sub_batch_id = '${sub_batch_id}'`;
  }
  client.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result.rows);
    }
  });
});

/////////////////////////////////
//delete batches

router.delete(`${rootUrl}/del-batch/:batchId`, async (req, res, next) => {
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

/////////////////////////
// update batches

router.post(`${rootUrl}/update_batch/:batchId`, async (req, res) => {
  const { batchId } = req.params;
  const {
    b_batchname,
    location_batch,
    batch_type,
    num_sub_batches,
    size_batch,
    start_batch,
  } = req.body;
  try {
    const result = await client.query(
      "UPDATE batch_info SET batch_name=($1),location=($2),batch_type=($3), subbatch_count=($4), batch_size=($5),start_date=($6) where batch_id=($7)",
      [
        b_batchname,
        location_batch,
        batch_type,
        num_sub_batches,
        size_batch,
        start_batch,
        batchId,
      ]
    );
    if (result.rowCount > 0) {
      res.status(200).send(`Batch ${batchId} has been updated.`);
    } else {
      res.status(404).send(`Batch ${batchId} not found.`);
    }
  } catch (err) {
    next(err);
  }
});

/////////////////
//subbatch deletaion

router.delete(`${rootUrl}/del-sub/:subbatchId`, async (req, res, next) => {
  const { subbatchId } = req.params;
  try {
    const result = await client.query(
      "DELETE FROM sub_batches WHERE sub_batch_id = $1",
      [subbatchId]
    );
    res.status(200).send(`Subbatch ${subbatchId} has been deleted.`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post(`${rootUrl}/:subbatchId`, async (req, res) => {
  const { subbatchId } = req.params;
  const { subBatchName, batch, stream, size, location, start, end, adminName } =
    req.body;
  try {
    const result = await client.query(
      "UPDATE sub_batches SET sub_batch_name=($1),batch_name=($2),stream=($3), size=($4), location=($5),start_date=($6), end_date=($7), batch_admin=($8) where sub_batch_id=($9)",
      [
        subBatchName,
        batch,
        stream,
        size,
        location,
        start,
        end,
        adminName,
        subbatchId,
      ]
    );
    if (result.rowCount > 0) {
      res.status(200).send(`sub batch ${subbatchId} has been updated.`);
    } else {
      res.status(404).send(`sub batch ${subbatchId} not found.`);
    }
  } catch (err) {
    next(err);
  }
});

//get-section-details -for update
router.get(`${rootUrl}/update-section-form/:section_id`, (req, res) => {
  const id = req.query.section_id;
  let sqlQuery = "SELECT * FROM sections_info";
  if (id) {
    sqlQuery += ` WHERE id = '${id}'`;
  }
  client.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result.rows);
    }
  });
});
module.exports = router;
