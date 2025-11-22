// src/landing_page/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onOpenAccount }) => {
  const navigate = useNavigate();

  const styles = {
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "78px", // ⬆️ Increased height
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 48px", // ⬆️ More side padding
      background: "rgba(2,6,23,0.96)",
      borderBottom: "1px solid rgba(15,23,42,0.9)",
      backdropFilter: "blur(14px)",
      zIndex: 50,
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "14px", // ⬆️ bigger gap
    },

    logoImg: {
      height: "44px", // ⬆️ bigger logo
      width: "44px",
      borderRadius: "10px",
      objectFit: "cover",
    },

    logoText: {
      fontSize: "1.45rem", // ⬆️ bigger text
      fontWeight: 700,
      color: "#f9fafb",
      letterSpacing: "0.3px",
    },

    logoAccent: {
      color: "#3b82f6",
    },

    middle: {
      display: "flex",
      alignItems: "center",
      gap: "36px", // ⬆️ bigger spacing between nav links
      fontSize: "1.05rem", // ⬆️ larger nav text
    },

    navButton: {
      background: "none",
      border: "none",
      color: "#e5e7eb",
      fontSize: "1.05rem", // ⬆️ text size
      fontWeight: 500,
      cursor: "pointer",
      padding: 0,
      transition: "0.2s",
    },

    right: {},

    openBtn: {
      padding: "12px 26px", // ⬆️ bigger button
      borderRadius: "999px",
      border: "none",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      fontWeight: 600,
      fontSize: "1rem", // ⬆️ button text size
      cursor: "pointer",
      transition: "0.2s",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <img
          src="/media/finsight logo image.png"
          alt="FinsightAI logo"
          style={styles.logoImg}
        />
        <span style={styles.logoText}>
          Finsight<span style={styles.logoAccent}>AI</span>
        </span>
      </div>

      <nav style={styles.middle}>
        <button style={styles.navButton} onClick={() => navigate("/")}>
          Home
        </button>

        <button style={styles.navButton} onClick={() => navigate("/about")}>
          About
        </button>

        <button style={styles.navButton} onClick={() => navigate("/pricing")}>
          Pricing
        </button>

        <button style={styles.navButton} onClick={() => navigate("/product")}>
          Product
        </button>

        <button style={styles.navButton} onClick={() => navigate("/support")}>
          Support
        </button>
      </nav>

      <div style={styles.right}>
        <button
          style={styles.openBtn}
          onClick={onOpenAccount ? onOpenAccount : () => navigate("/register")}
        >
          Open Account
        </button>
      </div>
    </header>
  );
};

export default Navbar;
