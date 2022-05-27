const express = require("express");
const utils = require("../utils");
const User = require("../models/user");

const router = express.Router();

router.post("/Create", (request, response) => {
  const { fname, lname, email, mobile, gender, state } = request.body;

  // create an instance of product model
  const user = new User();
    (user.fname = fname),
    (user.lname = lname),
    (user.email = email),
    (user.mobile = mobile),
    (user.gender = gender),
    (user.state = state);

  // save the product instance to create a document inside the product collection
  user.save((error, dbResult) => {
    response.send(utils.createResult(error, dbResult));
  });
});

router.get("/all", (request, response) => {
  User.find({}, { __v: 0 }).exec((error, users) => {
    response.send(utils.createResult(error, users));
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  User.findOne({ _id: id }).exec((error, user) => {
    response.send(utils.createResult(error, user));
  });
});

router.put("/update/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  const { fname, lname, email, mobile, gender, state } = request.body;
  console.log(request.body);
  User.findOne({ _id: id }).exec((error, user) => {
    if (error) {
      response.send(utils.createError(error));
    } else if (!user) {
      response.send(utils.createError("product does not exist"));
    } else {
      console.log(user);
      (user.fname = fname),
        (user.lname = lname),
        (user.email = email),
        (user.mobile = mobile),
        (user.gender = gender),
        (user.state = state);
      user.save((error, user) => {
        response.send(utils.createResult(error, user));
      });
    }
  });
});

router.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  User.remove({ _id: id }).exec((error, dbResult) => {
    response.send(utils.createResult(error, dbResult));
  });
});

module.exports = router;
