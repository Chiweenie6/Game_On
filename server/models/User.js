const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const gameSchema = require("./Game");

const userSchema = new Schema({
  userame: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  savedGames: [gameSchema],
  opinions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Opinion",
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("gameCount").get(function () {
  return this.savedGames.length;
});

const User = model("User", userSchema);

module.exports = User;
