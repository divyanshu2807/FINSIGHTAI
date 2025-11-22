// src/dashboard/pages/VirtualMoney.js
import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { getPortfolio, buyStock, sellStock } from "../../api/portfolioAPI";
import { getWallet, updateWallet } from "../../services/walletService";

/*
  VirtualMoney.js

  - Horizontal AI prediction bar (with glow/pulse)
  - AI suggestion generated ONCE at mount (stable)
  - Prices update every 2 seconds (market feel)
  - Wallet integration:
      buy  => call updateWallet(token, "Withdraw", total) then buyStock(...)
      sell => call updateWallet(token, "Deposit", total) then sellStock(...)
  - Layout same as old design:
      * Top: title + right side stats (wallet, net worth, reset)
      * Then news bar
      * Then "Your Holdings" card (full width)
      * Then "Portfolio Overview" chart (full width)
      * Bottom: left AI Suggestions card, right Available Stocks card
*/

const INITIAL_STOCKS = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3700 },
  { symbol: "INFY", name: "Infosys", price: 1500 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2500 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1600 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 940 },
  { symbol: "SBIN", name: "State Bank of India", price: 720 },
  { symbol: "ITC", name: "ITC Limited", price: 420 },
  { symbol: "WIPRO", name: "Wipro", price: 450 },
  { symbol: "HCLTECH", name: "HCL Technologies", price: 1200 },
  { symbol: "LT", name: "Larsen & Toubro", price: 3600 },
  { symbol: "ADANIENT", name: "Adani Enterprises", price: 850 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 780 },
];

function makeDummyPredictionOnce() {
  // returns a stable prediction object for each stock (used only on mount)
  return (s) => {
    const diff = Math.random() - 0.35; // bias slightly upwards sometimes
    const trend = diff >= 0 ? "UP" : "DOWN";
    const confidence = Math.floor(60 + Math.abs(diff) * 40); // 60-100
    return { symbol: s.symbol, trend, confidence };
  };
}

function formatINR(num) {
  return (
    "₹" +
    Number(num || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })
  );
}

function nowISO() {
  return new Date().toISOString();
}

