// src/landing_page/OurFeaturesSection.js
import React from "react";

const OurFeaturesSection = React.forwardRef((props, ref) => {
  const styles = {
    section: {
      width: "100%",
      maxWidth: "1200px",
      margin: "40px auto 100px",   // ⭐ FOOTER se distance BADHAYA
      padding: "10px",
      textAlign: "center",
      color: "white",
    },
    heading: {
      fontSize: "2.2rem",
      fontWeight: "700",
      marginBottom: "8px",
    },
    subtitle: {
      color: "#cbd5f5",
      marginBottom: "30px",
      fontSize: "1.05rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "30px",
    },
    card: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: "20px",
      padding: "30px 34px",
      border: "1px solid rgba(255,255,255,0.08)",
      textAlign: "left",
      minHeight: "190px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    iconBox: {
      width: "52px",
      height: "52px",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
      background: "rgba(37,99,235,0.12)",
    },
    title: {
      fontSize: "1.15rem",
      fontWeight: "600",
      marginBottom: "6px",
    },
    desc: {
      color: "#cbd5f5",
      fontSize: "0.95rem",
      lineHeight: 1.55,
    },
  };

  return (
    <section style={styles.section} ref={ref}>
      <h2 style={styles.heading}>Our Features</h2>
      <p style={styles.subtitle}>
        Discover the Full Range of FinsightAI&apos;s Intelligent Features
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.iconBox}>📈</div>
          <div>
            <h3 style={styles.title}>AI Predictions</h3>
            <p style={styles.desc}>
              Smart buy/sell signals with confidence score.
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>🛡️</div>
          <div>
            <h3 style={styles.title}>Risk Profiler</h3>
            <p style={styles.desc}>
              Personalized risk analysis to guide safer investments.
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>🎓</div>
          <div>
            <h3 style={styles.title}>Learning Hub</h3>
            <p style={styles.desc}>
              Interactive courses, videos, and quizzes.
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>🎯</div>
          <div>
            <h3 style={styles.title}>Goal Planning</h3>
            <p style={styles.desc}>
              Plan for retirement, house, or car with AI-backed projections.
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>💸</div>
          <div>
            <h3 style={styles.title}>Virtual Trading</h3>
            <p style={styles.desc}>
              ₹1,00,000 demo money to practice trading without risk.
            </p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>🤖</div>
          <div>
            <h3 style={styles.title}>AI Chatbot</h3>
            <p style={styles.desc}>
              24/7 virtual assistant to solve your investing doubts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default OurFeaturesSection;