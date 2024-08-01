const express = require("express");
const router = express.Router();
const Noti = require("../models/Noti");
const verifyToken = require("./middleJwt"); 
const isAdmin = require("./isAdmin"); 

// Create a new Info
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const newInfo = new Noti(req.body);
    const savedInfo = await newInfo.save();
    res.status(201).json(savedInfo);
  } catch (error) {
    res.status(500).json({ message: "Error creating Noti.", error: error });
  }
});

// Read all Info
router.get("/", verifyToken, async (req, res) => {
  try {
    const infoList = await Noti.find();
    res.status(200).json(infoList);
  } catch (error) {
    res.status(500).json({ message: "Error getting Noti list.", error: error });
  }
});

// Read Info by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const info = await Noti.findById(req.params.id);
    if (!info) {
      return res.status(404).json({ message: "Noti not found." });
    }
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: "Error getting Info by ID.", error: error });
  }
});

// Update Info by ID
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedInfo = await Noti.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedInfo) {
      return res.status(404).json({ message: "Info not found." });
    }
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating Info.", error: error });
  }
});

// Delete Info by ID
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedInfo = await Noti.findByIdAndDelete(req.params.id);
    if (!deletedInfo) {
      return res.status(404).json({ message: "Noti not found." });
    }
    res.status(200).json({ message: "Noti deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Noti.", error: error });
  }
});

module.exports = router;
