import express from "express";
import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ✅ Proper __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Prediction route
router.get("/", (req, res) => {
  const ticker = req.query.ticker || "TCS.NS";

  // ✅ Full correct path to Python file (outside backend folder)
  const pythonFile = path.join(__dirname, "../../ml/predict_stock.py");

  console.log("📂 Running Python script for:", ticker);
  console.log("📁 Python file path:", pythonFile);

  // ✅ Execute Python script
  execFile("python", [pythonFile, ticker], (error, stdout, stderr) => {
    console.log("📤 Python stdout:", stdout);
    console.error("⚠️ Python stderr:", stderr);

    if (error) {
      console.error("❌ Python error:", error);
      return res.status(500).json({ error: "Prediction failed" });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      res.status(500).json({ error: "Invalid response from Python script" });
    }
  });
});


// ✅ New route: fetch last 7 days of historical prices
router.get("/history", (req, res) => {
  const ticker = req.query.ticker || "TCS.NS";

  // ✅ Correct path for history script
  const historyFile = path.join(__dirname, "../../ml/get_stock_history.py");

  console.log("📂 Fetching history for:", ticker);
  console.log("📁 Python file path:", historyFile);

  execFile("python", [historyFile, ticker], (error, stdout, stderr) => {
    console.log("📤 Python stdout:", stdout);
    console.error("⚠️ Python stderr:", stderr);

    if (error) {
      console.error("❌ Python error:", error);
      return res.status(500).json({ error: "History fetch failed" });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      res.status(500).json({ error: "Invalid response from history script" });
    }
  });
});

export default router;
