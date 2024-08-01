const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    token: { type: String},
    ipAddress: { type: String},
    userAgent: { type: String},
    createdAt: { type: Date, default: Date.now },
  });

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email : { type: String , required: true, unique: true},
        password : { type : String, required: true},
        balance : { type : Number, default: 0 },
        totalDeposit : { type : Number, default: 0 },
        avatar : {type : String, default: ""},
        coverAvatar : {type : String, default: ""},
        sessions: [SessionSchema],
        isAdmin : {type : Boolean, default : false},
        isPackage: {
            // Trường isPackage bây giờ là một object với hai key: "purchasedAt" và "purchasedStatus"
            purchasedAt: { type: Date, default: Date.now }, // Lưu thời gian mua gói cước (null nếu chưa mua)
            purchasedStatus: { type: Boolean, default: false }, // Lưu trạng thái đã mua (true nếu đã mua, false nếu chưa mua)
          },
          products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("User", UserSchema)