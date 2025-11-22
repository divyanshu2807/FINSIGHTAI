// src/landing_page/ProductSection.js
import React from "react";

const ProductSection = () => {
  const styles = {
    section: {
      width: "100%",
      minHeight: "100vh",
      padding: "90px 20px 80px",
      display: "flex",
      justifyContent: "center",
      background: "linear-gradient(135deg, #020617, #020b3b 70%)",
      color: "#f9fafb",
      boxSizing: "border-box",
    },
    inner: {
      width: "100%",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px 12px",
      borderRadius: "999px",
      background: "rgba(37,99,235,0.12)",
      border: "1px solid rgba(59,130,246,0.5)",
      fontSize: "0.75rem",
      color: "#bfdbfe",
      marginBottom: "14px",
    },
    badgeDot: {
      width: "7px",
      height: "7px",
      borderRadius: "999px",
      background: "#22c55e",
    },
    heading: {
      fontSize: "2.6rem",
      fontWeight: 800,
      marginBottom: "10px",
    },
    highlight: {
      background:
        "linear-gradient(90deg, #22c55e, #38bdf8, #a855f7, #ec4899)",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
    subText: {
      fontSize: "1rem",
      color: "#cbd5e1",
      maxWidth: "620px",
      lineHeight: 1.7,
      marginBottom: "34px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
      gap: "32px",
      alignItems: "stretch",
    },
    leftCard: {
      borderRadius: "22px",
      padding: "26px 24px",
      background:
        "radial-gradient(circle at top left, rgba(56,189,248,0.28), transparent 55%), rgba(15,23,42,0.98)",
      border: "1px solid rgba(148,163,184,0.45)",
      boxShadow: "0 22px 55px rgba(15,23,42,0.9)",
      boxSizing: "border-box",
      minHeight: "320px",
      display: "flex",
      flexDirection: "column",
    },
    leftTitle: {
      fontSize: "1.35rem",
      fontWeight: 700,
      marginBottom: "10px",
    },
    leftLabel: {
      fontSize: "0.85rem",
      color: "#a5b4fc",
      marginBottom: "18px",
    },
    chipsRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "18px",
    },
    chip: {
      padding: "4px 10px",
      borderRadius: "999px",
      background: "rgba(30,64,175,0.55)",
      border: "1px solid rgba(59,130,246,0.7)",
      fontSize: "0.75rem",
      color: "#dbeafe",
    },
    timeline: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      borderLeft: "1px solid rgba(148,163,184,0.45)",
      paddingLeft: "16px",
      flexGrow: 1,
    },
    step: {
      marginBottom: "14px",
      position: "relative",
    },
    bullet: {
      width: "9px",
      height: "9px",
      borderRadius: "50%",
      background: "#38bdf8",
      position: "absolute",
      left: "-20px",
      top: "4px",
      boxShadow: "0 0 12px rgba(56,189,248,0.8)",
    },
    stepTitle: {
      fontSize: "0.98rem",
      fontWeight: 600,
      marginBottom: "2px",
    },
    stepText: {
      fontSize: "0.9rem",
      color: "#cbd5e1",
    },
    rightCard: {
      borderRadius: "22px",
      padding: "24px 20px",
      background: "rgba(15,23,42,0.96)",
      border: "1px solid rgba(148,163,184,0.4)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "320px",
      boxSizing: "border-box",
    },
    rightTitle: {
      fontSize: "1.1rem",
      fontWeight: 700,
      marginBottom: "6px",
    },
    rightDesc: {
      fontSize: "0.9rem",
      color: "#d1d5db",
      marginBottom: "14px",
      lineHeight: 1.6,
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      rowGap: "10px",
      marginBottom: "16px",
    },
    featureRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.85rem",
      color: "#cbd5e1",
    },
    pillSmall: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "0.7rem",
      background: "rgba(34,197,94,0.12)",
      color: "#bbf7d0",
      border: "1px solid rgba(34,197,94,0.5)",
      marginBottom: "10px",
    },
    ctaRow: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "8px",
    },
    primaryBtn: {
      padding: "9px 16px",
      borderRadius: "999px",
      border: "none",
      background:
        "linear-gradient(90deg, #22c55e, #22c55e, #16a34a)",
      color: "#020617",
      fontSize: "0.9rem",
      fontWeight: 700,
      cursor: "pointer",
      textAlign: "center",
    },
    secondaryText: {
      fontSize: "0.8rem",
      color: "#9ca3af",
    },
    secondaryLink: {
      color: "#bfdbfe",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.badge}>
          <span style={styles.badgeDot}></span>
          FinsightAI Product Suite
        </div>

        <h2 style={styles.heading}>
          One AI-first platform for{" "}
          <span style={styles.highlight}>learning, trading & risk.</span>
        </h2>

        <p style={styles.subText}>
          FinsightAI combines an AI Predictor, virtual trading, risk profiling,
          and a learning hub into a single experience — so you can test, learn
          and invest smarter, without switching tools.
        </p>

        <div style={styles.grid}>
          {/* LEFT: main flow / product story */}
          <div style={styles.leftCard}>
            <div style={styles.leftLabel}>How the product works</div>
            <div style={styles.leftTitle}>
              From first trade to confident investing — in 4 steps.
            </div>

            <div style={styles.chipsRow}>
              <span style={styles.chip}>AI Predictor</span>
              <span style={styles.chip}>Virtual Money</span>
              <span style={styles.chip}>Risk Profiler</span>
              <span style={styles.chip}>Learning Hub</span>
            </div>

            <ul style={styles.timeline}>
              <li style={styles.step}>
                <span style={styles.bullet}></span>
                <div style={styles.stepTitle}>
                  1. Discover opportunities with AI.
                </div>
                <div style={styles.stepText}>
                  FinsightAI scans the market and highlights stocks likely to
                  move, with confidence scores and tomorrow’s prediction.
                </div>
              </li>

              <li style={styles.step}>
                <span style={styles.bullet}></span>
                <div style={styles.stepTitle}>
                  2. Practice safely with virtual money.
                </div>
                <div style={styles.stepText}>
                  Test ideas in our virtual trading simulator using demo
                  balance, live-like prices, and portfolio tracking.
                </div>
              </li>

              <li style={styles.step}>
                <span style={styles.bullet}></span>
                <div style={styles.stepTitle}>
                  3. Understand your risk profile.
                </div>
                <div style={styles.stepText}>
                  Answer simple questions and let FinsightAI map your risk
                  level — from conservative to aggressive.
                </div>
              </li>

              <li style={styles.step}>
                <span style={styles.bullet}></span>
                <div style={styles.stepTitle}>
                  4. Learn as you go, guided by AI.
                </div>
                <div style={styles.stepText}>
                  Interactive courses, quizzes, and an AI tutor help you
                  translate every trade into a learning moment.
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT: quick product stats / modules */}
          <div style={styles.rightCard}>
            <div>
              <span style={styles.pillSmall}>Live in your browser</span>
              <div style={styles.rightTitle}>What’s inside FinsightAI?</div>
              <div style={styles.rightDesc}>
                All the tools you need to understand markets, practice trading,
                and use AI in every step — bundled into one unified dashboard.
              </div>

              <div style={styles.featuresGrid}>
                <div style={styles.featureRow}>
                  <span>AI Stock Predictor</span>
                  <span>Real-time calls</span>
                </div>
                <div style={styles.featureRow}>
                  <span>Virtual Money Trading</span>
                  <span>Demo wallet + P&L</span>
                </div>
                <div style={styles.featureRow}>
                  <span>Risk Profiler</span>
                  <span>Dynamic scoring</span>
                </div>
                <div style={styles.featureRow}>
                  <span>Learning Hub</span>
                  <span>Guided by AI</span>
                </div>
                <div style={styles.featureRow}>
                  <span>Portfolio Overview</span>
                  <span>Holdings + insights</span>
                </div>
              </div>
            </div>

            <div style={styles.ctaRow}>
              <button style={styles.primaryBtn}>
                Explore the FinsightAI Dashboard
              </button>
              <div style={styles.secondaryText}>
                No brokerage required. Try it free, then connect real money
                when you’re ready.{" "}
                <span style={styles.secondaryLink}>
                  See how it works →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
