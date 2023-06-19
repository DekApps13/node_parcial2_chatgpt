const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user: String,
    salt: String,
    password: String,
    name: String,
    date_create: Date
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel
