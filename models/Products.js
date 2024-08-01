const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    photo : {type : String},
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, default : "50" },
}, {timestamps : true, expires: '3d'})

module.exports = mongoose.model("Product", ProductSchema)