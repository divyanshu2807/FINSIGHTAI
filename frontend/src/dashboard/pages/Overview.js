// src/dashboard/pages/Overview.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const theme = {
  pageTop: "#0A0E19",
  pageBottom: "#121826",
  accent: "#18C8FF",
  textPrimary: "#FFFFFF",
  textMuted: "#D4E3FF",
  success: "#32CD32",
  danger: "#DC143C",
  gold: "#FFD700",
};

export default function Overview() {
  const [portfolio] = useState({
    totalValue: "₹ 4,52,300",
    changePercent: "+2.8",
    invested: "₹ 3,90,000",
  });

  const [predictions] = useState([
    { symbol: "TCS", rec: "Buy", score: 0.82 },
    { symbol: "RELIANCE", rec: "Hold", score: 0.64 },
    { symbol: "INFY", rec: "Buy", score: 0.77 },
  ]);

  const [chartData, setChartData] = useState([
    { day: "Mon", value: 420 },
    { day: "Tue", value: 480 },
    { day: "Wed", value: 510 },
    { day: "Thu", value: 460 },
    { day: "Fri", value: 530 },
    { day: "Sat", value: 580 },
    { day: "Sun", value: 620 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) =>
        prev.map((d) => ({
          ...d,
          value: Math.max(
            400,
            Math.min(650, d.value + (Math.random() * 40 - 20))
          ),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // floating particles CSS
  useEffect(() => {
    const styleId = "overview-floating-particles-style";
    if (document.getElementById(styleId)) return;

    const styleSheet = document.createElement("style");
    styleSheet.id = styleId;
    styleSheet.innerText = `
      .floating-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .floating-particles .particle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(24,200,255,0.6);
        border-radius: 50%;
        animation: float 10s linear infinite.
      }
      @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: 0.6; }
        50% { transform: translateY(-80px) scale(1.3); opacity: 1; }
        100% { transform: translateY(0) scale(1); opacity: 0.6; }
      }
      .floating-particles .particle:nth-child(odd) {
        background: rgba(255,215,0,0.5);
        animation-duration: 12s;
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const tickerData = [
    { symbol: "TCS", change: "+1.4%" },
    { symbol: "RELIANCE", change: "-0.6%" },
    { symbol: "INFY", change: "+0.9%" },
    { symbol: "HDFC", change: "+1.2%" },
    { symbol: "SBIN", change: "-0.3%" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        color: theme.textPrimary,
        background: `
          linear-gradient(rgba(10,14,25,0.9), rgba(18,22,35,0.92)),
          url("/media/img finsight14.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating particles in background */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* 🔹 Live Market Ticker */}
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            background: "rgba(18,22,38,0.8)",
            borderBottom: "1px solid rgba(24,200,255,0.2)",
            fontSize: 14,
            padding: "6px 0",
          }}
        >
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            {tickerData.map((t, i) => (
              <span
                key={i}
                style={{
                  marginRight: 40,
                  color: t.change.startsWith("+")
                    ? theme.success
                    : theme.danger,
                }}
              >
                {t.symbol} {t.change}
              </span>
            ))}
          </motion.div>
        </div>

        {/* 👇 Content container – padding balanced */}
        <main
          style={{
            padding: "32px 40px 40px 40px", // top, right, bottom, left
            maxWidth: "100%",
            margin: 0,
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 32,
              margin: "10px 0 10px 0",
              color: theme.textPrimary,
              textShadow: "0 0 12px rgba(255,255,255,0.25)",
            }}
          >
            Overview
          </motion.h1>

          {/* Animated Divider */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              height: "3px",
              width: "160px",
              background:
                "linear-gradient(90deg, #18C8FF, #32CD32, #FFD700, #18C8FF)",
              backgroundSize: "300% 100%",
              marginBottom: "40px",
              borderRadius: "2px",
            }}
          />

          {/* --- Cards Section --- */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
              gap: 40,
              marginBottom: 70,
            }}
          >
            {/* Portfolio Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(24,200,255,0.15)",
              }}
              style={cardStyle(theme)}
            >
              <div style={{ fontSize: 18, color: theme.textMuted }}>
                Portfolio Value
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: theme.accent,
                  textShadow: "0 0 14px rgba(24,200,255,0.6)",
                }}
              >
                {portfolio.totalValue}
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={theme.accent}
                    strokeWidth={2.2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div
                style={{
                  fontSize: 15,
                  color: theme.textMuted,
                  marginTop: 10,
                }}
              >
                +{portfolio.changePercent}% this week
              </div>
            </motion.div>

            {/* Predictions Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(24,200,255,0.15)",
              }}
              style={cardStyle(theme)}
            >
              <div
                style={{
                  fontSize: 19,
                  color: theme.textMuted,
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                Today&apos;s AI Predictions
              </div>
              {predictions.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 21 }}>
                      {p.symbol}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        color: theme.textMuted,
                      }}
                    >
                      Confidence: {(p.score * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      color:
                        p.rec === "Buy"
                          ? theme.success
                          : p.rec === "Hold"
                          ? theme.gold
                          : theme.danger,
                      padding: "9px 15px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {p.rec}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Chart Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
            style={{ ...cardStyle(theme), minHeight: 420 }}
          >
            <div
              style={{
                fontSize: 19,
                color: theme.textMuted,
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Market Performance (7d)
            </div>
            <ResponsiveContainer width="100%" height={310}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: theme.textMuted, fontSize: 12 }}
                />
                <YAxis tick={{ fill: theme.textMuted, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(18,22,38,0.9)",
                    border: "1px solid rgba(24,200,255,0.3)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  fill="rgba(24,200,255,0.2)"
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Floating AI Insights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            custom={3}
            style={{ ...insightCardStyle(theme), marginTop: 40 }}
          >
            <h3
              style={{
                color: theme.accent,
                fontSize: 22,
                marginBottom: 20,
              }}
            >
              AI Insights Summary
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {/* Circular Dial with Breathing Animation */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{ width: 110, height: 110 }}
              >
                <CircularProgressbar
                  value={81}
                  text={`81%`}
                  styles={buildStyles({
                    textColor: theme.textPrimary,
                    pathColor: theme.accent,
                    trailColor: "rgba(255,255,255,0.1)",
                  })}
                />
              </motion.div>

              {/* Mini Cards with Glow Pulse */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  {
                    title: "Top Gainers",
                    value: "TCS",
                    sub: "+2.8%",
                    color: theme.success,
                  },
                  {
                    title: "Top Losers",
                    value: "RELIANCE",
                    sub: "-1.2%",
                    color: theme.danger,
                  },
                ].map((mini, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        `0 0 10px ${mini.color}40`,
                        `0 0 20px ${mini.color}70`,
                        `0 0 10px ${mini.color}40`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={miniCard(theme, mini.color)}
                  >
                    <h4 style={miniHeader(theme)}>{mini.title}</h4>
                    <p style={miniValue(theme)}>{mini.value}</p>
                    <p style={miniSub(theme, mini.color)}>{mini.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Section */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
            style={{ marginTop: 80 }}
          >
            <div
              style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}
            >
              Recent Activity
            </div>
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                height: "3px",
                width: "160px",
                background:
                  "linear-gradient(90deg, #18C8FF, #FFD700, #18C8FF)",
                backgroundSize: "300% 100%",
                marginBottom: "20px",
                borderRadius: "2px",
              }}
            />
            <motion.div
              whileHover={{ scale: 1.01 }}
              style={{ ...cardStyle(theme), padding: 28 }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: theme.textPrimary,
                  fontSize: 16,
                }}
              >
                <thead style={{ color: theme.textMuted }}>
                  <tr>
                    <th style={{ padding: "12px 8px" }}>Time</th>
                    <th style={{ padding: "12px 8px" }}>Symbol</th>
                    <th style={{ padding: "12px 8px" }}>Type</th>
                    <th style={{ padding: "12px 8px" }}>Amount</th>
                    <th style={{ padding: "12px 8px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: theme.textMuted,
                      }}
                    >
                      10:42
                    </td>
                    <td style={{ padding: "12px 8px" }}>TCS</td>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: theme.success,
                      }}
                    >
                      Buy
                    </td>
                    <td style={{ padding: "12px 8px" }}>₹ 45,000</td>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: theme.accent,
                      }}
                    >
                      Done
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: theme.textMuted,
                      }}
                    >
                      09:05
                    </td>
                    <td style={{ padding: "12px 8px" }}>INFY</td>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: theme.danger,
                      }}
                    >
                      Sell
                    </td>
                    <td style={{ padding: "12px 8px" }}>₹ 15,200</td>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: theme.gold,
                      }}
                    >
                      Pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

