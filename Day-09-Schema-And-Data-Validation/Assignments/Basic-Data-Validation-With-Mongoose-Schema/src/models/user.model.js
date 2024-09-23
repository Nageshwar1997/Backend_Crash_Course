const { model } = require("mongoose");
const UserSchema = require("../schemas/user.schema");

const UserModel = model("User", UserSchema);

module.exports = UserModel;