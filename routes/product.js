const router = require("express").Router()
const Product = require("../models/Products")
const User = require("../models/Users")
const verifyToken = require("./middleJwt"); 

// Đọc biến môi trường từ tệp .env (không bắt buộc, nhưng tốt để bảo mật secret key)
require('dotenv').config();

// Testttt
router.post('/test', verifyToken, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ JWT đã xác thực
        const currentUser = await User.findById(req.userId);
        if (!currentUser) {
          return res.status(401).json({ message: "Invalid token." });
        }
    
        // Thực hiện đăng nhập tự động thành công, gửi thông tin người dùng về frontend
        const { password, ...others } = currentUser._doc;
        res.json(others);
      } catch (err) {
        res.status(500).json({ message: "Error auto-login.", error: err });
      }
  });
  

// Create Bill
router.post("/", verifyToken, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ JWT đã xác thực
        const currentUser = await User.findById(req.userId);

        // Kiểm tra xem người dùng đã mua Gói Cước chưa
        if (!currentUser.isPackage.purchasedStatus) {
            // Nếu người dùng chưa mua Gói Cước, họ phải trả tiền cho Bill
            const newBill = new Product({
                info: req.body.info,
                photo: req.body.photo,
                author: req.userId,
                amount: req.body.amount,
            });
            const savedBill = await newBill.save();
            if (currentUser.balance < newBill.amount) {
                return res.status(400).json({ message: "Số dư trong tài khoản không đủ để thanh toán Bill." });
            }
            // Trừ tiền từ số dư trong tài khoản của người dùng
            currentUser.balance -= savedBill.amount;
            currentUser.products.push(savedBill); 
            await currentUser.save();

            res.status(200).json(savedBill);
        } else {
            // Kiểm tra xem Gói Cước còn hạn không (sử dụng trường "endTime")
            if (currentUser.isPackage.purchasedAt > Date.now()) {
                // Gói Cước còn hạn, tạo Bill miễn phí
                const newBill = new Product({
                    info: req.body.info,
                    photo: req.body.photo,
                    author: req.userId,
                    amount: req.body.amount,
                });

                const savedBill = await newBill.save();
                currentUser.products.push(savedBill); 
                await currentUser.save();
                res.status(200).json(savedBill);
            } else {
                // Gói Cước hết hạn, phải trả tiền cho Bill
                const newBill = new Product({
                    info: req.body.info,
                    photo: req.body.photo,
                    author: req.userId,
                    amount: req.body.amount, // Đặt giá trị cho price của Bill từ request body
                });

                const savedBill = await newBill.save();
                if (currentUser.balance < newBill.amount) {
                    return res.status(400).json({ message: "Số dư trong tài khoản không đủ để thanh toán Bill." });
                }
                // Trừ tiền từ số dư trong tài khoản của người dùng
                currentUser.balance -= savedBill.amount;
                currentUser.products.push(savedBill);
                await currentUser.save();

                res.status(200).json(savedBill);
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error creating bill.", error: err });
    }
});

// Update Bill
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        const billId = req.params.id;

        // Kiểm tra xem người dùng có quyền cập nhật Bill không
        if (currentUser.isAdmin) {
            try {
                const updatedBill = await Product.findByIdAndUpdate(
                    billId,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedBill);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Only Admin can update bills!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Bill
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        const billId = req.params.id;

        // Kiểm tra xem người dùng có quyền xóa Bill không
        if (currentUser.isAdmin) {
            try {
                await Product.findByIdAndDelete(billId);
                res.status(200).json("Bill has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Only Admin can delete bills!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get bill
router.get("/",verifyToken, async (req, res) => {
    try {
        const bill = await Product.find().populate('author')
        res.status(200).json(bill)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get bill with ID
router.get("/:id",verifyToken, async (req, res) => {
    try {
        const bill = await Product.findById(req.params.id).populate('author')
        res.status(200).json(bill)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Bills Time Line User
router.get("/timeline/:userId",verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userBills = await Product.find({ author: currentUser.username })
        res.status(200).json(userBills)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router