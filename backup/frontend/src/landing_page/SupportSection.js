// src/landing_page/SupportSection.js
import React, { useRef } from "react";

const SupportSection = () => {
  const faqRef = useRef(null);
  const chatRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    section: {
      width: "100%",
      minHeight: "calc(100vh - 64px)",
      padding: "80px 20px 80px",
      display: "flex",
      justifyContent: "center",
      background: "linear-gradient(135deg, #020617, #06173d 80%)",
      color: "#f9fafb",
      boxSizing: "border-box",
    },
    inner: {
      width: "100%",
      maxWidth: "1100px",
      margin: "0 auto",
      textAlign: "center",
    },
    title: {
      fontSize: "2.6rem",
      fontWeight: 800,
      marginBottom: "10px",
    },
    titleHighlight: {
      color: "#38bdf8",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#cbd5e1",
      maxWidth: "750px",
      margin: "0 auto 40px",
      lineHeight: 1.7,
    },
    cardsRow: {
      display: "flex",
      justifyContent: "center",
      gap: "26px",
      flexWrap: "wrap",
      marginBottom: "60px",
    },
    card: {
      width: "320px",
      padding: "22px",
      borderRadius: "18px",
      background: "rgba(15,23,42,0.95)",
      border: "1px solid rgba(37, 99, 235, 0.6)",
      boxShadow: "0 0 20px rgba(56,189,248,0.25)",
      cursor: "pointer",
      transition: "0.2s",
    },
    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 18px 45px rgba(15,23,42,0.9)",
    },
    icon: { fontSize: "1.4rem", marginBottom: "10px" },
    cardTitle: { fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" },
    cardText: { fontSize: "0.9rem", color: "#cbd5e1", lineHeight: 1.6 },

    // CONTENT BLOCKS
    block: {
      background: "rgba(15,23,42,0.8)",
      padding: "30px",
      borderRadius: "14px",
      maxWidth: "900px",
      margin: "40px auto",
      border: "1px solid rgba(255,255,255,0.05)",
      boxShadow: "0px 4px 40px rgba(0,0,0,0.4)",
      textAlign: "left",
    },
    blockTitle: {
      fontSize: "1.6rem",
      fontWeight: 700,
      marginBottom: "12px",
    },
    faqItem: {
      marginBottom: "16px",
      paddingBottom: "10px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },
    contactInput: {
      width: "100%",
      padding: "10px",
      marginBottom: "14px",
      borderRadius: "8px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "white",
      fontSize: "1rem",
    },
    contactBtn: {
      width: "100%",
      padding: "12px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  return (
    <>
      {/* TOP SECTION */}
      <section style={styles.section}>
        <div style={styles.inner}>
          <h1 style={styles.title}>
            Support & <span style={styles.titleHighlight}>Help Center</span>
          </h1>

          <p style={styles.subtitle}>
            We're here to help. Explore FAQs, chat with our team, or contact us directly.
          </p>

          {/* CARDS */}
          <div style={styles.cardsRow}>
            {/* FAQ CARD */}
            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { transform: "none", boxShadow: styles.card.boxShadow })
              }
              onClick={() => scrollTo(faqRef)}
            >
              <div style={styles.icon}>❓</div>
              <div style={styles.cardTitle}>FAQs</div>
              <div style={styles.cardText}>
                Common questions and instant solutions.
              </div>
            </div>

            {/* LIVE CHAT */}
            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { transform: "none", boxShadow: styles.card.boxShadow })
              }
              onClick={() => scrollTo(chatRef)}
            >
              <div style={styles.icon}>💬</div>
              <div style={styles.cardTitle}>Live Chat</div>
              <div style={styles.cardText}>
                Chat with our AI assistant or human support.
              </div>
            </div>

            {/* CONTACT */}
            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { transform: "none", boxShadow: styles.card.boxShadow })
              }
              onClick={() => scrollTo(contactRef)}
            >
              <div style={styles.icon}>📧</div>
              <div style={styles.cardTitle}>Contact Us</div>
              <div style={styles.cardText}>
                Get personalized support from our team.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <div ref={faqRef} style={styles.block}>
        <h2 style={styles.blockTitle}>Frequently Asked Questions</h2>

        <div style={styles.faqItem}>
          <strong>• How do AI predictions work?</strong>
          <p>Our ML model analyzes past OHLCV data and trends to predict tomorrow's price.</p>
        </div>

        <div style={styles.faqItem}>
          <strong>• Is virtual trading free?</strong>
          <p>Yes. You get ₹100,000 demo money to practice endlessly.</p>
        </div>

        <div style={styles.faqItem}>
          <strong>• Do I need KYC?</strong>
          <p>No KYC required for learning, simulations, and AI tools.</p>
        </div>
      </div>

      {/* CHAT SECTION */}
      <div ref={chatRef} style={styles.block}>
        <h2 style={styles.blockTitle}>Live Chat Support</h2>
        <p style={{ color: "#cbd5e1", marginBottom: "20px" }}>
          Chat with our AI assistant for instant help. Human experts are also available.
        </p>

        <div
          style={{
            width: "100%",
            height: "200px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: "12px",
            padding: "20px",
            color: "#9ca3af",
          }}
        >
          🔥 <strong>AI Chat Coming Soon…</strong>
          <br />
          Type your question and AI will respond here.
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div ref={contactRef} style={styles.block}>
        <h2 style={styles.blockTitle}>Contact Us</h2>

        <input style={styles.contactInput} placeholder="Your Name" />
        <input style={styles.contactInput} placeholder="Email Address" />
        <textarea
          style={{ ...styles.contactInput, height: "120px" }}
          placeholder="Your message..."
        />

        <button style={styles.contactBtn}>Send Message</button>
      </div>
    </>
  );
};

export default SupportSection;
