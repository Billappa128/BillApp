const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");
const User = require("../models/Users");
const verifyToken = require("./middleJwt");
const isAdmin = require("./isAdmin");

// Endpoint để tạo đơn nạp tiền
router.post("/",verifyToken ,async (req, res) => {
    try {
        // Tạo đơn nạp tiền mới
        const newDeposit = new Deposit({
            user: req.userId,
            amount: req.body.amount,
            desc: req.body.desc,
        });

        await newDeposit.save();
        res.status(201).json({ message: "Đơn nạp tiền đã được tạo thành công.", data: newDeposit });
    } catch (err) {
        res.status(500).json({ message: "Đã có lỗi xảy ra.", error: err });
    }
});

router.get("/",verifyToken, isAdmin ,async (req, res) => {
    try {
        const deposit = await Deposit.find().populate('user');
        res.status(201).json(deposit);
    } catch (err) {
        res.status(500).json({ message: "Đã có lỗi xảy ra.", error: err });
    }
});

// Endpoint để xác nhận đơn nạp tiền
router.put("/confirm/:depositId", verifyToken, isAdmin, async (req, res) => {
    try {
        const { depositId } = req.params;

        // Tìm đơn nạp tiền dựa vào depositId
        const deposit = await Deposit.findById(depositId);

        // Kiểm tra nếu đơn nạp tiền đã được xác nhận hoặc từ chối trước đó
        if (deposit.status === "confirmed" || deposit.status === "rejected") {
            return res.status(400).json({ message: "Đơn nạp tiền đã được xử lý trước đó." });
        }

        // Xác nhận đơn nạp tiền và cập nhật trạng thái thành "confirmed"
        deposit.status = "confirmed";
        await deposit.save();

        // Cập nhật số dư của người dùng
        const user = await User.findById(deposit.user);
        if (user) {
            user.balance += deposit.amount;
            user.totalDeposit += deposit.amount; // Cộng dồn số tiền đã nạp vào trường totalDeposit của User
            await user.save();
        }
        await user.save();

        res.status(200).json({ message: "Đơn nạp tiền đã được xác nhận thành công." });
    } catch (err) {
        res.status(500).json({ message: "Đã có lỗi xảy ra.", error: err });
    }
});

// Endpoint để từ chối đơn nạp tiền
router.put("/reject/:depositId",verifyToken, isAdmin, async (req, res) => {
    try {
        const { depositId } = req.params;

        // Tìm đơn nạp tiền dựa vào depositId
        const deposit = await Deposit.findById(depositId);

        // Kiểm tra nếu đơn nạp tiền đã được xác nhận hoặc từ chối trước đó
        if (deposit.status === "confirmed" || deposit.status === "rejected") {
            return res.status(400).json({ message: "Đơn nạp tiền đã được xử lý trước đó." });
        }

        // Từ chối đơn nạp tiền và cập nhật trạng thái thành "rejected"
        deposit.status = "rejected";
        await deposit.save();

        res.status(200).json({ message: "Đơn nạp tiền đã bị từ chối." });
    } catch (err) {
        res.status(500).json({ message: "Đã có lỗi xảy ra.", error: err });
    }
});

module.exports = router;
