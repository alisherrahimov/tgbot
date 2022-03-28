const { Bot } = require("grammy")
const { config } = require("dotenv")
const db = require("./db/connect")
const axios = require("axios")
const { schedule } = require("node-cron")
const user = require("./model/test")
config()
const key = "5259090349:AAHQJzbGx-_mE1dmHec1IbP8F97t2ByIdXk"
const bot = new Bot(key)

bot.command("start", (ctx) => {
    ctx.reply("Hello, I am IELTS Notifications Bot")
})
bot.on("message::bold", async (ctx) => {
    let data = ctx.message.text.split(" ")
    let nickname = data[0]
    let date = data[1].split(".")
    let group = data[2]
    const a = await user.create({ name: nickname, date: new Date(date[2], date[1] - 1, date[0]), group: group })
    a.save()
    bot.api.sendMessage(ctx.chat.id, `${nickname} Bu o'quvchi ro'yxatga olindi.`)
})

schedule("0 19 * * * * *", async () => {
    try {
        user.find({}).then(async (data) => {
            let today = new Date().getDay()
            let month = new Date().getMonth()
            let year = new Date().getFullYear()
            data.forEach((item, index) => {
                let userDay = item.date.getDay()
                let userMonth = item.date.getMonth()
                let userYear = item.date.getFullYear()
                const oneDay = 24 * 60 * 60 * 1000;
                const firstDate = new Date(year, month, today);
                const secondDate = new Date(userYear, userMonth, userDay);
                const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
                if (diffDays > 1) {
                    sendMessage(item.name, diffDays, item.group)
                }
            })
        })
    } catch (error) {
        throw error
    }
}, { timezone: "Asia/Tashkent" })

async function sendMessage(name, days, group) {
    try {
        let url = "https://api.telegram.org/bot" + process.env.key + "/sendMessage" + "?chat_id=-" + group + "&text=" + `${name} sizning IELTS topshirishinggizga ${days} kun qoldi, Tezlashamiz.!`
        await axios.get(url)
    } catch (error) {
        throw error
    }
}

bot.start()
module.exports = bot