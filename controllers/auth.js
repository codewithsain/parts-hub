const dbConn = require("../dbConnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const util = require("util");
const store = require("store2");

exports.register = (req, res) => {
  const { user, name, lastName, position, email, password, passwordConfirm } =
    req.body;

  const qM = /["']/;
  const characters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

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

exports.createCaptcha = (req, res, next) => {
  chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";
  captcha = chars[Math.floor(Math.random() * chars.length)];
  for (var i = 0; i < 6; i++) {
    captcha = captcha + chars[Math.floor(Math.random() * chars.length)];
  }

  res.render("index", {
    mCaptcha: captcha,
  });



  // console.log(captcha);

  next();

 
};

exports.index = async (req, res) => {
  try {
    const { email, password, captchaInput, captchaText } = req.body;
    const qM = /["']/;

    if (!email || !password) {
      return res.status(400).render("index", {
        noCredMessage: "Please provide an email and password",
      });
    }

    if (qM.test(password)) {
      return res.render("index", {
        qMMessage: "Passwords can't contain quotation mark",
      });
    }

    if (captchaInput != captchaText) {
      return res.status(400).render("index", {
        invalidCaptcha: "Captcha Is invalid",
        mCaptcha: captcha
      });
    }

    dbConn.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (error, results) => {
        // console.log(email)
        // console.log(results)
        
        try {
          if(results.length < 1 ){
            return res.status(401).render("index", {
              wrongCredMessage: "Email or password is incorrect",
              mCaptcha: captcha
            });
          } else if (
            !(await bcrypt.compare(password, results[0].password))
          ) {
            res.status(401).render("index", {
              wrongCredMessage: "Email or password is incorrect",
              mCaptcha: captcha
            });
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

      // console.log(decoded);

      dbConn.query(
        "SELECT * FROM user WHERE id = ?",
        [decoded.id],
        (error, results) => {
          console.log(results);
          if (!results) {
            return next();
          }

          req.user = results[0];

          store.setAll({ 
            sessionUser: results[0].user,
            sessionName: results[0].name,
            sessionLastName: results[0].lastName,
            sessionPosition: results[0].position,
            sessionRole: results[0].role
          });

          return next();
        }
      );
    } catch (error) {
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now) * 2 * 1000,
    httpOnly: true,
  });

  res.status(200).redirect("/");
};
