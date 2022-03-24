import { Bot } from "grammy"
import { config } from "dotenv"
import { connectDB } from "./db/connect"
import axios from "axios";
import { schedule } from "node-cron"
import { user } from "./model/test";
config()
const key = process.env.key
const bot = new Bot(key);

bot.command("start", (ctx) => {
    ctx.reply("Hello, I am a bot")
})
bot.on("message::bold", async (ctx) => {
    let data = ctx.message.text.split(" ")
    let nickname = data[0]
    let date = data[1].split(".")
    const a = await user.create({ name: nickname, date: new Date(date[2], date[1] - 1, date[0]) })
    a.save()
    bot.api.sendMessage(ctx.chat.id, `${nickname} Bu o'quvchi ro'yxatga olindi.`)
})






//code run every day at 06:00
schedule("0 18 * * * * *", async () => {
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
                sendMessage(item.name, diffDays)
            }
        })
    })
})

async function sendMessage(name, days) {
    let url = "https://api.telegram.org/bot" + process.env.key + "/sendMessage" + "?chat_id=" + -631367981 + "&text=" + `${name} sizning IELTS topshirishingizga ${days} qoldi.!`
    await axios.get(url)
}




bot.start()