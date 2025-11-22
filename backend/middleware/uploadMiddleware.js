import multer from "multer";
import path from "path";
import fs from "fs";

// File Storage Configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Create a unique file name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;

    // 🧹 Optional cleanup: remove old avatar if exists
    if (req.user && req.user.avatar) {
      const oldPath = path.join(process.cwd(), req.user.avatar.replace("/", path.sep));
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
          console.log("🧹 Old avatar deleted:", oldPath);
        } catch (err) {
          console.error("Failed to delete old avatar:", err);
        }
      }
    }

    cb(null, fileName);
  },
});

// Only allow image files
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb("Images only!");
}

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
