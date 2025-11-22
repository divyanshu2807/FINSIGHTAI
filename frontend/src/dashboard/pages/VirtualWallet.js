// src/dashboard/pages/VirtualWallet.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet2 } from "lucide-react";
import { getWallet, updateWallet } from "../../services/walletService";

const VirtualWallet = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔄 Wallet + history load
  const loadWallet = async () => {
    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const data = await getWallet(token);

      // ✅ balance handle
      const balance =
        typeof data.balance === "number"
          ? data.balance
          : data.walletBalance || 0;
      setWalletBalance(balance);

      // ✅ history handle (different backends)
      const history =
        (Array.isArray(data.transactions) && data.transactions) ||
        (Array.isArray(data.history) && data.history) ||
        [];
      setTransactions(history);
    } catch (err) {
      console.error("Error fetching wallet:", err);
      setError("Failed to load wallet. Please try again.");
    }
  };

  useEffect(() => {
    loadWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 💰 Quick action handler
  const handleQuickAction = async (type, amount) => {
    try {
      setError("");
      setMessage("");
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // withdraw guard
      if (type === "Withdraw" && amount > walletBalance) {
        setError("You cannot withdraw more than your wallet balance.");
        return;
      }

      await updateWallet(token, type, amount);

      setMessage(
        type === "Deposit"
          ? `₹${amount.toLocaleString("en-IN")} added successfully.`
          : `₹${amount.toLocaleString("en-IN")} withdrawn successfully.`
      );

      // refresh wallet + history
      await loadWallet();
    } catch (err) {
      console.error("Error updating wallet:", err);
      const data = err?.response?.data;
      const backendMessage =
        data?.message ||
        data?.error ||
        data?.msg ||
        (Array.isArray(data?.errors) && data.errors[0]?.msg);

      setError(backendMessage || "Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amt) => {
    if (amt == null) return "₹0";
    const num = typeof amt === "number" ? amt : Number(amt);
    if (Number.isNaN(num)) return "₹0";
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString("en-IN");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1e3a8a 0, #020617 55%, #000814 100%)",
        color: "#ffffff",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔙 Back button */}
      <div style={{ marginBottom: "24px" }}>
        <button
          onClick={() => navigate("/dashboard/overview")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            background: "linear-gradient(135deg,#0f172a,#020617)",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </div>

      {/* 🟦 Main Wallet Card */}
      <div
        style={{
          margin: "0 auto",
          maxWidth: "900px",
          width: "100%",
          background: "linear-gradient(145deg, #020617ee, #020617dd)",
          borderRadius: "20px",
          padding: "28px 34px 26px",
          boxShadow: "0 24px 60px rgba(15,23,42,0.95)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#22d3ee",
              letterSpacing: "0.06em",
            }}
          >
            Virtual Wallet
          </h1>
          <p
            style={{
              marginTop: "6px",
              fontSize: "14px",
              color: "#cbd5f5",
            }}
          >
            Manage your FinsightAI balance and real transaction history.
          </p>
        </div>

        {/* Balance Row */}
        <div
          style={{
            marginTop: "10px",
            marginBottom: "22px",
            padding: "18px 22px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(15,118,110,0.3), rgba(15,23,42,0.9))",
            border: "1px solid rgba(45,212,191,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 16,
              background:
                "radial-gradient(circle at 30% 0, #38bdf8, #0ea5e9, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(56,189,248,0.7)",
            }}
          >
            <Wallet2 size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#e5f3ff",
                marginBottom: 4,
              }}
            >
              Balance:{" "}
              <span style={{ fontSize: 22, color: "#4ade80" }}>
                {formatAmount(walletBalance)}
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#a5f3fc",
              }}
            >
              This balance is used on your{" "}
              <span style={{ fontWeight: 600 }}>Virtual Money</span> page to
              buy and sell stocks.
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "18px",
            marginBottom: "22px",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            disabled={loading}
            onClick={() => handleQuickAction("Deposit", 1000)}
            style={{
              flex: 1,
              maxWidth: 220,
              padding: "12px 18px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg,#0ea5e9,#22c55e)",
              color: "#0b1120",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            + Add ₹1,000
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleQuickAction("Deposit", 5000)}
            style={{
              flex: 1,
              maxWidth: 220,
              padding: "12px 18px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg,#22c55e,#4ade80)",
              color: "#022c22",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            + Add ₹5,000
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleQuickAction("Withdraw", 1000)}
            style={{
              flex: 1,
              maxWidth: 220,
              padding: "12px 18px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg,#f97316,#ef4444)",
              color: "#0b1120",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            − Withdraw ₹1,000
          </button>
        </div>

        {/* Error / Success message */}
        <div style={{ minHeight: 22, marginBottom: 10 }}>
          {error && (
            <p style={{ fontSize: 13, color: "#fca5a5" }}>{error}</p>
          )}
          {!error && message && (
            <p style={{ fontSize: 13, color: "#6ee7b7" }}>{message}</p>
          )}
        </div>

        {/* Transaction History */}
        <div
          style={{
            marginTop: 10,
            borderRadius: 14,
            background: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(30,64,175,0.6)",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#bfdbfe",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            📜 Transaction History
          </div>

          {transactions.length === 0 ? (
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              No transactions yet. Use the buttons above to add or withdraw
              money.
            </p>
          ) : (
            <div>
              {transactions
                .slice()
                .reverse()
                .map((tx, idx) => {
                  const isDeposit =
                    (tx.type || "").toLowerCase() === "deposit";
                  const amountText = formatAmount(tx.amount);
                  const dateText =
                    formatDateTime(tx.date || tx.createdAt || tx.time) || "";

                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 8px",
                        borderRadius: 10,
                        background:
                          idx % 2 === 0
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(15,23,42,0.7)",
                        marginBottom: 6,
                        fontSize: 13,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: isDeposit ? "#22c55e" : "#f97316",
                          }}
                        >
                          {isDeposit ? "Deposit" : "Withdraw"}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: isDeposit ? "#4ade80" : "#fca5a5",
                          }}
                        >
                          {amountText}
                        </div>
                        {dateText && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#9ca3af",
                              marginTop: 2,
                            }}
                          >
                            {dateText}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualWallet;