export default function VirtualMoney() {
  const [balance, setBalance] = useState(0);
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [portfolioHistory, setPortfolioHistory] = useState([
    { time: new Date().toLocaleTimeString(), value: 0 },
  ]);
  const [aiSuggestions, setAiSuggestions] = useState([]); // stable on load
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStock, setModalStock] = useState(null);
  const [modalQty, setModalQty] = useState("");
  const [modalType, setModalType] = useState("buy");
  const [modalError, setModalError] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [currentNews, setCurrentNews] = useState(0);

  const tickRef = useRef(null);
  const token = localStorage.getItem("token");

  // ---------- Wallet & Portfolio fetch ----------
  const fetchWallet = async () => {
    try {
      const data = await getWallet(token);
      if (data && typeof data.balance === "number") setBalance(data.balance);
    } catch (err) {
      console.error("Wallet fetch error:", err);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const { data } = await getPortfolio();
      if (data && data.holdings) setPortfolio(data.holdings);
    } catch (err) {
      console.error("Portfolio fetch error:", err);
    }
  };

  // ---------- News ticker ----------
  useEffect(() => {
    const headlines = [
      "TCS shares likely to rise by 2% tomorrow 📈",
      "Infosys expected to face slight dip due to market trends 📉",
      "Reliance may surge as crude prices fall 💹",
      "HDFC Bank stable outlook as Nifty remains flat 💼",
      "IT Sector predicted to recover in next trading session 🔮",
      "Adani group reacts to global commodities movement 🔔",
    ];
    setNewsItems(headlines);
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ---------- Stable AI suggestions generated once on mount ----------
  useEffect(() => {
    const gen = makeDummyPredictionOnce();
    const oneTime = INITIAL_STOCKS.map((s) => gen(s));
    setAiSuggestions(oneTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // ---------- Price simulation: update every 2 seconds ----------
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const pct = (Math.random() - 0.5) * 0.02; // +/- 1%
          const newPrice = Math.max(1, +(s.price * (1 + pct)).toFixed(2));
          return { ...s, price: newPrice, trend: pct >= 0 ? "UP" : "DOWN" };
        })
      );
    }, 2000);
    return () => clearInterval(tickRef.current);
  }, []);

  // ---------- On mount, fetch wallet & portfolio ----------
  useEffect(() => {
    fetchWallet();
    fetchPortfolio();

    // restore local transactions & history (if any)
    try {
      const saved = JSON.parse(
        localStorage.getItem("finsight_virtual_money_state") || "null"
      );
      if (saved) {
        if (Array.isArray(saved.transactions))
          setTransactions(saved.transactions);
        if (Array.isArray(saved.portfolioHistory))
          setPortfolioHistory(saved.portfolioHistory);
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Update portfolio history each change ----------
  useEffect(() => {
    const totalValue = portfolio.reduce((sum, p) => {
      const stock = stocks.find((s) => s.symbol === p.symbol);
      return sum + (stock ? stock.price * p.qty : 0);
    }, 0);
    const net = +(balance + totalValue).toFixed(2);
    setPortfolioHistory((h) =>
      [...h, { time: new Date().toLocaleTimeString(), value: net }].slice(-30)
    );
  }, [stocks, portfolio, balance]);

  // ---------- Persist small state ----------
  useEffect(() => {
    try {
      localStorage.setItem(
        "finsight_virtual_money_state",
        JSON.stringify({ transactions, portfolioHistory })
      );
    } catch (e) {
      // ignore
    }
  }, [transactions, portfolioHistory]);

  // ---------- Trade modal helpers ----------
  const openTradeModal = (type, stock) => {
    setModalType(type);
    setModalStock(stock);
    setModalQty("");
    setModalError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalError(null);
  };

  // ---------- Confirm Trade: wallet integration ----------
  const handleConfirmTrade = async () => {
    const qty = parseInt(modalQty, 10);
    if (!qty || qty <= 0) return setModalError("⚠️ Enter a valid quantity.");
    const stock = modalStock;
    if (!stock) return setModalError("⚠️ No stock selected.");
    const total = +(stock.price * qty).toFixed(2);

    try {
      if (modalType === "buy") {
        await updateWallet(token, "Withdraw", total);
        const { data } = await buyStock({
          symbol: stock.symbol,
          qty,
          price: stock.price,
        });
        if (data?.portfolio?.holdings) setPortfolio(data.portfolio.holdings);
        setTransactions((t) => [
          {
            id: Date.now(),
            date: nowISO(),
            symbol: stock.symbol,
            type: "BUY",
            qty,
            price: stock.price,
            total,
          },
          ...t,
        ]);
        // ✅ ALERT HATAYA – yahan pehle alert tha
      } else {
        await updateWallet(token, "Deposit", total);
        const { data } = await sellStock({
          symbol: stock.symbol,
          qty,
          price: stock.price,
        });
        if (data?.portfolio?.holdings) setPortfolio(data.portfolio.holdings);
        setTransactions((t) => [
          {
            id: Date.now(),
            date: nowISO(),
            symbol: stock.symbol,
            type: "SELL",
            qty,
            price: stock.price,
            total,
          },
          ...t,
        ]);
        // ✅ ALERT HATAYA – yahan pehle alert tha
      }

      await fetchWallet();
      await fetchPortfolio();
      closeModal();
    } catch (err) {
      console.error("Trade error:", err);
      const msg =
        err?.response?.data?.message ||
        "❌ Transaction failed. Check balance or holdings.";
      setModalError(msg);
    }
  };

  // ---------- Reset simulator (local) ----------
  const handleReset = () => {
    setBalance(0);
    setPortfolio([]);
    setTransactions([]);
    setPortfolioHistory([
      { time: new Date().toLocaleTimeString(), value: 0 },
    ]);
    setShowResetModal(false);
    try {
      localStorage.removeItem("finsight_virtual_money_state");
    } catch (e) {}
  };

  // ---------- Derived values ----------
  const totalValue = portfolio.reduce((sum, p) => {
    const s = stocks.find((st) => st.symbol === p.symbol);
    return sum + (s ? s.price * p.qty : 0);
  }, 0);
  const netWorth = +(balance + totalValue).toFixed(2);

  // ---------- UI render ----------
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#020617,#020b1a)",
        color: "#E5E7EB",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 32px 40px 32px",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {/* Title block */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 600,
                margin: 0,
                marginBottom: 4,
              }}
            >
              Virtual Money — AI Trading Simulator
            </h1>
            <p
              style={{
                margin: 0,
                color: "#9CA3AF",
                fontSize: 14,
              }}
            >
              Practice trading with demo balance using AI predictions and
              insights.
            </p>
          </div>

          {/* Stats cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "stretch",
            }}
          >
            <div style={statCardStyle}>
              <div style={statLabelStyle}>Wallet Balance</div>
              <div style={statValueStyle}>{formatINR(balance)}</div>
            </div>
            <div style={statCardStyle}>
              <div style={statLabelStyle}>Net Worth</div>
              <div style={statValueStyle}>{formatINR(netWorth)}</div>
            </div>
            <button
              onClick={() => setShowResetModal(true)}
              style={{
                borderRadius: 10,
                border: "1px solid rgba(148,163,184,0.6)",
                padding: "8px 14px",
                background: "rgba(15,23,42,0.9)",
                color: "#E5E7EB",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              <RefreshCw size={15} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* News bar */}
        <div
          style={{
            marginBottom: 18,
            padding: "6px 10px",
            background: "rgba(15,23,42,0.9)",
            borderRadius: 10,
            border: "1px solid rgba(51,65,85,0.8)",
            fontSize: 13,
            textAlign: "center",
            color: "#CBD5F5",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          📰 {newsItems[currentNews] || "Loading latest market insight..."}
        </div>

        {/* Holdings card */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Your Holdings</h2>
          {portfolio.length === 0 ? (
            <p
              style={{
                color: "#9CA3AF",
                fontSize: 14,
                marginTop: 6,
              }}
            >
              No holdings yet. Buy some stocks!
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
                marginTop: 10,
              }}
            >
              <thead>
                <tr style={{ color: "#9CA3AF", borderBottom: tableBorder }}>
                  <th style={thTdStyle}>Symbol</th>
                  <th style={thTdStyle}>Qty</th>
                  <th style={thTdStyle}>Avg. Price</th>
                  <th style={thTdStyle}>Current Price</th>
                  <th style={thTdStyle}>P/L</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((p) => {
                  const s = stocks.find((st) => st.symbol === p.symbol);
                  const current = s ? s.price : 0;
                  const pl = (current - p.avgPrice) * p.qty;
                  const plColor =
                    pl >= 0 ? "rgba(52,211,153,1)" : "rgba(248,113,113,1)";
                  return (
                    <tr
                      key={p.symbol}
                      style={{
                        borderBottom: "1px solid rgba(30,64,175,0.4)",
                      }}
                    >
                      <td style={tdBodyStyle}>{p.symbol}</td>
                      <td style={tdBodyStyle}>{p.qty}</td>
                      <td style={tdBodyStyle}>{formatINR(p.avgPrice)}</td>
                      <td style={tdBodyStyle}>{formatINR(current)}</td>
                      <td
                        style={{
                          ...tdBodyStyle,
                          fontWeight: 600,
                          color: plColor,
                        }}
                      >
                        {formatINR(pl)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Portfolio chart card */}
        <div style={{ ...cardStyle, marginTop: 18 }}>
          <h2 style={cardTitleStyle}>Portfolio Overview</h2>
          <div style={{ width: "100%", height: 220, marginTop: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioHistory}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.25)"
                />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                <Tooltip formatter={(v) => formatINR(v)} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row: AI + Stocks */}
        <div
          className="vm-grid-two"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 24,
            marginTop: 24,
          }}
        >
          {/* AI Suggestions */}
          <div style={cardStyle}>
            <h2 style={{ ...cardTitleStyle, fontSize: 17 }}>
              🔮 AI Suggestions
            </h2>
            {aiSuggestions.map((sug) => {
              const stockInfo =
                stocks.find((st) => st.symbol === sug.symbol) || {};
              const name = stockInfo.name || sug.symbol;
              const widthPct = Math.min(Math.max(sug.confidence, 5), 100);
              const isUp = sug.trend === "UP";
              return (
                <div
                  key={sug.symbol}
                  style={{
                    marginBottom: 14,
                    padding: 12,
                    borderRadius: 12,
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(30,64,175,0.7)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{ fontWeight: 600, fontSize: 14, margin: 0 }}
                      >
                        {sug.symbol}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#9CA3AF",
                          marginTop: 2,
                        }}
                      >
                        {name}
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: isUp ? "#34D399" : "#FB7185",
                      }}
                    >
                      {sug.trend} • {sug.confidence}%
                    </div>
                  </div>

                  {/* Horizontal prediction bar */}
                  <div style={{ marginTop: 10 }}>
                    <div
                      style={{
                        height: 12,
                        width: "100%",
                        background: "rgba(148,163,184,0.12)",
                        borderRadius: 8,
                        overflow: "hidden",
                        position: "relative",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.03)",
                      }}
                    >
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${widthPct}%`,
                          maxWidth: "100%",
                          borderRadius: 8,
                          background: isUp
                            ? "linear-gradient(90deg,#34d399,#10b981)"
                            : "linear-gradient(90deg,#fb7185,#ef4444)",
                          boxShadow: isUp
                            ? "0 6px 18px rgba(16,185,129,0.35)"
                            : "0 6px 18px rgba(239,68,68,0.35)",
                          transition:
                            "width 900ms cubic-bezier(.2,.9,.2,1)",
                          animation: isUp
                            ? "barGlowUp 2s ease-in-out infinite"
                            : "barGlowDown 2s ease-in-out infinite",
                        }}
                      />
                      {/* highlight dot */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          left: `${Math.max(widthPct - 2, 0)}%`,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.95)",
                          boxShadow:
                            "0 0 10px rgba(255,255,255,0.95)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#9CA3AF",
                        marginTop: 6,
                      }}
                    >
                      AI confidence — {sug.confidence}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Available Stocks */}
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Available Stocks</h2>
            {stocks.map((s) => (
              <div
                key={s.symbol}
                style={{
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(30,64,175,0.7)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#CBD5F5",
                      marginBottom: 2,
                    }}
                  >
                    {s.symbol}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>
                    {s.name}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color:
                        s.trend === "UP"
                          ? "#34D399"
                          : s.trend === "DOWN"
                          ? "#FB7185"
                          : "#E5E7EB",
                    }}
                  >
                    {formatINR(s.price)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 8,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => openTradeModal("buy", s)}
                      style={buyBtnStyle}
                    >
                      <ArrowUpRight size={14} />
                      <span>Buy</span>
                    </button>
                    <button
                      onClick={() => openTradeModal("sell", s)}
                      style={sellBtnStyle}
                    >
                      <ArrowDownRight size={14} />
                      <span>Sell</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Modal */}
        {modalOpen && modalStock && (
          <div style={modalBackdropStyle}>
            <div style={modalCardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#9CA3AF",
                    }}
                  >
                    {modalStock.symbol} • {modalStock.name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {formatINR(modalStock.price)}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#9CA3AF",
                    cursor: "pointer",
                  }}
                >
                  <X />
                </button>
              </div>

              <div>
                <input
                  type="number"
                  min="1"
                  value={modalQty}
                  onChange={(e) => setModalQty(e.target.value)}
                  placeholder="Quantity (e.g., 5)"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(55,65,81,1)",
                    background: "#020617",
                    color: "#E5E7EB",
                    fontSize: 14,
                  }}
                />
                {modalError && (
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 13,
                      color: "#FB7185",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <AlertTriangle size={16} /> {modalError}
                  </div>
                )}
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "#9CA3AF",
                  }}
                >
                  <div>
                    Total Cost:{" "}
                    {modalQty
                      ? formatINR(modalStock.price * modalQty)
                      : "—"}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={handleConfirmTrade}
                    style={{
                      flex: 1,
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      background:
                        "linear-gradient(135deg,#2563EB,#3B82F6)",
                      color: "white",
                      padding: "8px 0",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Check size={16} /> Confirm
                  </button>
                  <button
                    onClick={closeModal}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(55,65,81,1)",
                      background: "rgba(15,23,42,0.9)",
                      color: "#E5E7EB",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reset Modal */}
        {showResetModal && (
          <div style={modalBackdropStyle}>
            <div
              style={{
                ...modalCardStyle,
                maxWidth: 340,
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Reset Simulator?
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#9CA3AF",
                  marginBottom: 18,
                }}
              >
                This will clear all your data and start fresh.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <button
                  onClick={handleReset}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg,#DC2626,#FB7185)",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid rgba(55,65,81,1)",
                    background: "rgba(15,23,42,0.9)",
                    color: "#E5E7EB",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline animations + small responsive tweak */}
      <style>{`
        @keyframes barGlowUp {
          0% { box-shadow: 0 0 6px rgba(16,185,129,0.06); transform: translateY(0); opacity: 0.9; }
          50% { box-shadow: 0 0 18px rgba(16,185,129,0.18); transform: translateY(-2px); opacity: 1; }
          100% { box-shadow: 0 0 6px rgba(16,185,129,0.06); transform: translateY(0); opacity: 0.9; }
        }
        @keyframes barGlowDown {
          0% { box-shadow: 0 0 6px rgba(239,68,68,0.06); transform: translateY(0); opacity: 0.9; }
          50% { box-shadow: 0 0 18px rgba(239,68,68,0.18); transform: translateY(-2px); opacity: 1; }
          100% { box-shadow: 0 0 6px rgba(239,68,68,0.06); transform: translateY(0); opacity: 0.9; }
        }
        @media (max-width: 900px) {
          .vm-grid-two {
            grid-template-columns: minmax(0,1fr);
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Reusable style objects ---------- */

const cardStyle = {
  background: "rgba(15,23,42,0.9)",
  borderRadius: 16,
  border: "1px solid rgba(30,64,175,0.8)",
  padding: 16,
  boxShadow: "0 10px 30px rgba(15,23,42,0.7)",
};

const cardTitleStyle = {
  fontSize: 16,
  fontWeight: 600,
  margin: 0,
  marginBottom: 8,
};

const statCardStyle = {
  minWidth: 150,
  padding: "10px 14px",
  borderRadius: 10,
  background: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(51,65,85,0.9)",
};

const statLabelStyle = {
  fontSize: 11,
  color: "#9CA3AF",
  marginBottom: 4,
};

const statValueStyle = {
  fontSize: 16,
  fontWeight: 600,
};

const tableBorder = "1px solid rgba(30,64,175,0.5)";

const thTdStyle = {
  padding: "8px 6px",
  textAlign: "left",
};

const tdBodyStyle = {
  padding: "8px 6px",
  fontSize: 13,
};

const buyBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "4px 10px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg,#2563EB,#3B82F6)",
  color: "white",
  fontSize: 12,
  fontWeight: 600,
};

const sellBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "4px 10px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg,#DC2626,#FB7185)",
  color: "white",
  fontSize: 12,
  fontWeight: 600,
};

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
  padding: 16,
};

const modalCardStyle = {
  width: "100%",
  maxWidth: 420,
  background: "rgba(15,23,42,1)",
  borderRadius: 14,
  border: "1px solid rgba(30,64,175,0.9)",
  padding: 18,
  color: "#E5E7EB",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
};
