const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true, expires: '3d'
    }
)

module.exports = mongoose.model("Deposit", DepositSchema)