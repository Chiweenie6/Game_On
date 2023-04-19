const db = require("../config/connection");
const { Game } = require("../models");
const gameSeeds = require("./gameSeeds.json");

db.once("open", async () => {
  try {
    await Game.deleteMany({});
    await Game.create(gameSeeds);

    console.log("🌱 Games Seeded 🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
