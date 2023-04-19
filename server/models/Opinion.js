const { Schema, model } = require("mongoose");

const opinionSchema = new Schema({
  opinionText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
    trim: true,
  },
  opinionAuthor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Opinion = model("Opinion", opinionSchema);

module.exports = Opinion;
