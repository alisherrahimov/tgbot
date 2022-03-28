const express = require("express");
const cors = require("cors");
const bot = require("./bot");
const { webhookCallback } = require("grammy");
const { config } = require("dotenv");
config()
const PORT = process.env.PORT;

const app = express()
let token = "5259090349:AAHQJzbGx-_mE1dmHec1IbP8F97t2ByIdXk"
app.use(cors())
app.use(express.json())
app.use(`/${token}`, webhookCallback(bot, "express"));
app.listen(PORT || 3001, '0.0.0.0', async () => {
    await bot.api.setWebhook(`https://tgbotenglish.herokuapp.com/${token}`);
    console.log(`server running ${PORT} in port`)
});