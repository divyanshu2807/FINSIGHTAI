import express from "express";
import Wallet from "../models/Wallet.js";
import { verifyToken } from "../middleware/auth.js"; // JWT middleware

const router = express.Router();

// ✅ Get user wallet (auto-create if missing)
router.get("/", verifyToken, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user.id });

    // 🔹 Auto-create wallet if not found
    if (!wallet) {
      wallet = new Wallet({ userId: req.user.id, balance: 50000 });
      await wallet.save();
    }

    res.json(wallet);
  } catch (err) {
    console.error("Error loading wallet:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Deposit / Withdraw money
router.post("/transaction", verifyToken, async (req, res) => {
  try {
    const { type, amount } = req.body;
    let wallet = await Wallet.findOne({ userId: req.user.id });

    if (!wallet) {
      wallet = new Wallet({ userId: req.user.id, balance: 50000 });
    }

    if (type === "Deposit") wallet.balance += amount;
    else if (type === "Withdraw") {
      if (wallet.balance < amount)
        return res.status(400).json({ message: "Insufficient balance" });
      wallet.balance -= amount;
    }

    wallet.transactions.push({ type, amount });
    await wallet.save();

    res.json(wallet);
  } catch (err) {
    console.error("Transaction error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
