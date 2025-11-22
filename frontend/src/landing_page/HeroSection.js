// src/landing_page/HeroSection.js
import React from "react";
import "../landing_page/landing.css";

const HeroSection = ({ scrollToFeatures }) => {
  return (
    <section
      id="home"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "120px", // navbar adjustment
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "900px",
          padding: "0 20px",
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontSize: "14px", // bigger
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#60a5fa",
            marginBottom: "18px",
          }}
        >
          AI-POWERED INVESTING
        </p>

        {/* Main Title */}
        <h1
          style={{
            fontSize: "54px", // bigger text
            fontWeight: 800,
            lineHeight: 1.25,
            color: "#F9FAFB",
            marginBottom: "20px",
          }}
        >
          Let’s start your
          <br />
          trading journey.
        </h1>

        {/* Buttons */}
        <div
          style={{
            marginTop: "26px",
            display: "flex",
            justifyContent: "center",
            gap: "20px", // bigger gap
          }}
        >
          <button
            onClick={() => scrollToFeatures && scrollToFeatures()}
            style={{
              padding: "12px 32px", // bigger button
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "#F9FAFB",
              fontWeight: 600,
              fontSize: "16px", // bigger text
              cursor: "pointer",
              boxShadow: "0 12px 25px rgba(37,99,235,0.35)",
            }}
          >
            Get Started
          </button>

          <button
            onClick={() => scrollToFeatures && scrollToFeatures()}
            style={{
              padding: "12px 32px", // bigger button
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.4)",
              backgroundColor: "transparent",
              color: "#E5E7EB",
              fontWeight: 500,
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
