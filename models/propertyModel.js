const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyName: { type: String, required: true },
  propertyType: { type: String, required: true },
  bedRooms: { type: String, required: true },
  bathRooms: { type: String, required: true },
  amount: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  squarefeet: { type: String, required: true },
  additional: { type: String, required: true },
  propertyImage1: { type: String, required: true },
  propertyImage2: { type: String, required: true },
  propertyImage3: { type: String, required: true },
  propertyImage4: { type: String, required: true },
  propertyImage5: { type: String, required: true },
  userId: { type: String, required: true },
  sold: { type: Boolean, required: true,default:false },
  buyerId:{ type: String}

});
const property = new mongoose.model("property", propertySchema);
module.exports = property;
