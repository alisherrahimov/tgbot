const express = require("express");
const cors = require("cors");
const { bot } = require("./server")
const app = express()
let token = "5259090349:AAHQJzbGx-_mE1dmHec1IbP8F97t2ByIdXk"
app.use(cors())
app.use(express.json())
app.use(`/${token}`, webhookCallback(bot, "express"));
app.listen(3333, async () => {
    // Make sure it is `https` not `http`!
    await bot.api.setWebhook(`https://https://tgbotenglish.herokuapp.com/${token}`);
});