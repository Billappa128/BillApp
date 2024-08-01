const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require('../models/Users')
const verifyToken = require("./middleJwt");
const jwt = require("jsonwebtoken");

// Đọc biến môi trường từ tệp .env (không bắt buộc, nhưng tốt để bảo mật secret key)
require('dotenv').config();

// Tạo mã hóa JWT
const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// Register 
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    })
    try {
        const savedUser = await newUser.save()
        const token = generateToken(savedUser);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Chỉ sử dụng trong môi trường HTTPS
          }).json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


// Login
router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ email : req.body.email });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
       
        // Kiểm tra số lượng phiên đăng nhập của người dùng
        const maxSessions = 8; // Số lượng phiên đăng nhập tối đa cho mỗi người dùng
        if (user.sessions.length >= maxSessions) {
            // Sắp xếp phiên đăng nhập từ cũ nhất đến mới nhất
            user.sessions.sort((a, b) => a.createdAt - b.createdAt);

            // Đá (logout) phiên đăng nhập cũ nhất
            const oldestSession = user.sessions[0];
            user.sessions.pull(oldestSession._id);
            await user.save();
        }

        // Tạo mới phiên đăng nhập và lưu vào cơ sở dữ liệu
        const newSession = {
            token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "2d",
            }),
            ipAddress: req.ip,
            userAgent: req.get("User-Agent"),
            createdAt: new Date(),
        };
        user.sessions.push(newSession);
        await user.save();
        // Tạo JWT token và trả về cho người dùng
        const token = generateToken(user)
        const { password, ...others } = user._doc
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Chỉ sử dụng trong môi trường HTTPS
          }).json({ token, ...others });
    } catch (err) {
        res.status(500).json({ message: "Error logging in.", error: err });
    }
});


// Xác thực và đăng nhập tự động bằng token
router.post("/autologin",verifyToken, async (req, res) => {
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


module.exports = router