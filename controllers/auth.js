const db = require("./db");
const bcrypt = require("bcryptjs");
const url = require("url");

exports.login = async (req, res) => {
  try {
    var { email, password } = req.body;
    // console.log(email, password);
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please Enter an Email and Password",
      });
    }

    // querying the database to get right user info in order to login
    // bcrypt.compare(password, results[0].Password)
    db.query(
      "SELECT * FROM users WHERE Email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        if (!results || !results[0].Password) {
          res.status(401).render("login", {
            message: "Email or Password is incorrect",
          });
        } else {
          if (results[0].RoleID == 1) {
            res.redirect(
              url.format({
                pathname: "/admin",
                query: {
                  username: results[0].FirstName,
                },
              })
            );
          } else if (results[0].RoleID == 2) {
            res.redirect(
              url.format({
                pathname: "/user",
                query: {
                  username: results[0].FirstName,
                },
              })
            );
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.create = (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, office, birthdate, password } = req.body;
  console.log(req.body.email);

  db.query(
    "SELECT Email FROM users WHERE Email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.render("/create", {
          message: "Email already in use",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query("INSERT INTO users SET ?", { name: name });
    }
  );
};
