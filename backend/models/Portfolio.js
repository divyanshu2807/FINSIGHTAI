import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  qty: { type: Number, required: true },
  avgPrice: { type: Number, required: true },
  currentValue: { type: Number, default: 0 }, // ✅ For real-time portfolio value
  type: { type: String, enum: ["Stock", "Crypto", "ETF"], default: "Stock" }, // ✅ To identify asset type
});

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  holdings: [holdingSchema],
  totalValue: { type: Number, default: 0 }, // ✅ Track total portfolio worth
  portfolioRisk: { type: Number, default: 0 }, // ✅ Future use (risk profiler integration)
  healthScore: { type: Number, default: 100 }, // ✅ Future use (AI insights)
});

export default mongoose.model("Portfolio", portfolioSchema);
