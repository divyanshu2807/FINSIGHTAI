import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";

export default function Topbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { Home, Wallet, PieChart, Cpu, ShieldCheck } = Icons;

  const fullText = "FINSIGHT AI";

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typing);
    }, 180);
    return () => clearInterval(typing);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NAV_ITEMS = [
    { to: "/dashboard/overview", label: "Overview", icon: <Home size={28} /> },
    { to: "/dashboard/wallet", label: "Virtual Money", icon: <Wallet size={28} /> },
    { to: "/dashboard/portfolio", label: "Portfolio", icon: <PieChart size={28} /> },
    { to: "/dashboard/ai", label: "AI Predictor", icon: <Cpu size={28} /> },
    { to: "/dashboard/risk", label: "Risk Profiler", icon: <ShieldCheck size={28} /> },
  ];

  const theme = {
    bg: "#0E1424",
    panel: "#0B0F1A",
    neon: "#00BFFF",
    accentBorder: "#003566",
    textMuted: "#A9C9FF",
  };

  const openNavTo = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* 🟦 TOPBAR */}
      <div
        style={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 25px",
          background: theme.bg,
          color: "#fff",
          borderBottom: `1px solid ${theme.accentBorder}`,
          position: "relative",
          zIndex: 50,
        }}
      >
        {/* LEFT SIDE - NAV + LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Navigation Icon */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            style={{
              width: 46,
              height: 46,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: `1px solid ${theme.accentBorder}`,
              color: theme.neon,
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(0,191,255,0.2)",
              transition: "all 0.25s ease-in-out",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke={theme.neon}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* LOGO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/overview")}
          >
            <img
              src="/media/finsight logo image.png"
              alt="FinsightAI Logo"
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                objectFit: "contain",
                boxShadow: "none",
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Finsight<span style={{ color: theme.neon }}>AI</span>
            </span>
          </div>
        </div>

        {/* CENTER TITLE */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 2,
            background:
              "linear-gradient(270deg, #00BFFF, #8A2BE2, #00FFFF, #00BFFF)",
            backgroundSize: "800% 800%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientFlow 6s ease infinite",
            textShadow: "0 0 20px rgba(0,191,255,0.4)",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {displayedText}
          <span
            style={{
              color: "#00BFFF",
              opacity: 0.8,
              animation: "blink 1s infinite",
            }}
          >
            |
          </span>
        </div>

        {/* RIGHT SIDE - WALLET + AVATAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            position: "relative",
          }}
          ref={dropdownRef}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#00BFFF44,#8A2BE244)",
              border: "1px solid #003566",
              padding: "8px 14px",
              borderRadius: 12,
              color: "#A9C9FF",
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "0 0 14px rgba(0,191,255,0.2)",
            }}
          >
            💰 ₹12,540
          </div>

          {/* Avatar */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #00BFFF",
              boxShadow: "0 0 12px rgba(0,191,255,0.3)",
              cursor: "pointer",
            }}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              src="/media/user.jpg"
              alt="User Avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Dropdown Menu with animation */}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: 70,
                right: 0,
                width: 260,
                background: "rgba(14,20,36,0.96)",
                border: `1px solid ${theme.accentBorder}`,
                borderRadius: 12,
                boxShadow: "0 0 20px rgba(0,191,255,0.25)",
                padding: 18,
                color: "#fff",
                zIndex: 200,
                backdropFilter: "blur(8px)",
                animation: "dropdownSlide 0.35s ease",
              }}
            >
              <h4 style={{ color: theme.neon, marginBottom: 6 }}>Name</h4>
              <p style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
                Divyanshu Vats
              </p>

              <h4 style={{ color: theme.neon, marginBottom: 6 }}>Email</h4>
              <p style={{ fontSize: 17, fontWeight: "bold", marginBottom: 12 }}>
                divyanshu.vats@gmail.com
              </p>

              <h4 style={{ color: theme.neon, marginBottom: 8 }}>Account Options</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ cursor: "pointer" }}>⚙️ Profile Settings</span>
                <span style={{ cursor: "pointer" }}>🚪 Logout</span>
                <span style={{ cursor: "pointer" }}>🆘 Help Center</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 0; }
            25%, 75% { opacity: 1; }
          }

          @keyframes dropdownSlide {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* 🟦 DRAWER MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: drawerOpen ? 0 : "-340px",
          height: "100vh",
          width: 320,
          background: theme.panel,
          boxShadow: drawerOpen ? "8px 0 25px rgba(0,0,0,0.6)" : "none",
          transition: "left 300ms ease",
          zIndex: 100,
          padding: "30px 22px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src="/media/finsight logo image.png"
              alt="Finsight Logo"
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                objectFit: "contain",
                boxShadow: "none",
              }}
            />
            <div>
              <div style={{ color: theme.neon, fontWeight: 900, fontSize: 20 }}>
                Finsight<span style={{ color: "#fff" }}>AI</span>
              </div>
              <div style={{ color: theme.textMuted, fontSize: 13 }}>Navigation</div>
            </div>
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              color: theme.textMuted,
              cursor: "pointer",
              fontSize: 26,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav Links */}
        <div style={{ overflowY: "auto", flex: 1, paddingRight: 8 }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.to}
              onClick={() => openNavTo(item.to)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "18px 14px",
                borderRadius: 14,
                marginBottom: 18,
                cursor: "pointer",
                color: "#CCCCCC",
                fontSize: 18,
                fontWeight: 800,
                transition: "all 180ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#08122A";
                e.currentTarget.style.boxShadow = `0 0 14px ${theme.neon}55`;
                e.currentTarget.style.color = theme.neon;
                e.currentTarget.style.transform = "translateX(6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.color = "#CCCCCC";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  background: "#071026",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.neon,
                }}
              >
                {item.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span>{item.label}</span>
                <small style={{ color: theme.textMuted, fontSize: 13, marginTop: 5 }}>
                  Open {item.label}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div style={{ marginTop: 14 }}>
          <button
            onClick={() => {
              navigate("/dashboard/virtual-wallet");
              setDrawerOpen(false);
            }}
            style={{
              width: "100%",
              padding: "16px 16px",
              borderRadius: 14,
              background: theme.neon,
              color: "#001028",
              fontWeight: 900,
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              boxShadow: "0 8px 28px rgba(0,191,255,0.2)",
            }}
          >
            Open Virtual Wallet
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 90,
          }}
        />
      )}

      {/* 🎓 COURSES BUTTON - Bottom Right */}
      <div
        style={{
          position: "fixed",
          right: 25,
          bottom: 25,
          zIndex: 90,
        }}
      >
        <button
          onClick={() => navigate("/dashboard/courses")}
          title="Courses"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#00BFFF,#8A2BE2)",
            border: `2px solid ${theme.accentBorder}`,
            boxShadow: "0 0 25px rgba(0,191,255,0.5)",
            cursor: "pointer",
            color: "#fff",
            fontWeight: 900,
            fontSize: 32,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 40px rgba(0,191,255,0.8)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 25px rgba(0,191,255,0.5)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          🎓
        </button>
      </div>
    </>
  );
}
