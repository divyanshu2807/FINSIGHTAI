// src/dashboard/pages/AIPredictor.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

// ---------- STYLES (inline) ----------
const styles = {
  page: {
    // lighter background
    backgroundColor: "#020b1f",
    minHeight: "100vh",
    color: "#ffffff",
    padding: "28px 0px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 24px",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    gap: 24,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  titleAccent: {
    color: "#18C8FF",
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#CBD5F5",
  },
  lastUpdated: {
    marginTop: 8,
    fontSize: 12,
    color: "#94A3B8",
  },
  controlsRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  select: {
    backgroundColor: "#071628",
    border: "1px solid #1E293B",
    color: "#E5E7EB",
    fontSize: 12,
    padding: "8px 10px",
    borderRadius: 8,
    outline: "none",
    fontWeight: 500,
  },
  toggleContainer: {
    display: "flex",
    borderRadius: 999,
    overflow: "hidden",
    border: "1px solid #1E293B",
    backgroundColor: "#071628",
    fontSize: 12,
  },
  toggleBtn: (active) => ({
    padding: "8px 18px",
    border: "none",
    cursor: "pointer",
    backgroundColor: active ? "#18C8FF" : "transparent",
    color: active ? "#020617" : "#E5E7EB",
    fontWeight: active ? 700 : 500,
  }),
  refreshBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    borderRadius: 999,
    border: "1px solid #38BDF8",
    backgroundColor: "#0F172A",
    padding: "8px 16px",
    cursor: "pointer",
    color: "#E5E7EB",
    fontWeight: 600,
  },
  refreshIcon: {
    width: 16,
    height: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 12,
    fontWeight: 600,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 20,
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#071628",
    borderRadius: 16,
    border: "1px solid #111827",
    padding: 18,
    boxShadow: "0 0 24px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tickerLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: 500,
  },
  tickerValue: {
    fontSize: 15,
    fontWeight: 700,
  },
  tickerName: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 500,
  },
  changeRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  changeText: (color) => ({
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 700,
    color,
  }),
  tomorrowText: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 500,
  },
  cardFooter: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1px solid #1E293B",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  footerBlock: {
    display: "flex",
    flexDirection: "column",
  },
  footerLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: 500,
  },
  footerValueGreen: {
    fontSize: 13,
    fontWeight: 700,
    color: "#22C55E",
  },
  footerValueWhite: {
    fontSize: 13,
    fontWeight: 700,
  },
  trendBadge: (up) => ({
    fontSize: 11,
    padding: "5px 12px",
    borderRadius: 999,
    border: up ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(248,113,113,0.6)",
    backgroundColor: up ? "rgba(22,101,52,0.45)" : "rgba(127,29,29,0.4)",
    color: up ? "#BBF7D0" : "#FCA5A5",
    whiteSpace: "nowrap",
    fontWeight: 600,
  }),
  chartWrapper: {
    height: 120,
    marginBottom: 10,
  },

  // Manual mode styles
  manualWrapper: {
    marginTop: 36,
    display: "flex",
    justifyContent: "center",
  },
  manualCard: {
    width: "460px",
    backgroundColor: "#071628",
    borderRadius: 18,
    border: "1px solid #111827",
    padding: 22,
    boxShadow: "0 0 28px rgba(0,0,0,0.6)",
  },
  manualTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 6,
  },
  manualSub: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 18,
  },
  manualRow: {
    display: "flex",
    gap: 14,
    marginBottom: 12,
  },
  manualField: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  manualLabel: {
    fontSize: 12,
    color: "#CBD5F5",
    marginBottom: 5,
    fontWeight: 600,
  },
  manualInput: {
    backgroundColor: "#020b1f",
    borderRadius: 10,
    border: "1px solid #1E293B",
    padding: "8px 11px",
    fontSize: 13,
    color: "#E5E7EB",
    outline: "none",
    fontWeight: 500,
  },
  manualButton: {
    marginTop: 14,
    width: "100%",
    padding: "10px 0",
    borderRadius: 999,
    border: "none",
    background:
      "linear-gradient(90deg, rgba(56,189,248,1) 0%, rgba(59,130,246,1) 100%)",
    color: "#020617",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  manualResult: {
    marginTop: 18,
    paddingTop: 12,
    borderTop: "1px solid #1E293B",
    fontSize: 13,
    color: "#E5E7EB",
  },
  manualResultLine: {
    marginBottom: 4,
  },
  manualHighlightUp: {
    color: "#22C55E",
    fontWeight: 700,
  },
  manualHighlightDown: {
    color: "#F97373",
    fontWeight: 700,
  },
};



