import React from "react";

const FeaturesSection = () => {
  const styles = {
    section: {
      width: "100%",
      minHeight: "100vh",
      padding: "100px 20px 60px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#020617",
      backgroundImage:
        "linear-gradient(135deg, rgba(2,6,23,0.98), rgba(2,6,23,0.95)), url('/media/.finsight-image1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
    },

    inner: {
      width: "100%",
      maxWidth: "1200px", // enough space for 3 cards in one row
      margin: "0 auto",
      textAlign: "center",
    },

    heading: {
      fontSize: "2.4rem",
      fontWeight: "800",
      marginBottom: "8px",
    },

    subtitle: {
      color: "#cbd5e1",
      maxWidth: "680px",
      margin: "0 auto 28px",
      lineHeight: "1.6",
      fontSize: "1rem",
    },

    cardsWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "32px",       // ⭐ more gap but equal
      flexWrap: "nowrap", // ⭐ wrap band so wo neeche nahi jayega
      marginTop: "20px",
    },

    card: {
      width: "360px",     // ⭐ slightly wider
      minHeight: "270px", // ⭐ same height for all 3, stable layout
      padding: "28px 26px",
      borderRadius: "20px",
      background: "rgba(15,23,42,0.92)",
      border: "1px solid rgba(148,163,184,0.25)",
      backdropFilter: "blur(10px)",
      transition: "all 0.2s ease-out",
      textAlign: "left",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      flexShrink: 0,     // ⭐ card kabhi chota nahi hoga
    },

    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 18px 40px rgba(15,23,42,0.8)",
      borderColor: "#3b82f6",
    },

    icon: {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      marginBottom: "18px",
    },

    title: {
      fontSize: "1.30rem",
      fontWeight: "600",
      marginBottom: "14px",
    },

    list: {
      color: "#cbd5e1",
      fontSize: "1rem",
      lineHeight: "1.6",
      paddingLeft: "18px",
    },

    btnWrapper: {
      marginTop: "32px",
    },

    button: {
      padding: "12px 30px",
      borderRadius: "999px",
      background: "#2563eb",
      color: "white",
      border: "none",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.18s ease-out",
      boxShadow: "0 0 0 rgba(37,99,235,0)",
    },
  };

  const handleCardEnter = (e) => {
    e.currentTarget.style.transform = styles.cardHover.transform;
    e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
    e.currentTarget.style.borderColor = styles.cardHover.borderColor;
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = styles.card.boxShadow;
    e.currentTarget.style.borderColor = "rgba(148,163,184,0.25)";
  };

  const handleButtonEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#1d4ed8";
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 14px 30px rgba(37,99,235,0.4)";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#2563eb";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = styles.button.boxShadow;
  };

  return (
    <section style={styles.section} id="learn">
      <div style={styles.inner}>
        <h2 style={styles.heading}>Learn. Practice. Master AI Trading.</h2>

        <p style={styles.subtitle}>
          Build your trading skills through our interactive learning hub powered
          by AI — from fundamentals to pro-level insights.
        </p>

        <div style={styles.cardsWrapper}>
          {/* CARD 1 */}
          <div
            style={{ ...styles.card }}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div style={{ ...styles.icon, background: "#3b82f6" }}></div>
            <h3 style={styles.title}>Interactive Courses</h3>
            <ul style={styles.list}>
              <li>Learn Stock Market Basics & AI trading tactics.</li>
              <li>Beginner to Advanced Levels.</li>
              <li>Short 5–15 min video lessons.</li>
              <li>AI recommends what to learn next.</li>
            </ul>
          </div>

          {/* CARD 2 */}
          <div
            style={{ ...styles.card }}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div style={{ ...styles.icon, background: "#facc15" }}></div>
            <h3 style={styles.title}>Virtual Trading Simulator</h3>
            <ul style={styles.list}>
              <li>₹100,000 demo balance to practice real strategies.</li>
              <li>Live market data simulation.</li>
              <li>Compete on leaderboard.</li>
              <li>Zero risk — only pure learning.</li>
            </ul>
          </div>

          {/* CARD 3 */}
          <div
            style={{ ...styles.card }}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div style={{ ...styles.icon, background: "#e879f9" }}></div>
            <h3 style={styles.title}>AI Learning Assistant</h3>
            <ul style={styles.list}>
              <li>AI explains trading concepts instantly.</li>
              <li>Personalized learning feedback.</li>
              <li>Quizzes & skill tracking.</li>
              <li>Smart course suggestions.</li>
            </ul>
          </div>
        </div>

        <div style={styles.btnWrapper}>
          <button
            style={styles.button}
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
          >
            Start Learning Now (Free)
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
