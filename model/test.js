const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    group: { type: String, required: true }
})

const user = model("user", userSchema)

module.exports = user