// isAdmin.js
const User = require("../models/Users");

const isAdmin = async (req, res, next) => {
  try {
    // Lấy thông tin người dùng từ JWT đã xác thực
    const userId = req.userId;
    const currentUser = await User.findById(userId);

    // Kiểm tra xem người dùng có quyền Admin không
    if (!currentUser.isAdmin) {
      return res.status(403).json({ message: "Access denied. Only Admin can perform this action." });
    }

    // Nếu là Admin, cho phép thực hiện chức năng tiếp theo
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking Admin status.", error: error });
  }
};

module.exports = isAdmin;
