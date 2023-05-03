const controller = {};
const dbConn = require("../dbConnection");
const bcrypt = require("bcryptjs");
const store = require("store2");

controller.listUsers = (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT id, user, name, lastName, position, role, email FROM user",
        (error, users) => {
          if (error) {
            reject(error);
          }

          resolve(users);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

controller.saveUsers = async (req, res, next) => {
  const {
    user,
    name,
    lastName,
    position,
    role,
    email,
    password,
    passwordConfirm,
  } = req.body;

  const characters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  store.setAll({
    user: user,
    name: name,
    lastName: lastName,
    position: position,
    role: role,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT email, user FROM user WHERE email= ? OR user=?",
        [email, user],
        async (error, results) => {
          if (error) {
            console.log(error);
          }

          if (user.length != 7) {
            return res.render("admin", {
              showModalUser: true,
              userLength: "User length should be 7 characters",
              userLS: store.get("user"),
              nameLS: store.get("name"),
              lastNameLS: store.get("lastName"),
              positionLS: store.get("position"),
              roleLS: store.get("role"),
              emailLS: store.get("email"),
              passwordLS: store.get("password"),
              passwordConfirmLS: store.get("passwordConfirm"),
            });
          }

          if (
            characters.test(user) ||
            characters.test(name) ||
            characters.test(lastName) ||
            characters.test(position)
          ) {
            return res.render("admin", {
              specialC:
                "User, name, last name or position cannot contain special characters",
              showModalUser: true,
              userLS: store.get("user"),
              nameLS: store.get("name"),
              lastNameLS: store.get("lastName"),
              positionLS: store.get("position"),
              roleLS: store.get("role"),
              emailLS: store.get("email"),
              passwordLS: store.get("password"),
              passwordConfirmLS: store.get("passwordConfirm"),
            });
          }

          if (results.length > 0) {
            return res.render("admin", {
              showModalUser: true,
              emailMessage: "The email or user has been taken",
              userLS: store.get("user"),
              nameLS: store.get("name"),
              lastNameLS: store.get("lastName"),
              positionLS: store.get("position"),
              roleLS: store.get("role"),
              emailLS: store.get("email"),
              passwordLS: store.get("password"),
              passwordConfirmLS: store.get("passwordConfirm"),
            });
          } else if (password !== passwordConfirm) {
            return res.render("admin", {
              showModalUser: true,
              passwordMessage: "Passwords do not match",
              userLS: store.get("user"),
              nameLS: store.get("name"),
              lastNameLS: store.get("lastName"),
              positionLS: store.get("position"),
              roleLS: store.get("role"),
              emailLS: store.get("email"),
              passwordLS: store.get("password"),
              passwordConfirmLS: store.get("passwordConfirm"),
            });
          } else if (password.length < 12) {
            return res.render("admin", {
              showModalUser: true,
              passwordMessage:
                "Password must  be at least 12 characters minimum",
              userLS: store.get("user"),
              nameLS: store.get("name"),
              lastNameLS: store.get("lastName"),
              positionLS: store.get("position"),
              roleLS: store.get("role"),
              emailLS: store.get("email"),
              passwordLS: store.get("password"),
              passwordConfirmLS: store.get("passwordConfirm"),
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
              role: role,
              email: email,
              password: hashedPassword,
            },
            (error, results) => {
              if (error) {
                console.log(error);
              } else {
                store.clear();
                return res.render("admin", {
                  showModalUser: true,
                  userRegisteredMessage: "User registered succesfully",
                });
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

controller.deleteUsers = (req, res) => {
  const userDelete = req.body.userDelete;
  try {
    if (userDelete === "SGM1993") {
      return res.render("admin");
    }
  } catch (error) {
    console.log(error);
  }
  
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "DELETE FROM user WHERE user = ?",
        [userDelete],
        (error, users) => {
          if (error) {
            reject(error);
          }

          resolve(users);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

controller.updateUsers = (req, res) => {
  
  const userUpdate = req.body.userUpdate;

  try {
    return new Promise((resolve, reject) => {
        dbConn.query("SELECT id, user, name, lastName, position, role, email FROM user WHERE id = ?", [userUpdate],
        (error, user)  => {
            if(error){
              console.log(error)
            }else{
              return res.render('admin', {
                showModalUpdateUser: true,
                idLS: user[0].id,
                userLS: user[0].user,
                nameLS: user[0].name,
                lastNameLS: user[0].lastName,
                positionLS: user[0].position,
                roleLS: user[0].role,
                emailLS: user[0].email
              })
            }
        })
    })
  }catch(error){
    console.log(error)
  }
}

controller.editUsers = async (req, res)  =>{

  const id = req.body.id;
  const {
    name,
    lastName,
    position,
    role} = req.body;
  const characters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  store.setAll({
    name: name,
    lastName: lastName,
    position: position,
    role: role,
  });

  try {
    return new Promise((resolve, reject) => {

      if (
        characters.test(name) ||
        characters.test(lastName) ||
        characters.test(position)
      ) {
        return res.render("admin", {
          specialC:
            "User, name, last name or position cannot contain special characters",
          showModalUpdateUser: true,
          nameLS: store.get("name"),
          lastNameLS: store.get("lastName"),
          positionLS: store.get("position"),
          roleLS: store.get("role")
        });
      }

      const data = req.body;
      
      dbConn.query("UPDATE user SET ? WHERE id = ?", [data, id], (error, results) =>{
        if(error){
          console.log(error)
        }
        
        console.log(results)
        store.clear();
        res.redirect("/admin");
      })
    })
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = controller;
