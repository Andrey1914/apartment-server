const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
