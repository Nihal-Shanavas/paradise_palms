const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  feedbacks: { type: String, required: true },
});

const feedback = new mongoose.model("feedback", feedbackSchema);
module.exports = feedback;
