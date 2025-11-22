import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Storage setup for unique file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// 🟢 Register User
router.post("/register", registerUser);

// 🔵 Login User
router.post("/login", loginUser);

// 🟣 Get User Profile (Protected)
router.get("/profile", protect, getUserProfile);

// 🟠 Update User Profile (Protected)
router.put("/profile", protect, updateUserProfile);

// 🟡 Upload Only (Standalone upload)
router.post("/upload", protect, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    // 🧹 Delete old avatar file
    if (req.user && req.user.avatar && !req.user.avatar.includes("/media/")) {
      const oldFileName = req.user.avatar.split('/').pop().split('?')[0];
      const oldPath = path.join(process.cwd(), 'uploads', oldFileName);
      
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) console.error("❌ Old avatar cleanup failed:", err);
          else console.log("✅ Old avatar deleted:", oldFileName);
        });
      }
    }

    // Update user's avatar in database immediately
    req.user.avatar = filePath;
    await req.user.save();

    console.log("✅ Avatar uploaded:", filePath);

    res.status(200).json({
      message: "File uploaded successfully",
      path: filePath,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;