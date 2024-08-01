const mongoose = require("mongoose");

const NotiSchema = new mongoose.Schema(
    {
        content: { type: String, require : true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Noti", NotiSchema)