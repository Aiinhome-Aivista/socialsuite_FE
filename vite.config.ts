import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Automatically copy the generated human hand mockup image to src/human_hand_phone.png on dev server start/reload
try {
  const srcPath = "C:\\Users\\dutta\\.gemini\\antigravity-ide\\brain\\e339d5a3-07f3-46d9-a3f3-06d8163e8948\\female_hand_phone_1782903544352.png";
  const destPath = path.resolve(__dirname, "src/human_hand_phone.png");
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log("Successfully copied human hand mockup image to project source folder!");
  }
} catch (err) {
  console.error("Failed to copy human hand image:", err);
}

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: { port: 3000 },
});
