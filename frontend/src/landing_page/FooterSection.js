// src/landing_page/FooterSection.js
import React from "react";

const FooterSection = () => {
  const styles = {
    outer: {
      width: "100%",
      marginTop: "120px",          // ⭐ pehle 80px tha, ab Our Features se gap zyada
      padding: "60px 20px 40px",
      color: "white",
    },
    inner: {
      maxWidth: "1100px",
      margin: "0 auto",
      textAlign: "center",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
      marginBottom: "10px",
    },
    subtext: {
      color: "#cbd5f5",
      fontSize: "0.95rem",
      marginBottom: "26px",
    },
    badgeRow: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "40px",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 14px",
      borderRadius: "999px",
      border: "1px solid rgba(148,163,184,0.6)",
      fontSize: "0.85rem",
      color: "#e5e7eb",
      background: "rgba(15,23,42,0.7)",
    },
    badgeIconBox: {
      width: "22px",
      height: "22px",
      borderRadius: "8px",
      border: "1px solid rgba(148,163,184,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.8rem",
    },
    footerTopBorder: {
      marginTop: "24px",
      marginBottom: "24px",
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(148,163,184,0.5), transparent)",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "28px",
      textAlign: "left",
      fontSize: "0.9rem",
    },
    columnTitle: {
      fontWeight: 600,
      marginBottom: "10px",
      color: "#e5e7eb",
      textTransform: "uppercase",
      fontSize: "0.8rem",
      letterSpacing: "0.08em",
    },
    link: {
      color: "#cbd5f5",
      marginBottom: "6px",
      cursor: "pointer",
    },
    linkMuted: {
      color: "#94a3b8",
      marginBottom: "6px",
      cursor: "pointer",
    },
  };

  return (
    <footer style={styles.outer}>
      <div style={styles.inner}>
        {/* Tagline */}
        <h2 style={styles.heading}>
          FinsightAI is committed to
          <br />
          democratizing financial insights
          <br />
          for all.
        </h2>
        <p style={styles.subtext}>
          Our advanced AI-powered features are completely
          <br />
          free to use.
        </p>

        {/* Badges */}
        <div style={styles.badgeRow}>
          <div style={styles.badge}>
            <div style={styles.badgeIconBox}>🤖</div>
            <span>AI</span>
          </div>
          <div style={styles.badge}>
            <div style={styles.badgeIconBox}>⚡</div>
            <span>AI-Powered</span>
          </div>
          <div style={styles.badge}>
            <div style={styles.badgeIconBox}>✔</div>
            <span>Secure</span>
          </div>
          <div style={styles.badge}>
            <div style={styles.badgeIconBox}>◎</div>
            <span>Verified</span>
          </div>
        </div>

        <div style={styles.footerTopBorder}></div>

        {/* Links grid */}
        <div style={styles.footerGrid}>
          <div>
            <div style={styles.columnTitle}>Product</div>
            <div style={styles.link}>Features</div>
            <div style={styles.link}>Education Hub</div>
            <div style={styles.link}>Pricing</div>
            <div style={styles.linkMuted}>Blog</div>
          </div>

          <div>
            <div style={styles.columnTitle}>Company</div>
            <div style={styles.link}>About Us</div>
            <div style={styles.link}>Stories</div>
            <div style={styles.linkMuted}>Careers</div>
          </div>

          <div>
            <div style={styles.columnTitle}>Support</div>
            <div style={styles.link}>Contact Us</div>
            <div style={styles.link}>Discord Group</div>
            <div style={styles.linkMuted}>FAQ</div>
          </div>

          <div>
            <div style={styles.columnTitle}>Legal</div>
            <div style={styles.linkMuted}>Privacy Policy</div>
            <div style={styles.linkMuted}>Terms of Service</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