/* --- Styles --- */
const cardStyle = (theme) => ({
  background:
    "linear-gradient(145deg, rgba(12,16,28,0.88), rgba(18,22,38,0.85))",
  borderRadius: 20,
  padding: 34,
  border: "1px solid rgba(24,200,255,0.18)",
  boxShadow: "0 10px 30px rgba(24,200,255,0.1)",
  backdropFilter: "blur(14px)",
});

const insightCardStyle = (theme) => ({
  background:
    "linear-gradient(160deg, rgba(12,16,28,0.9), rgba(18,22,38,0.86))",
  borderRadius: 20,
  padding: 34,
  border: "1px solid rgba(24,200,255,0.2)",
  boxShadow: "0 0 30px rgba(24,200,255,0.12)",
  backdropFilter: "blur(18px)",
});

const miniCard = (theme, color) => ({
  background: "rgba(20,28,45,0.8)",
  border: `1px solid ${color}40`,
  borderRadius: 14,
  padding: "14px 18px",
  boxShadow: `0 0 15px ${color}30`,
  textAlign: "center",
  minWidth: 120,
});

const miniHeader = (theme) => ({
  fontSize: 13,
  color: theme.textMuted,
  marginBottom: 6,
  fontWeight: 600,
  textTransform: "uppercase",
});

const miniValue = (theme) => ({
  fontSize: 20,
  fontWeight: 800,
  color: theme.accent,
});

const miniSub = (theme, color) => ({
  fontSize: 14,
  marginTop: 4,
  color,
  fontWeight: 600,
});
