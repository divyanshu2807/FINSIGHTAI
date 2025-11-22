// src/dashboard/pages/Portfolio.js
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getPortfolio } from "../../api/portfolioAPI";

// 🔹 Demo chart & allocation data (same as pehle)
const performanceData = [
  { date: "20-05", value: 16000 },
  { date: "22-05", value: 17800 },
  { date: "24-05", value: 18900 },
  { date: "26-05", value: 19500 },
  { date: "28-05", value: 20500 },
  { date: "30-05", value: 21000 },
];

const allocationData = [
  { name: "Stock", value: 72 },
  { name: "Others", value: 28 },
];

const ALLOCATION_COLORS = ["#7C3AED", "#22D3EE"];

// 🔹 OLD static holdings (fallback) – same as pehle
const holdingsData = [
  { asset: "VYPE", quantity: 100, value: "₹19,346", change: "+1.55%", type: "Stock" },
  { asset: "RELIANCE", quantity: 15, value: "₹4,250", change: "+2.1%", type: "Stock" },
  { asset: "TCS", quantity: 10, value: "₹3,800", change: "+4.2%", type: "Stock" },
  { asset: "NIFTY ETF", quantity: 20, value: "₹3,000", change: "+1.2%", type: "ETF" },
];

// 🔹 Same stocks list as VirtualMoney (price estimate ke liye)
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

