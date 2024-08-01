const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true }, // Tháng or Năm
    price: { type: Number, required: true },
    endTime: { type: Date },
    desc: { type: Array },
}, { timestamps: true });

module.exports = mongoose.model("Package", PackageSchema);
