import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["Deposit", "Withdraw"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 50000 },
  transactions: [transactionSchema],
});

export default mongoose.model("Wallet", walletSchema);
