const { model, Schema } = require("mongoose");

const userScehem = new Schemea({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("User", userScehem);