const formatINR = (num) =>
  "₹" + Number(num || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

const styles = {
  page: {
    width: "100%",
    height: "100%",
    backgroundColor: "#020617",
    color: "#E5E7EB",
    overflowY: "auto",
  },
  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "24px 24px 40px 24px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  titleBox: {
    textAlign: "center",
    marginBottom: "24px",
  },
  mainTitle: {
    fontSize: "26px",
    fontWeight: 700,
  },
  subTitle: {
    marginTop: "4px",
    fontSize: "13px",
    color: "#9CA3AF",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: "12px",
    border: "1px solid #1F2937",
    padding: "14px 16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  },
  cardLabel: {
    fontSize: "11px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#9CA3AF",
  },
  cardValue: {
    marginTop: "6px",
    fontSize: "20px",
    fontWeight: 600,
  },
  cardChange: {
    marginTop: "2px",
    fontSize: "11px",
    color: "#4ADE80",
  },
  cardSmall: {
    marginTop: "8px",
    fontSize: "11px",
    color: "#6B7280",
  },
  midRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "24px",
  },
  midCard: {
    backgroundColor: "#020617",
    borderRadius: "12px",
    border: "1px solid #1F2937",
    padding: "14px 16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  },
  midHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  midTitle: {
    fontSize: "13px",
    fontWeight: 600,
  },
  midSub: {
    fontSize: "11px",
    color: "#6B7280",
  },
  chartWrapper: {
    height: "220px",
  },
  allocNote: {
    marginTop: "6px",
    textAlign: "center",
    fontSize: "11px",
    color: "#9CA3AF",
  },
  tableCard: {
    backgroundColor: "#020617",
    borderRadius: "12px",
    border: "1px solid #1F2937",
    padding: "14px 16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    marginBottom: "20px",
  },
  tableTitle: {
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
  },
  th: {
    textAlign: "left",
    paddingBottom: "6px",
    paddingRight: "16px",
    color: "#9CA3AF",
    borderBottom: "1px solid #111827",
  },
  td: {
    padding: "8px 16px 8px 0",
    borderBottom: "1px solid #020617",
  },
  greenText: {
    color: "#4ADE80",
  },
  vypeCard: {
    maxWidth: "420px",
    margin: "0 auto 32px auto",
    backgroundColor: "#020617",
    borderRadius: "12px",
    border: "1px solid #1F2937",
    padding: "14px 16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  },
  vypeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  vypeTitle: {
    fontSize: "13px",
    fontWeight: 600,
  },
  vypeChange: {
    fontSize: "11px",
    color: "#4ADE80",
  },
  vypeText: {
    fontSize: "12px",
    color: "#D1D5DB",
    marginTop: "2px",
  },
  vypeNoteRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    marginTop: "10px",
    color: "#9CA3AF",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#4ADE80",
  },
};

export default function Portfolio() {
  // 🔹 stats + holdings rows ke liye state
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: "₹19,346",
    totalAssets: 4,
  });
  const [rows, setRows] = useState(holdingsData);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const { data } = await getPortfolio();

        if (data && Array.isArray(data.holdings) && data.holdings.length > 0) {
          let totalVal = 0;

          const mapped = data.holdings.map((h) => {
            const symbol = h.symbol || h.asset || "";
            const qty = h.qty || h.quantity || 0;

            const meta = INITIAL_STOCKS.find((s) => s.symbol === symbol);
            const price = meta
              ? meta.price
              : h.currentPrice || h.avgPrice || 0;

            const valNum = price * qty;
            totalVal += valNum;

            return {
              asset: symbol,
              quantity: qty,
              value: formatINR(valNum),
              change: h.change || "—",
              type: h.type || "Stock",
            };
          });

          setRows(mapped);
          setPortfolioStats({
            totalValue: formatINR(totalVal),
            totalAssets: mapped.length,
          });
        }
      } catch (err) {
        console.error("Error loading portfolio:", err);
        // error pe fallback old demo data hi rahega
      }
    };

    loadPortfolio();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Title */}
        <div style={styles.titleBox}>
          <h1 style={styles.mainTitle}>Portfolio Analytics</h1>
          <p style={styles.subTitle}>
            Visual insights into your portfolio performance and allocation.
          </p>
        </div>

        {/* Row 1: Four stat cards */}
        <div style={styles.statGrid}>
          {/* Total Value */}
          <div style={styles.card}>
            <p style={styles.cardLabel}>Total Value</p>
            <p style={styles.cardValue}>{portfolioStats.totalValue}</p>
            <p style={styles.cardChange}>+102.64%</p>
            <p style={styles.cardSmall}>Current portfolio value</p>
          </div>

          {/* Total Assets */}
          <div style={styles.card}>
            <p style={styles.cardLabel}>Total Assets</p>
            <p style={styles.cardValue}>{portfolioStats.totalAssets}</p>
            <p style={styles.cardSmall}>Stocks &amp; ETFs in portfolio</p>
          </div>

          {/* Portfolio Risk */}
          <div style={styles.card}>
            <p style={styles.cardLabel}>Portfolio Risk</p>
            <p style={styles.cardValue}>6.5 / 10</p>
            <p style={styles.cardSmall}>Risk score based on volatility</p>
          </div>

          {/* Health Score */}
          <div style={styles.card}>
            <p style={styles.cardLabel}>Health Score</p>
            <p style={styles.cardValue}>82%</p>
            <p style={styles.cardSmall}>Overall portfolio health</p>
          </div>
        </div>

        {/* Row 2: Performance + Allocation */}
        <div style={styles.midRow}>
          {/* Performance (left, big) */}
          <div style={styles.midCard}>
            <div style={styles.midHeader}>
              <span style={styles.midTitle}>Portfolio Performance</span>
              <span style={styles.midSub}>Last 10 days</span>
            </div>
            <div style={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #1F2937",
                      fontSize: 11,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Allocation (right, small) */}
          <div style={styles.midCard}>
            <div style={styles.midHeader}>
              <span style={styles.midTitle}>Allocation Overview</span>
            </div>
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={ALLOCATION_COLORS[index % ALLOCATION_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #1F2937",
                      fontSize: 11,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "#E5E7EB" }}
                    verticalAlign="bottom"
                    height={24}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p style={styles.allocNote}>Stocks: 72% · Others: 28% of portfolio</p>
          </div>
        </div>

        {/* Row 3: Holdings Breakdown full width */}
        <div style={styles.tableCard}>
          <h2 style={styles.tableTitle}>Holdings Breakdown</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Asset</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Current Value</th>
                <th style={styles.th}>% Change</th>
                <th style={styles.th}>Type</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.asset}>
                  <td style={styles.td}>{row.asset}</td>
                  <td style={styles.td}>{row.quantity}</td>
                  <td style={styles.td}>{row.value}</td>
                  <td style={{ ...styles.td, ...styles.greenText }}>{row.change}</td>
                  <td style={styles.td}>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Row 4: VYPE detail card (demo highlight, optional static) */}
        <div style={styles.vypeCard}>
          <div style={styles.vypeHeader}>
            <span style={styles.vypeTitle}>VYPE</span>
            <span style={styles.vypeChange}>+1.55%</span>
          </div>
          <p style={styles.vypeText}>Quantity: 100</p>
          <p style={styles.vypeText}>Value: ₹19,346</p>
          <div style={styles.vypeNoteRow}>
            <span style={styles.dot} />
            <span>Stable performance — good long term holding.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
