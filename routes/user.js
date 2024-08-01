const router = require("express").Router()
const User = require("../models/Users")
const bcrypt = require("bcrypt")
const verifyToken = require("./middleJwt");
const isAdmin = require("./isAdmin");

// Update User
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json("Account has been updated")
    } catch (err) {
        return res.status(500).json(err)
    }
})

// Delete User
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Account has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json({ ...others })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All User
router.get("/", verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find().populate('products');
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User From Name
router.get("/name/:username", verifyToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router