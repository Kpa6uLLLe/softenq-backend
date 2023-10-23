const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

validateCredentials = (req, res, next) => {
  reUsername = "^[a-zA-Z][a-zA-Z0-9-_\\.]{3,64}$";
  reEmail = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
  rePassword = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
  if (!req.body.username.match(reUsername)){
    res.status(400).send({
      message: "Failed! Invalid username"
    });
    return;
  }
  if (!req.body.email.match(reEmail)){
    res.status(400).send({
      message: "Failed! Invalid email"
    });
    return;
  }
  if (!req.body.password.match(rePassword)){
    res.status(400).send({
      message: "Failed! Invalid password"
    });
    return;
  }
  next();
};

checkDuplicateUsernameOrEmail = (req, res, next) => {



  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  validateCredentials: validateCredentials,
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
