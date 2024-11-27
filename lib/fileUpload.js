import fs from "fs";
import path from "path";

export async function saveFile(file) {
  // Early return if no file
  if (!file || !file.originalFilename) {
    return "";
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = file.originalFilename.replace(/\s+/g, "-").toLowerCase();
  const finalFilename = `${
    path.parse(filename).name
  }-${uniqueSuffix}${path.extname(filename)}`;

  const filepath = path.join(uploadDir, finalFilename);

  // Copy the temporary file to the destination
  return new Promise((resolve, reject) => {
    fs.copyFile(file.filepath, filepath, (err) => {
      if (err) {
        console.error("Error copying file:", err);
        reject(err);
        return;
      }

      // Clean up the temporary file
      fs.unlink(file.filepath, (unlinkErr) => {
        if (unlinkErr) {
          console.warn("Failed to clean up temporary file:", unlinkErr);
        }
      });

      resolve(`/uploads/${finalFilename}`);
    });
  });
}
