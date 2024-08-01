const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema(
    {
        title: { type: String, default : "Chuyển khoản NH" },
        desc : { type: String , 
            default : "Thời gian nhanh chóng (1-5p)"},
        icon : { type : String, default : "banking.png"},
        detail: {
            img : {type : String, required: true},
            name: { type : String, required: true }, 
            stk: { type : String, required: true },
            author: { type : String, required: true },
          },
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Info", InfoSchema)