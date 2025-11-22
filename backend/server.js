import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js"; // ✅ Import wallet routes
import portfolioRoutes from "./routes/portfolioRoutes.js"; // ✅ Import portfolio routes
import predictRoute from "./routes/predictRoute.js";
import portfolioValueRouter from "./routes/portfolioValue.js";


import path from "path";
import { fileURLToPath } from "url"; // ✅ Needed for ES module __dirname

dotenv.config();
connectDB();

const app = express();

// ✅ Fix for __dirname (ES modules don’t have it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS Configuration — to allow Authorization header
// ✅ CORS Configuration — to allow Authorization header
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://finsightai-wflm.vercel.app",   // ✅ Vercel frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// ✅ Middleware
app.use(express.json());

// ✅ Wallet Routes
app.use("/api/wallet", walletRoutes); // ✅ Register wallet route

// ✅ Portfolio Routes
app.use("/api/portfolio", portfolioRoutes); // ✅ Register portfolio route

app.use("/api/predict", predictRoute);


// ✅ Serve uploaded images (absolute correct path)
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ FIXED LINE

// ✅ API Routes
app.use("/api/users", userRoutes);

app.use("/api/portfolio", portfolioValueRouter);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Finsight AI Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
