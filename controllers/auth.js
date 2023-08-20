const dbConn = require("../dbConnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const util = require("util");
const store = require("store2");

exports.register = (req, res) => {
  const { user, name, lastName, position, email, password, passwordConfirm } =
    req.body;



  store.setAll({
    userR: user,
    nameR: name,
    lastNameR: lastName,
    positionR: position,
    emailR: email,
    passwordR: password,
    passwordConfirmR: passwordConfirm,
  });

  dbConn.query(
    "SELECT email, user FROM user WHERE email = ? OR user = ? ",
    [email, user],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (user.length != 7) {
        return res.render("register", {
          userLength: "User length should be 7 characters",
          userLSR: store.get("userR"),
          nameLSR: store.get("nameR"),
          lastNameLSR: store.get("lastNameR"),
          positionLSR: store.get("positionR"),
          emailLSR: store.get("emailR"),
          passwordLSR: store.get("passwordR"),
          passwordConfirmLSR: store.get("passwordConfirmR"),
        });
      }

      if (
        characters.test(user) ||
        characters.test(name) ||
        characters.test(lastName) ||
        characters.test(position)
      ) {
        return res.render("register", {
          specialC:
            "User, name, last name or position cannot contain special characters",
          showModalUser: true,
          userLSR: store.get("userR"),
          nameLSR: store.get("nameR"),
          lastNameLSR: store.get("lastNameR"),
          positionLSR: store.get("positionR"),
          emailLSR: store.get("emailR"),
          passwordLSR: store.get("passwordR"),
          passwordConfirmLSR: store.get("passwordConfirmR"),
        });
      }

      if (results.length > 0) {
        return res.render("register", {
          emailMessage: "That email or user has been taken",
          userLSR: store.get("userR"),
          nameLSR: store.get("nameR"),
          lastNameLSR: store.get("lastNameR"),
          positionLSR: store.get("positionR"),
          emailLSR: store.get("emailR"),
          passwordLSR: store.get("passwordR"),
          passwordConfirmLSR: store.get("passwordConfirmR"),
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          passwordMessage: "Passwords do not match",
          userLSR: store.get("userR"),
          nameLSR: store.get("nameR"),
          lastNameLSR: store.get("lastNameR"),
          positionLSR: store.get("positionR"),
          emailLSR: store.get("emailR"),
          passwordLSR: store.get("passwordR"),
          passwordConfirmLSR: store.get("passwordConfirmR"),
        });
      } else if (qM.test(password)) {
        return res.render("register", {
          qMMessage: "Passwords can't contain quotation mark",
          userLSR: store.get("userR"),
          nameLSR: store.get("nameR"),
          lastNameLSR: store.get("lastNameR"),
          positionLSR: store.get("positionR"),
          emailLSR: store.get("emailR"),
          passwordLSR: store.get("passwordR"),
          passwordConfirmLSR: store.get("passwordConfirmR"),
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);

      dbConn.query(
        "INSERT INTO user SET ?",
        {
          user: user,
          name: name,
          lastName: lastName,
          position: position,
          role: "user",
          email: email,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            store.clear();
            return res.render("register", {
              userRegisteredMessage: "User registered succesfully",
            });
          }
        }
      );
    }
  );
};


exports.logIn =  (req, res) => {

  try {
    const { email, password, captchaInput, captchaText } = req.body;
  
    const qM = /["']/;

    if (!email || !password) {
      return res.status(400).render("index", {
        errorMessage: true,
        noCredMessage: "Please provide an email and password",
      });
    }

    if (qM.test(password)) {
      return res.render("index", {
        errorMessage: true,
        qMMessage: "Passwords can't contain quotation mark",
      });
    }

    if (captchaInput != captchaText) {
      return res.render('index', {
        errorMessage: true,
        captchaInvalid: 'Captcha is invalid. Try again'
      });
    }

    dbConn.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (error, results) => {
       
        
        try {
          if(results.length < 1 ){
            return res.render('index', {
              errorMessage: true,
              userNotRegistered: 'User is not registered'
            });
          } else if (
            !(await bcrypt.compare(password, results[0].password))
          ) {
            return res.render('index',{
              errorMessage: true,
              incorrectPassword: 'Password is not correct'
            })
          } else {
            const id = results[0].id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });

            const cookieOptions = {
              expires: new Date(
                Date.now() + process.env.JWT_COOKIE_IN * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };

            res.cookie("jwt", token, cookieOptions);
            res.status(200).redirect("/landingPage");
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.isLoggedIn = async (req, res, next) => {

  if (req.cookies.jwt) {
    try {
      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );


      dbConn.query(
        "SELECT * FROM user WHERE id = ?",
        [decoded.id],
        (error, results) => {
          console.log(results);
          if (!results) {

            return res.status(401).redirect("/");
          }

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("loggedIn", true, cookieOptions);

          next();

        }
      );
    } catch (error) {
      return next();
    }
  } else {
    res.status(400).redirect("/");
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("loggedIn");
  res.status(200).redirect("/");
};