// NEW
const PREDICT_API = "https://finsightai-1.onrender.com/api/predict";


// ---------- STOCK LIST + CHART HELPER ----------
const baseMockStocks = [
  { symbol: "TCS.NS", name: "TCS" },
  { symbol: "INFY.NS", name: "INFY" },
  { symbol: "RELIANCE.NS", name: "RELIANCE" },
  { symbol: "HDFCBANK.NS", name: "HDFCBANK" },
  { symbol: "ICICIBANK.NS", name: "ICICI BANK" },
  { symbol: "KOTAKBANK.NS", name: "KOTAK BANK" },
  { symbol: "SBIN.NS", name: "SBI" },
  { symbol: "AXISBANK.NS", name: "AXIS BANK" },
  { symbol: "HINDUNILVR.NS", name: "HUL" },
  { symbol: "ITC.NS", name: "ITC" },
  { symbol: "LT.NS", name: "L&T" },
  { symbol: "TITAN.NS", name: "TITAN" },
  { symbol: "BAJFINANCE.NS", name: "BAJ FINANCE" },
  { symbol: "ASIANPAINT.NS", name: "ASIAN PAINTS" },
  { symbol: "MARUTI.NS", name: "MARUTI" },
  { symbol: "ULTRACEMCO.NS", name: "ULTRATECH" },
  { symbol: "WIPRO.NS", name: "WIPRO" },
  { symbol: "HCLTECH.NS", name: "HCL TECH" },
  { symbol: "SUNPHARMA.NS", name: "SUN PHARMA" },
  { symbol: "TATAMOTORS.NS", name: "TATA MOTORS" },
];

function makeSeries(basePrice, trendUp) {
  const pts = [];
  let price = basePrice;
  for (let i = 5; i >= 1; i--) {
    const delta =
      (Math.random() * 1.3 + 0.2) * (trendUp ? 1 : -1) * (basePrice / 200);
    price = Math.max(basePrice * 0.85, price + delta);
    pts.unshift({ label: `T-${i}`, price: Number(price.toFixed(2)) });
  }
  pts.push({
    label: "Today",
    price: Number((price * (1 + (Math.random() - 0.4) / 100)).toFixed(2)),
  });
  return pts;
}

