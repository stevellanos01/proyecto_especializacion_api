const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  session: [
    {
      id: {
        type: Number,
      },
      date: {
        type: String,
      },
      score: {
        type: Number,
      },
      duration: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
