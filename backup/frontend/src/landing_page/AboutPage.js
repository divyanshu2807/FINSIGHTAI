// src/landing_page/AboutPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0, #020617 55%, #000814 100%)",
        color: "#e5e7eb",
      }}
    >
      {/* Top navbar same as landing */}
      <Navbar onOpenAccount={() => navigate("/register")} />

      {/* About content full-screen center */}
      <section
        style={{
          width: "100%",
          minHeight: "calc(100vh - 72px)", // navbar ke niche
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 0 60px 0",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1150px",
            padding: "0 24px",
          }}
        >
          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#38bdf8",
                marginBottom: "8px",
              }}
            >
              About
            </p>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#e5e7eb",
              }}
            >
              Meet the mind behind{" "}
              <span style={{ color: "#38bdf8" }}>FinsightAI</span>
            </h2>
          </div>

          {/* Main Card – thoda bada + full width feeling */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "30px 32px",
              borderRadius: "22px",
              background:
                "linear-gradient(140deg, rgba(15,23,42,0.97), rgba(15,23,42,0.95))",
              border: "1px solid rgba(56,189,248,0.32)",
              boxShadow: "0 30px 80px rgba(15,23,42,0.95)",
              flexWrap: "wrap",
              minHeight: "320px",
            }}
          >
            {/* Left: Circular photo */}
            <div
              style={{
                flex: "0 0 260px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "210px",
                  height: "210px",
                  borderRadius: "50%",
                  border: "3px solid #38bdf8",
                  padding: "5px",
                  background:
                    "radial-gradient(circle at 30% 0, #38bdf8, #0f172a, #020617)",
                  boxShadow: "0 0 35px rgba(56,189,248,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="media\dev final img.jpg" // ← yahan apni real photo ka path daalna
                  alt="Divyanshu Vats - Creator of FinsightAI"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>

            {/* Right: Text content */}
            <div
              style={{
                flex: "1 1 320px",
                minWidth: "280px",
                color: "#e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                Divyanshu Vats
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  marginBottom: "16px",
                }}
              >
                Creator of FinsightAI · MERN &amp; AI Enthusiast
              </p>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#cbd5f5",
                  marginBottom: "10px",
                }}
              >
                FinsightAI is a smart investing companion designed to help
                students and young investors learn how markets work — using{" "}
                <span style={{ color: "#38bdf8" }}>virtual money</span>,
                AI-powered insights, and interactive dashboards.
              </p>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#cbd5f5",
                  marginBottom: "16px",
                }}
              >
                From risk profiling to AI stock suggestions, FinsightAI turns
                complex financial data into simple, visual stories — so you can
                experiment, learn, and build confidence before entering the real
                market.
              </p>

              {/* Bullet points */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: "8px 20px",
                  fontSize: "13px",
                  color: "#cbd5f5",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#22c55e", marginTop: "2px" }}>✔</span>
                  <span>
                    AI-powered virtual trading with real-time portfolio view.
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#22c55e", marginTop: "2px" }}>✔</span>
                  <span>Risk profiler, AI predictor, and interactive analytics.</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#22c55e", marginTop: "2px" }}>✔</span>
                  <span>
                    Built as a full-stack semester project with real backend &amp; ML.
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#22c55e", marginTop: "2px" }}>✔</span>
                  <span>Designed for learners who want to practice before investing.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
