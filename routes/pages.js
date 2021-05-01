const router = require("express").Router();
const db = require("../controllers/db");
const url = require("url");

router.get("/", (req, res) => {
  res.render("index");
});

// user login route
router.get("/login", (req, res) => {
  res.render("login");
});

// create new user route
router.get("/create", (req, res) => {
  res.render("add-user");
});

// admin route
router.get("/admin", (req, res) => {
  // res.render("admin");

  // querying the database to return fields which match the specified

  db.query(
    "SELECT users.ID AS UserID,users.RoleID AS UserRoleID,users.Email AS UserEmail, users.FirstName AS UserFirstName,users.LastName AS UserLastName ,users.OfficeID AS UserOfficeID,users.Birthdate AS UserBirthdate, users.Active AS UserActive,roles.ID AS RoleID , roles.Title AS RoleTitle , offices.ID AS OfficeID,offices.Title AS OfficeTitle from users,offices,roles WHERE users.OfficeID = offices.ID AND users.RoleID = roles.ID ",
    (err, rows) => {
      if (!err) {
        res.render("admin", { users: rows });
      } else {
        console.log(err);
      }
    }
  );
});

// user route
router.get("/user", (req, res) => {
  var username = req.query.username;
  res.render("user", { username: username });
});

module.exports = router;
