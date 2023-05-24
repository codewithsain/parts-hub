const partController = {};
const store = require("store2");
const dbConn = require("../dbConnection");

partController.listParts = (req, res) => {
  const sessionUser = store.get("sessionUser");
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT parts.id, parts.partNumber, parts.revisionDesc, parts.localTask, parts.status, parts.currentDuration, DATE_FORMAT(parts.dueDate, '%m/%d/%Y') AS dueDate, parts.termCode, parts.netWeigth, parts.grossWeigth FROM user INNER JOIN parts ON user.id = parts.userId where user = ?",
        [sessionUser],
        (error, parts) => {
          if (error) {
            reject(error);
          }

          resolve(parts);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

partController.countParts = async (req, res, next) => {
  const sessionUser = store.get("sessionUser");
  console.log(sessionUser);
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT COUNT(parts.partNumber) AS numberOfParts FROM user INNER JOIN parts ON user.id = parts.userId WHERE user = ?",
        [sessionUser],
        (error, numberOfParts) => {
          if (error) {
            reject(error);
          }
          console.log(numberOfParts[0].numberOfParts);
          resolve(numberOfParts[0].numberOfParts);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

partController.showModalAddPart = (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      return res.render("landingPage", {
        showModalAddPart: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

partController.saveParts = (req, res) => {
  const sessionUser = store.get("sessionUser");

  const {
    part,
    revDesc,
    localTask,
    status,
    taskCurrentDuration,
    dueDate,
    termCode,
    netWeight,
    grossWeight,
    user,
  } = req.body;

  store.setAll({
    user: user,
    part: part,
    revDesc: revDesc,
    localTask: localTask,
    status: status,
    taskCurrentDuration: taskCurrentDuration,
    dueDate: dueDate,
    termCode: termCode,
    netWeight: netWeight,
    grossWeight: grossWeight,
  });

  const characters = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

  try {
    dbConn.query(
      "SELECT id FROM user WHERE user = ?",
      [user],
      (error, results) => {
        if (error) {
          console.log(error);
        }

        if (results.length < 1) {
          return res.render("landingPage", {
            showModalAddPart: true,
            userNotExists: "This user doesn't exists",
            part: store.get("part"),
            revDesc: store.get("revDesc"),
            localTask: store.get("localTask"),
            status: store.get("status"),
            taskCurrentDuration: store.get("taskCurrentDuration"),
            dueDate: store.get("dueDate"),
            termCode: store.get("termCode"),
            netWeight: store.get("netWeight"),
            grossWeight: store.get("grossWeight"),
            user: store.get("user"),
          });
        }

        console.log(results[0].id);
        store.setAll({ id: results[0].id });
      }
    );
  } catch (error) {
    console.log(error);
  }

  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT partNumber FROM parts WHERE partNumber = ?",
        [part],
        (error, results) => {
          if (error) {
            console.log(error);
          }
          if (results.length > 0) {
            return res.render("landingPage", {
              showModalAddPart: true,
              partRegistered: "This part already exists",
              part: store.get("part"),
              revDesc: store.get("revDesc"),
              localTask: store.get("localTask"),
              status: store.get("status"),
              taskCurrentDuration: store.get("taskCurrentDuration"),
              dueDate: store.get("dueDate"),
              termCode: store.get("termCode"),
              netWeight: store.get("netWeight"),
              grossWeight: store.get("grossWeight"),
              user: store.get("user"),
            });
          }

          if (
            characters.test(part) ||
            characters.test(revDesc) ||
            characters.test(localTask) ||
            characters.test(status) ||
            characters.test(termCode)
          ) {
            return res.render("landingPage", {
              specialC: "Fields can't contain especial characters",
              showModalAddPart: true,
              part: store.get("part"),
              revDesc: store.get("revDesc"),
              localTask: store.get("localTask"),
              status: store.get("status"),
              taskCurrentDuration: store.get("taskCurrentDuration"),
              dueDate: store.get("dueDate"),
              termCode: store.get("termCode"),
              netWeight: store.get("netWeight"),
              grossWeight: store.get("grossWeight"),
              user: store.get("user"),
            });
          }

          dbConn.query(
            "INSERT INTO parts SET ?",
            {
              partNumber: part,
              revisionDesc: revDesc,
              localTask: localTask,
              status: status,
              currentDuration: taskCurrentDuration,
              dueDate: dueDate,
              termCode: termCode,
              netWeigth: netWeight,
              grossWeigth: grossWeight,
              userId: store.get("id"),
            },
            (error, results) => {
              if (error) {
                console.log(error);
              } else {
                store.clear();
                return res.render("landingPage", {
                  showModalAddPart: true,
                  partRegisteredMessage: "Part registered succesfully",
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

partController.deleteParts = async (req, res) => {
  const partDelete = req.body.partDelete;

  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "DELETE FROM parts WHERE id = ?",
        [partDelete],
        (error, results) => {
          if (error) {
            reject(error);
          }

          resolve(results);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

partController.updateParts = (req, res) => {
  const id = req.body.partUpdate;

  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT parts.id, parts.partNumber, parts.revisionDesc, parts.localTask, parts.status, parts.currentDuration, DATE_FORMAT(parts.dueDate, '%m/%d/%Y') AS dueDate, parts.termCode, parts.netWeigth, parts.grossWeigth, user.user FROM parts INNER JOIN user ON parts.userId = user.id where parts.id = ? ",
        [id],
        (error, parts) => {
          if (error) {
            console.log(error);
          } else {
            console.log(parts);
            return res.render("landingPage", {
              showModalUpdatePart: true,
              id: parts[0].id,
              part: parts[0].partNumber,
              revDesc: parts[0].revisionDesc,
              localTask: parts[0].localTask,
              status: parts[0].status,
              taskCurrentDuration: parts[0].currentDuration,
              dueDate: parts[0].dueDate,
              termCode: parts[0].termCode,
              netWeight: parts[0].netWeigth,
              grossWeight: parts[0].grossWeigth,
              user: parts[0].user,
            });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

partController.editParts = (req, res) => {
  const id = req.body.id;

  const {
    part,
    revDesc,
    localTask,
    status,
    taskCurrentDuration,
    dueDate,
    termCode,
    netWeight,
    grossWeight,
    user,
  } = req.body;

  const characters = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

  store.setAll({
    part: part,
    revDesc: revDesc,
    localTask: localTask,
    status: status,
    taskCurrentDuration: taskCurrentDuration,
    dueDate: dueDate,
    termCode: termCode,
    netWeight: netWeight,
    grossWeight: grossWeight,
    user: user,
  });

  try {
    if (
      characters.test(part) ||
      characters.test(revDesc) ||
      characters.test(localTask) ||
      characters.test(taskCurrentDuration) ||
      characters.test(termCode) ||
      characters.test(netWeight) ||
      characters.test(grossWeight) ||
      characters.test(user)
    ) {
      return res.render("landingPage", {
        specialC: "Fields can't contain special characters",
        showModalUpdatePart: true,
        part: store.get("part"),
        revDesc: store.get("revDesc"),
        localTask: store.get("localTask"),
        status: store.get("status"),
        taskCurrentDuration: store.get("taskCurrentDuration"),
        dueDate: store.get("dueDate"),
        termCode: store.get("termCode"),
        netWeight: store.get("netWeight"),
        grossWeight: store.get("grossWeight"),
        user: store.get("user"),
      });
    }

    dbConn.query(
      "SELECT id FROM user WHERE user = ?",
      [user],
      (error, results) => {
        if (error) {
          console.log(error);
        }
        store.setAll( {idUser: results[0].id })
        if (results.length < 1) {
          return res.render("landingPage", {
            showModalUpdatePart: true,
            userNotExists: "This user doesn't exists",
            part: store.get("part"),
            revDesc: store.get("revDesc"),
            localTask: store.get("localTask"),
            status: store.get("status"),
            taskCurrentDuration: store.get("taskCurrentDuration"),
            dueDate: store.get("dueDate"),
            termCode: store.get("termCode"),
            netWeight: store.get("netWeight"),
            grossWeight: store.get("grossWeight"),
            user: store.get("user"),
          });
        }
        
      }
    );

    const data = req.body;
    return new Promise((resolve, reject) => {
      dbConn.query(
        "UPDATE parts SET ? WHERE id = ?",
        [
          {
            partNumber: part,
            revisionDesc: revDesc,
            localTask: localTask,
            status: status,
            currentDuration: taskCurrentDuration,
            dueDate: dueDate,
            termCode: termCode,
            netWeigth: netWeight,
            grossWeigth: grossWeight,
            userId: store.get('idUser')
          },
          id,
        ],
        (error, results) => {
          if (error) {
            console.log(error);
          }
          console.log(results);
          store.clear();
          return res.render("landingPage", {
            showModalUpdatePart: true,
            partUpdated: "Part updated succesfully",
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

partController.search = async (req, res) => {
  const search = req.body.userId;
  const numberOfParts = await partController.countParts(req, res);
  const userRole = store.get("sessionRole");
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT parts.id, parts.partNumber, parts.revisionDesc, parts.localTask, parts.status, parts.currentDuration, DATE_FORMAT(parts.dueDate, '%m/%d/%Y') AS dueDate, parts.termCode, parts.netWeigth, parts.grossWeigth FROM user INNER JOIN parts ON user.id = parts.userId where user = ?  or partNumber = ? ",
        [search, search],
        async (error, parts) => {
          if (error) {
            console.log(error);
          }

          if (userRole === "admin") {
            if (parts.length < 1) {
              return res.render("landingPage", {
                noPartsAvailable: true,
                numberOfParts: 0,
                name: store.get("sessionName"),
                lastName: store.get("sessionLastName"),
                position: store.get("sessionPosition"),
                role: store.get("sessionRole"),
              });
            }

            if (parts.length > 0) {
              return res.render("landingPage", {
                parts,
                numberOfParts,
                name: store.get("sessionName"),
                lastName: store.get("sessionLastName"),
                position: store.get("sessionPosition"),
                role: store.get("sessionRole"),
              });
            }
          } else {
            if (parts.length < 1) {
              return res.render("landingPage", {
                noPartsAvailable: true,
                numberOfParts: 0,
                name: store.get("sessionName"),
                lastName: store.get("sessionLastName"),
                position: store.get("sessionPosition"),
              });
            }

            if (parts.length > 0) {
              return res.render("landingPage", {
                parts,
                numberOfParts,
                name: store.get("sessionName"),
                lastName: store.get("sessionLastName"),
                position: store.get("sessionPosition"),
              });
            }
          }
        }
      );
    });
  } catch (error) {}
};

module.exports = partController;
