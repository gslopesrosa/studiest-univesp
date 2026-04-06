import multer from "multer";
import path from "path";
import crypto from "crypto";
import { AppError } from "../utils/appError";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(10).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${hash}${ext}`);
  },
});

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Formato inválido. Use JPEG, PNG ou WebP", 422));
    }
  },
});
