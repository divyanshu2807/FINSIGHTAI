import React from "react";

const PricingSection = () => {
  const styles = {
    section: {
      width: "100%",
      padding: "70px 20px 80px",
      background: "linear-gradient(135deg, #020617, #020b3b 70%)",
      color: "#ffffff",
      display: "flex",
      justifyContent: "center",
    },
    inner: {
      width: "100%",
      maxWidth: "1100px",
      textAlign: "center",
    },
    heading: {
      fontSize: "2.4rem",
      fontWeight: 800,
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#cbd5f5",
      marginBottom: "40px",
    },
    cardsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "26px",
      alignItems: "stretch",
    },
    cardBase: {
      borderRadius: "18px",
      background: "#020617",
      border: "1px solid #1f2937",
      padding: "26px 24px 24px",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      transition: "all 0.22s ease-out",
      minHeight: "360px",
    },
    planName: {
      fontSize: "1.05rem",
      fontWeight: 600,
      marginBottom: "8px",
      color: "#e5e7eb",
    },
    priceRow: {
      fontSize: "1.9rem",
      fontWeight: 800,
      marginBottom: "6px",
    },
    perMonth: {
      fontSize: "1.1rem",
      fontWeight: 600,
      marginLeft: "4px",
    },
    shortDesc: {
      fontSize: "0.9rem",
      color: "#cbd5f5",
      marginBottom: "18px",
      lineHeight: 1.6,
    },
    featuresList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      fontSize: "0.9rem",
      color: "#d1d5db",
      lineHeight: 1.7,
      flexGrow: 1,
    },
    featureItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "6px",
    },
    check: {
      color: "#22c55e",
      fontSize: "0.95rem",
      marginRight: "6px",
      marginTop: "1px",
    },
    cardButton: {
      marginTop: "18px",
      padding: "10px 20px",
      borderRadius: "999px",
      border: "1px solid #22c55e",
      background: "transparent",
      color: "#22c55e",
      fontSize: "0.95rem",
      fontWeight: 600,
      cursor: "pointer",
      alignSelf: "flex-start",
      transition: "all 0.18s ease-out",
    },
    middleButton: {
      borderColor: "#8b5cf6",
      color: "#e5e7eb",
      background:
        "radial-gradient(circle at top, rgba(139,92,246,0.25), transparent), #111827",
    },
    rightButton: {
      borderColor: "#ec4899",
      color: "#f9a8d4",
      background: "transparent",
    },
    // Recommended pill for middle card
    pill: {
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, -50%)",
      top: 0,
      padding: "5px 16px",
      borderRadius: "999px",
      background: "#a855f7",
      color: "#f9fafb",
      fontSize: "0.75rem",
      fontWeight: 600,
      boxShadow: "0 10px 25px rgba(168,85,247,0.4)",
    },
  };

  // hover helpers for inline style
  const onHoverBtn = (e, bg, scale = 1.02) => {
    e.currentTarget.style.transform = `translateY(-1px) scale(${scale})`;
    e.currentTarget.style.background = bg;
  };
  const onLeaveBtn = (e, baseBg = "transparent") => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.background = baseBg;
  };

  return (
    <section id="pricing" style={styles.section}>
      <div style={styles.inner}>
        <h2 style={styles.heading}>Choose Your Plan</h2>
        <p style={styles.subtitle}>
          Experience the power of AI-driven investing — start for free or go pro
          anytime.
        </p>

        <div style={styles.cardsRow}>
          {/* FREE PLAN */}
          <div
            style={{
              ...styles.cardBase,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 14px 30px rgba(15,23,42,0.75)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>
              <div style={styles.planName}>Free / Starter Plan</div>
              <div style={styles.priceRow}>
                <span style={{ color: "#22c55e" }}>₹0</span>
                <span style={{ ...styles.perMonth, color: "#22c55e" }}>
                  {" "}
                  /month
                </span>
              </div>
              <div style={styles.shortDesc}>
                Perfect for beginners exploring AI-based trading.
              </div>

              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Access to AI Predictions (5 stocks/day)</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Basic Risk Profiler</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Learning Hub (2 free courses)</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Virtual Trading with ₹10,000 demo money</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Email Support</span>
                </li>
              </ul>
            </div>

            <button
              style={styles.cardButton}
              onMouseEnter={(e) =>
                onHoverBtn(e, "rgba(34,197,94,0.1)")
              }
              onMouseLeave={(e) => onLeaveBtn(e)}
            >
              Get Started (Free)
            </button>
          </div>

          {/* PRO PLAN (RECOMMENDED) */}
          <div
            style={{
              ...styles.cardBase,
              position: "relative",
              borderColor: "#8b5cf6",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              background:
                "radial-gradient(circle at top, rgba(139,92,246,0.18), transparent 60%), #020617",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 18px 45px rgba(88,28,135,0.8)";
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={styles.pill}>Recommended</div>

            <div>
              <div style={styles.planName}>Pro Trader</div>
              <div style={styles.priceRow}>
                <span style={{ color: "#a855f7" }}>₹499</span>
                <span
                  style={{ ...styles.perMonth, color: "#a855f7" }}
                >
                  {" "}
                  /month
                </span>
              </div>
              <div style={styles.shortDesc}>
                For serious traders who want real-time AI assistance.
              </div>

              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Unlimited AI Predictions</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Advanced Risk Profiler</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Full Learning Hub Access</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Goal Planning Tools</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Virtual Trading (₹1,00,000 demo)</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>AI Chatbot (24/7)</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Priority Email & Chat Support</span>
                </li>
              </ul>
            </div>

            <button
              style={{ ...styles.cardButton, ...styles.middleButton }}
              onMouseEnter={(e) =>
                onHoverBtn(
                  e,
                  "linear-gradient(90deg,#8b5cf6,#ec4899)",
                  1.03
                )
              }
              onMouseLeave={(e) =>
                onLeaveBtn(
                  e,
                  "radial-gradient(circle at top, rgba(139,92,246,0.25), transparent), #111827"
                )
              }
            >
              Upgrade to Pro
            </button>
          </div>

          {/* ELITE PLAN */}
          <div
            style={{
              ...styles.cardBase,
              borderColor: "#ec4899",
              boxShadow: "0 0 25px rgba(236,72,153,0.55)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 22px 55px rgba(236,72,153,0.75)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(236,72,153,0.55)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>
              <div style={styles.planName}>Elite Investor</div>
              <div style={styles.priceRow}>
                <span style={{ color: "#ec4899" }}>₹999</span>
                <span
                  style={{ ...styles.perMonth, color: "#ec4899" }}
                >
                  {" "}
                  /month
                </span>
              </div>
              <div style={styles.shortDesc}>
                For institutions or advanced investors needing deep insights.
              </div>

              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Everything in Pro +</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>API Access for Algorithmic Trading</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>AI-powered Portfolio Optimizer</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>
                    Personalized Investment Coach (1-on-1 AI Advisor)
                  </span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Advanced Analytics Dashboard</span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.check}>✔</span>
                  <span>Dedicated Support Team</span>
                </li>
              </ul>
            </div>

            <button
              style={{ ...styles.cardButton, ...styles.rightButton }}
              onMouseEnter={(e) =>
                onHoverBtn(e, "rgba(236,72,153,0.12)")
              }
              onMouseLeave={(e) => onLeaveBtn(e)}
            >
              Contact Sales / Get Demo
            </button>
          </div>
        </div>

        {/* Optional footer text under cards */}
        <p
          style={{
            marginTop: "32px",
            fontSize: "0.85rem",
            color: "#94a3b8",
          }}
        >
          FinsightAI is committed to democratizing finance — all features are
          free to use.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
