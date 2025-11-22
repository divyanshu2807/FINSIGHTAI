import express from "express";
import Portfolio from "../models/Portfolio.js";
import { verifyToken } from "../middleware/auth.js";
import yahooFinance from "yahoo-finance2";

const router = express.Router();

router.get("/value", verifyToken, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) {
      return res.json({
        totalInvested: 0,
        totalValue: 0,
        totalProfitLoss: 0,
        totalProfitPercent: "0.00",
        holdings: [],
      });
    }

    const holdings = portfolio.holdings;
    const symbols = holdings.map((h) =>
      h.symbol.includes(".") ? h.symbol : `${h.symbol}.NS`
    );

    const quotes = await Promise.all(
      symbols.map((s) =>
        yahooFinance.quote(s).catch(() => ({ regularMarketPrice: h.avgPrice }))
      )
    );

    let totalInvested = 0;
    let totalValue = 0;
    const updatedHoldings = holdings.map((h, i) => {
      const currentPrice = quotes[i]?.regularMarketPrice || h.avgPrice;
      const invested = h.avgPrice * h.qty;
      const currentValue = currentPrice * h.qty;
      const profitLoss = currentValue - invested;
      const profitPercent = (profitLoss / invested) * 100;

      totalInvested += invested;
      totalValue += currentValue;

      return {
        symbol: h.symbol,
        qty: h.qty,
        avgPrice: h.avgPrice,
        currentPrice,
        currentValue,
        profitLoss,
        profitPercent,
        type: h.type,
      };
    });

    const totalProfitLoss = totalValue - totalInvested;
    const totalProfitPercent = (totalProfitLoss / totalInvested) * 100;

    res.json({
      totalInvested,
      totalValue,
      totalProfitLoss,
      totalProfitPercent,
      holdings: updatedHoldings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
