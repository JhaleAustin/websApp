const multer = require("multer");
const path = require("path");

module.exports = multer({
    limits: { fileSize: 1024 * 1024 * 1024 }, // Set your desired maximum file size (e.g., 1 GB)
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".mp4" && ext !== ".mov") {
            cb(new Error("Unsupported file type!"), false);
            return;
        }
        cb(null, true);
    },
});
