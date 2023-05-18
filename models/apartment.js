const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  title: String,
  description: String,
  rating: Number,
  price: Number,
  locationId: String,
  ownerId: String,
});

module.exports = mongoose.model("Apartment", apartmentSchema);
