const router = require("express").Router();
const Package = require("../models/Package");
const User = require("../models/Users");
const verifyToken = require("./middleJwt"); 

// Đọc biến môi trường từ tệp .env (không bắt buộc, nhưng tốt để bảo mật secret key)
require('dotenv').config();


// API endpoint cho chức năng tạo Gói Cước (chỉ Admin mới có quyền)
router.post("/", verifyToken, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ JWT đã xác thực
        const userId = req.userId;
        const currentUser = await User.findById(userId);

        // Kiểm tra xem người dùng có quyền Admin không
        if (!currentUser.isAdmin) {
            return res.status(403).json({ message: "Access denied. Only Admin can create packages." });
        }

        // Lấy thông tin Gói Cước từ request body
        const { name, duration, price, desc } = req.body;

        // Tạo mới Gói Cước và lưu vào cơ sở dữ liệu
        const newPackage = new Package({
            name,
            duration,
            price,
            desc,
        });

        const savedPackage = await newPackage.save();

        res.status(200).json(savedPackage);
    } catch (err) {
        res.status(500).json({ message: "Error creating package.", error: err });
    }
});

router.post("/buy", verifyToken, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ JWT đã xác thực
        const userId = req.userId;
        const currentUser = await User.findById(userId);

        // Lấy thông tin Gói Cước từ request body (ở đây, giả sử truyền theo ID)
        const packageId = req.body.packageId;

        // Lấy thông tin Gói Cước từ cơ sở dữ liệu
        const package = await Package.findById(packageId);
        if (!package) {
            return res.status(404).json({ message: "Package not found." });
        }

        // Kiểm tra số dư trong tài khoản của người dùng
        if (currentUser.balance < package.price) {
            return res.status(400).json({ message: "Ko có tiền mà đòi mua hả cưng" });
        }

        // Cập nhật thông tin người dùng để cho biết họ đã mua gói cước và cập nhật số dư trong tài khoản
        currentUser.isPackage.purchasedStatus = true;
        currentUser.balance -= package.price;

        // Tính toán và đặt giá trị cho trường "endTime"
        const currentDate = new Date();
        let packageDuration;
        if (package.duration === "1 tháng") {
            packageDuration = 30 * 24 * 60 * 60 * 1000; // 30 ngày
        } else if (package.duration === "3 tháng") {
            packageDuration = 120 * 24 * 60 * 60 * 1000; // 365 ngày
        }else if (package.duration === "6 tháng") {
            packageDuration = 182 * 24 * 60 * 60 * 1000; // 365 ngày
        } else {
            return res.status(400).json({ message: "Invalid package duration." });
        }
        const endTime = new Date(currentDate.getTime() + packageDuration);
        currentUser.isPackage.purchasedAt = endTime;

        await currentUser.save();

        res.status(200).json({ message: "Mua gói thành công" });
    } catch (err) {
        res.status(500).json({ message: "Error purchasing package.", error: err });
    }
});



// Read all Package
router.get("/", async (req, res) => {
    try {
      const packageList = await Package.find();
      res.status(200).json(packageList);
    } catch (error) {
      res.status(500).json({ message: "Error getting Package list.", error: error });
    }
  });
  
  // Read Package by ID
  router.get("/:id", async (req, res) => {
    try {
      const package = await Package.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: "Package not found." });
      }
      res.status(200).json(package);
    } catch (error) {
      res.status(500).json({ message: "Error getting Package by ID.", error: error });
    }
  });

module.exports = router;