// ---------- COMPONENT ----------
export default function AIPredictor() {
  const [mode, setMode] = useState("auto");
  const [modelName, setModelName] = useState("Finsight AI");
  const [stocks, setStocks] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const [manualData, setManualData] = useState({
    ticker: "",
    open: "",
    high: "",
    low: "",
    close: "",
    volume: "",
  });
  const [manualResult, setManualResult] = useState(null);

  // 🔥 AUTO MODE: BACKEND SE REAL ML PREDICTION
  const fetchPredictions = async () => {
    try {
      const requests = baseMockStocks.map((stock) =>
        axios
          .get(PREDICT_API, { params: { ticker: stock.symbol } })
          .then((res) => ({ ok: true, data: res.data, meta: stock }))
          .catch((err) => {
            console.error("Prediction error for", stock.symbol, err);
            return { ok: false, meta: stock };
          })
      );

      const results = await Promise.all(requests);

      const mapped = results
        .filter((r) => r.ok && !r.data.error)
        .map(({ data, meta }) => {
          const current = Number(data.current_close);
          const predicted = Number(data.predicted_close);
          const trendUp = (data.trend || "").toUpperCase() === "UP";

          const changePercent =
            current > 0 ? ((predicted - current) / current) * 100 : 0;

          return {
            symbol: meta.symbol,
            name: meta.name,
            trendUp,
            changePercent: Number(changePercent.toFixed(2)),
            confidence: Number(data.confidence),
            predictedClose: Number(predicted.toFixed(2)),
            series: makeSeries(current || predicted || 1000, trendUp),
          };
        });

      setStocks(mapped);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching batch predictions:", error);
    }
  };

  useEffect(() => {
    if (mode === "auto") {
      fetchPredictions();
    }
  }, [mode, modelName]);

  const handleRefresh = () => {
    if (mode === "auto") fetchPredictions();
  };

  const handleManualChange = (field, value) => {
    setManualData((prev) => ({ ...prev, [field]: value }));
  };

  // Manual — abhi front-end logic (backend nahi hai iss mode ka)
  const handleManualSubmit = (e) => {
    e.preventDefault();

    const open = parseFloat(manualData.open);
    const close = parseFloat(manualData.close);
    const high = parseFloat(manualData.high);
    const low = parseFloat(manualData.low);
    const volume = parseFloat(manualData.volume || "0");

    if (isNaN(open) || isNaN(close) || isNaN(high) || isNaN(low)) {
      alert("Please fill Open, High, Low, Close correctly.");
      return;
    }

    const changePercent = ((close - open) / open) * 100;
    const trendUp = changePercent >= 0;
    let confidenceBase = 70;
    if (volume > 0) {
      confidenceBase += Math.min(20, Math.log10(volume + 1) * 3);
    }
    if (high - low > open * 0.03) confidenceBase += 5;
    const confidence = Math.min(98, Math.max(50, confidenceBase));

    const predictedClose = close * (1 + (trendUp ? 0.01 : -0.01));

    setManualResult({
      trendUp,
      changePercent: Number(changePercent.toFixed(2)),
      confidence: Number(confidence.toFixed(1)),
      predictedClose: Number(predictedClose.toFixed(2)),
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* -------- HEADER + CONTROLS ROW -------- */}
        <div style={styles.headerRow}>
          <div style={styles.headerText}>
            <h1 style={styles.title}>
              AI Predictor — <span style={styles.titleAccent}>FinsightAI</span>
            </h1>
            <p style={styles.subtitle}>
              Auto Mode shows AI predicted stock movements. Manual Mode lets you
              input your own recent data for predictions.
            </p>
            {lastUpdated && (
              <p style={styles.lastUpdated}>Last updated: {lastUpdated}</p>
            )}
          </div>

          <div style={styles.controlsRow}>
            <select
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              style={styles.select}
            >
              <option value="Finsight AI">Finsight AI</option>
              <option value="Finsight AI v2">Finsight AI v2</option>
            </select>

            <div style={styles.toggleContainer}>
              <button
                style={styles.toggleBtn(mode === "auto")}
                onClick={() => setMode("auto")}
              >
                Auto
              </button>
              <button
                style={styles.toggleBtn(mode === "manual")}
                onClick={() => setMode("manual")}
              >
                Manual
              </button>
            </div>

            <button style={styles.refreshBtn} onClick={handleRefresh}>
              <RefreshCw style={styles.refreshIcon} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* -------- AUTO MODE: CARDS GRID -------- */}
        {mode === "auto" && (
          <>
            <div style={styles.sectionTitle}>Auto Predictions</div>
            <div style={styles.cardsGrid}>
              {stocks.map((stock) => {
                const ArrowIcon = stock.trendUp ? ArrowUpRight : ArrowDownRight;
                const changeColor = stock.trendUp ? "#22C55E" : "#F97373";
                const trendText = stock.trendUp ? "Trend: UP" : "Trend: DOWN";

                return (
                  <div key={stock.symbol} style={styles.card}>
                    {/* CARD HEADER */}
                    <div style={styles.cardHeader}>
                      <div>
                        <div style={styles.tickerLabel}>Ticker</div>
                        <div style={styles.tickerValue}>{stock.symbol}</div>
                        <div style={styles.tickerName}>{stock.name}</div>
                      </div>

                      <div style={styles.changeRow}>
                        <div style={styles.changeText(changeColor)}>
                          <ArrowIcon
                            size={18}
                            style={{ marginRight: 5 }}
                          />
                          {stock.changePercent > 0 ? "+" : ""}
                          {stock.changePercent}%
                        </div>
                        <span style={styles.tomorrowText}>Tomorrow</span>
                      </div>
                    </div>

                    {/* MINI CHART */}
                    <div style={styles.chartWrapper}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stock.series}>
                          <CartesianGrid
                            stroke="#1f2933"
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: "#64748B" }}
                          />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#020617",
                              border: "1px solid #1E293B",
                              fontSize: 12,
                            }}
                            labelStyle={{ color: "#E5E7EB" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            dot={{ r: 3 }}
                            stroke="#22C55E"
                            strokeWidth={2}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* CARD FOOTER */}
                    <div style={styles.cardFooter}>
                      <div style={styles.footerBlock}>
                        <span style={styles.footerLabel}>AI Confidence</span>
                        <span style={styles.footerValueGreen}>
                          {stock.confidence}%
                        </span>
                      </div>
                      <div style={styles.footerBlock}>
                        <span style={styles.footerLabel}>Predicted Close</span>
                        <span style={styles.footerValueWhite}>
                          ₹ {stock.predictedClose}
                        </span>
                      </div>
                      <span style={styles.trendBadge(stock.trendUp)}>
                        {trendText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* -------- MANUAL MODE: FORM (local logic) -------- */}
        {mode === "manual" && (
          <div style={styles.manualWrapper}>
            <form style={styles.manualCard} onSubmit={handleManualSubmit}>
              <div style={styles.manualTitle}>Manual Prediction</div>
              <div style={styles.manualSub}>
                Aaj ke price details daalo (OHLC + volume). FinsightAI kal ke
                move ka अंदाज़ा lagayega.
              </div>

              <div style={styles.manualRow}>
                <div style={styles.manualField}>
                  <label style={styles.manualLabel}>Ticker</label>
                  <input
                    style={styles.manualInput}
                    placeholder="e.g. TCS.NS"
                    value={manualData.ticker}
                    onChange={(e) =>
                      handleManualChange("ticker", e.target.value)
                    }
                  />
                </div>
              </div>

              <div style={styles.manualRow}>
                <div style={styles.manualField}>
                  <label style={styles.manualLabel}>Open Price</label>
                  <input
                    style={styles.manualInput}
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3560.25"
                    value={manualData.open}
                    onChange={(e) =>
                      handleManualChange("open", e.target.value)
                    }
                  />
                </div>
                <div style={styles.manualField}>
                  <label style={styles.manualLabel}>Close Price</label>
                  <input
                    style={styles.manualInput}
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3590.10"
                    value={manualData.close}
                    onChange={(e) =>
                      handleManualChange("close", e.target.value)
                    }
                  />
                </div>
              </div>

              <div style={styles.manualRow}>
                <div style={styles.manualField}>
                  <label style={styles.manualLabel}>High Price</label>
                  <input
                    style={styles.manualInput}
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3620"
                    value={manualData.high}
                    onChange={(e) =>
                      handleManualChange("high", e.target.value)
                    }
                  />
                </div>
                <div style={styles.manualField}>
                  <label style={styles.manualLabel}>Low Price</label>
                  <input
                    style={styles.manualInput}
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3510"
                    value={manualData.low}
                    onChange={(e) =>
                      handleManualChange("low", e.target.value)
                    }
                  />
                </div>
              </div>

              <div style={styles.manualRow}>
                <div style={styles.manualField}>
                  <label style={styles.manualLabel}>Volume</label>
                  <input
                    style={styles.manualInput}
                    type="number"
                    step="1"
                    placeholder="e.g. 1200000"
                    value={manualData.volume}
                    onChange={(e) =>
                      handleManualChange("volume", e.target.value)
                    }
                  />
                </div>
              </div>

              <button type="submit" style={styles.manualButton}>
                Predict
              </button>

              {manualResult && (
                <div style={styles.manualResult}>
                  <div style={styles.manualResultLine}>
                    <strong>Direction:</strong>{" "}
                    <span
                      style={
                        manualResult.trendUp
                          ? styles.manualHighlightUp
                          : styles.manualHighlightDown
                      }
                    >
                      {manualResult.trendUp ? "UP" : "DOWN"} (
                      {manualResult.changePercent > 0 ? "+" : ""}
                      {manualResult.changePercent}%)
                    </span>
                  </div>
                  <div style={styles.manualResultLine}>
                    <strong>AI Confidence:</strong>{" "}
                    {manualResult.confidence}%
                  </div>
                  <div style={styles.manualResultLine}>
                    <strong>Predicted Close (Tomorrow):</strong> ₹{" "}
                    {manualResult.predictedClose}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
