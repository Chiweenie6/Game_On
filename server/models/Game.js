const { Schema } = require("mongoose");

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  genre: [
    {
      type: String,
    },
  ],
  release: {
    type: String,
  },
  players: {
    type: String,
  },
  platform: [
    {
      type: String,
    },
  ],
  publisher: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = gameSchema;