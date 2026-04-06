import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../utils/appError";
import { env } from "../config/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Formato inválido. Use JPEG, PNG ou WebP", 422));
    }
  },
});

export function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          transformation: [{ width: 1280, height: 1280, crop: "limit" }],
        },
        (error, result) => {
          if (error || !result)
            return reject(
              new AppError(`Falha no upload + ${error?.message}`, 500),
            );
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}

export function deleteFromCloudinary(imageUrl: string): Promise<void> {
  return new Promise((resolve) => {
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1].split(".")[0];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${filename}`;

    cloudinary.uploader.destroy(publicId, () => resolve());
  });
}

export { cloudinary };
