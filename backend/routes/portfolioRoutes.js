import express from "express";
import Portfolio from "../models/Portfolio.js";
import Wallet from "../models/Wallet.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ GET user portfolio
router.get("/", verifyToken, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) return res.json({ holdings: [] });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ BUY stock
router.post("/buy", verifyToken, async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    const cost = qty * price;

    let wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet || wallet.balance < cost)
      return res.status(400).json({ message: "Insufficient balance" });

    // Deduct from wallet
    wallet.balance -= cost;
    wallet.transactions.push({ type: "Withdraw", amount: cost });
    await wallet.save();

    // Update portfolio
    let portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) portfolio = new Portfolio({ userId: req.user.id, holdings: [] });

    const existing = portfolio.holdings.find(h => h.symbol === symbol);
    if (existing) {
      const totalValue = existing.avgPrice * existing.qty + price * qty;
      existing.qty += qty;
      existing.avgPrice = totalValue / existing.qty;
    } else {
      portfolio.holdings.push({ symbol, qty, avgPrice: price });
    }

    await portfolio.save();
    res.json({ message: "Stock purchased successfully", portfolio, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ SELL stock
router.post("/sell", verifyToken, async (req, res) => {
  try {
    const { symbol, qty, price } = req.body;
    const income = qty * price;

    let portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) return res.status(400).json({ message: "No portfolio found" });

    const holding = portfolio.holdings.find(h => h.symbol === symbol);
    if (!holding || holding.qty < qty)
      return res.status(400).json({ message: "Not enough quantity to sell" });

    // Update holdings
    holding.qty -= qty;
    if (holding.qty === 0)
      portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== symbol);
    await portfolio.save();

    // Add money to wallet
    let wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) wallet = new Wallet({ userId: req.user.id });
    wallet.balance += income;
    wallet.transactions.push({ type: "Deposit", amount: income });
    await wallet.save();

    res.json({ message: "Stock sold successfully", portfolio, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET portfolio value with live prices
router.get("/value", verifyToken, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    let totalInvested = 0;
    let totalValue = 0;
    const holdingsData = [];

    for (const h of portfolio.holdings) {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${h.symbol}.NS`
      );
      const data = await response.json();

      const currentPrice =
        data?.chart?.result?.[0]?.meta?.regularMarketPrice ||
        data?.chart?.result?.[0]?.meta?.previousClose ||
        h.avgPrice;

      const invested = h.qty * h.avgPrice;
      const currentVal = h.qty * currentPrice;
      const profitLoss = currentVal - invested;
      const profitPercent = ((profitLoss / invested) * 100).toFixed(2);

      totalInvested += invested;
      totalValue += currentVal;

      holdingsData.push({
        symbol: h.symbol,
        qty: h.qty,
        avgPrice: h.avgPrice,
        currentPrice,
        invested,
        currentValue: currentVal,
        profitLoss,
        profitPercent,
        type: h.type || "Stock",
      });
    }

    const totalProfitLoss = totalValue - totalInvested;
    const totalProfitPercent = ((totalProfitLoss / totalInvested) * 100).toFixed(2);

    res.json({
      totalInvested,
      totalValue,
      totalProfitLoss,
      totalProfitPercent,
      holdings: holdingsData,
    });
  } catch (err) {
    console.error("Portfolio value error:", err);
    res.status(500).json({ message: "Error calculating portfolio value" });
  }
});


export default router;
