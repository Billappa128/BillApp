const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// Middleware kiểm tra JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Kiểm tra xem decoded._id có tồn tại trong mảng sessions của người dùng hay không
        const user = await User.findById(decoded._id);
        if (!user || !user.sessions.some(session => session.token === token)) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        req.userId = decoded._id;
        next();
    });
};

module.exports = verifyToken;