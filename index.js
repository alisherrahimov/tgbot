const express = require("express");
const cors = require("cors");
const bot = require("./bot");
const { webhookCallback } = require("grammy");
const { config } = require("dotenv");
config();

const app = express();
let token = "5259090349:AAHQJzbGx-_mE1dmHec1IbP8F97t2ByIdXk";
app.use(cors());
app.use("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello World",
  });
});
app.use(express.json());
app.use(`/${token}`, webhookCallback(bot, "express"));
app.listen(3001, "0.0.0.0", async () => {
  await bot.api.setWebhook(`https://47.254.250.211:443/${token}`);
  console.log(`server running 3001 in port`);
});
