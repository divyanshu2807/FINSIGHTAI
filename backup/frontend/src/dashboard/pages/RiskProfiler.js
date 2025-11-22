// src/dashboard/pages/RiskProfiler.js
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RiskProfiler() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 🗣️ Voice feedback
  const speakResult = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.pitch = 1.1;
      utterance.rate = 1.02;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      utterance.voice =
        voices.find((v) => v.name.includes("Google")) ||
        voices.find((v) => v.lang === "en-US");

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const questions = [
    {
      id: 1,
      question: "What is your age group?",
      options: [
        { text: "Below 25", value: 3 },
        { text: "25 - 40", value: 2 },
        { text: "Above 40", value: 1 },
      ],
    },
    {
      id: 2,
      question: "What is your investment duration?",
      options: [
        { text: "Less than 1 year", value: 1 },
        { text: "1 - 5 years", value: 2 },
        { text: "More than 5 years", value: 3 },
      ],
    },
    {
      id: 3,
      question: "If the market drops by 20%, what would you do?",
      options: [
        { text: "Sell everything", value: 1 },
        { text: "Hold and wait", value: 2 },
        { text: "Buy more stocks", value: 3 },
      ],
    },
    {
      id: 4,
      question: "What is your primary investment goal?",
      options: [
        { text: "Preserve money", value: 1 },
        { text: "Steady growth", value: 2 },
        { text: "High returns", value: 3 },
      ],
    },
    {
      id: 5,
      question: "How comfortable are you with financial risk?",
      options: [
        { text: "Not comfortable", value: 1 },
        { text: "Somewhat comfortable", value: 2 },
        { text: "Very comfortable", value: 3 },
      ],
    },
  ];

  useEffect(() => {
    setProgress(((step + 1) / questions.length) * 100);
  }, [step]);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [step]: value };
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      calculateRisk(newAnswers);
    }
  };

  const calculateRisk = (allAnswers) => {
    const totalScore = Object.values(allAnswers).reduce((a, b) => a + b, 0);
    let level = "";
    if (totalScore <= 8) level = "Low Risk";
    else if (totalScore <= 12) level = "Moderate Risk";
    else level = "High Risk";

    setIsAnalyzing(true);
    setLoadingMessage("Analyzing your answers...");

    setTimeout(() => setLoadingMessage("Generating AI insights..."), 1500);
    setTimeout(() => setLoadingMessage("Finalizing your risk profile..."), 3000);

    setTimeout(() => {
      setIsAnalyzing(false);
      speakResult(`Your risk profile is ${level}.`);
      setResult(level);
    }, 4500);
  };

  const restartQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setProgress(0);
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setRefresh((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- STYLES ----------
  const pageStyle = {
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#000814",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 16px 32px",
    boxSizing: "border-box",
  };

  const headingStyle = {
    fontSize: "2.1rem",
    fontWeight: 600,
    marginBottom: "24px",
    textAlign: "center",
    color: "#4ea9ff",
    letterSpacing: "0.06em",
  };

  const cardWrapperStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const questionCardStyle = {
    width: "90%",
    maxWidth: "780px",
    backgroundColor: "#050b1f",
    borderRadius: "20px",
    padding: "32px 40px",
    boxShadow: "0 0 28px rgba(0,0,0,0.6)",
    border: "1px solid #1f2e4d",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const progressOuterStyle = {
    width: "100%",
    height: "10px",
    borderRadius: "999px",
    backgroundColor: "#07152e",
    overflow: "hidden",
    marginBottom: "28px",
  };

  const questionTextStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#bcdcff",
    marginBottom: "28px",
  };

  const optionsRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
    marginTop: "8px",
  };

  const optionButtonStyle = {
    flex: "1 1 150px",
    minWidth: "150px",
    backgroundColor: "#07152e",
    border: "1px solid #2d3f60",
    padding: "14px 24px",
    borderRadius: "14px",
    color: "#ffffff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const bottomTextStyle = {
    marginTop: "24px",
    fontSize: "0.9rem",
    color: "#94a3b8",
  };

  const analyzingCardStyle = {
    width: "90%",
    maxWidth: "750px",
    backgroundColor: "#071028",
    borderRadius: "20px",
    padding: "32px 40px",
    border: "1px solid #1d4ed8",
    boxShadow: "0 0 25px rgba(0,191,255,0.25)",
    textAlign: "center",
  };

  const resultCardStyle = {
    width: "90%",
    maxWidth: "820px",
    background: "linear-gradient(to bottom, #071028, #000814)",
    borderRadius: "22px",
    padding: "36px 40px",
    border: "1px solid #1d4ed8",
    boxShadow: "0 0 30px rgba(0,140,255,0.2)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const pillStyle = (bg, border) => ({
    padding: "12px",
    borderRadius: "16px",
    backgroundColor: bg,
    border: `1px solid ${border}`,
    fontSize: "0.9rem",
    margin: "4px",
  });

  // ---------- JSX ----------
  return (
    <div key={refresh} style={pageStyle}>
      {/* Heading */}
      <h2 style={headingStyle}>Investment Risk Profiler</h2>

      {/* 🔄 Analyzing Screen */}
      {isAnalyzing ? (
        <div style={analyzingCardStyle}>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#60a5fa",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            🤖 FinsightAI
            {isSpeaking && (
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "999px",
                  backgroundColor: "#22d3ee",
                  boxShadow: "0 0 10px #22d3ee",
                }}
              />
            )}
          </h2>
          {isSpeaking && (
            <p
              style={{
                color: "#67e8f9",
                fontSize: "1rem",
                marginBottom: "8px",
              }}
            >
              🎙️ Speaking...
            </p>
          )}
          <p
            style={{
              color: "#e5e7eb",
              fontSize: "1.1rem",
              marginBottom: "20px",
            }}
          >
            {loadingMessage}
          </p>
          <div
            style={{
              margin: "0 auto",
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              border: "4px solid #3b82f6",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      ) : !result ? (
        // ❓ QUESTION CARD
        <div style={cardWrapperStyle}>
          <div style={questionCardStyle}>
            {/* Progress bar */}
            <div style={progressOuterStyle}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  borderRadius: "999px",
                  background:
                    "linear-gradient(to right, #22c9ff, #0b7cff)",
                  transition: "width 0.6s ease-out",
                }}
              />
            </div>

            {/* Question text */}
            <h3 style={questionTextStyle}>
              Q{step + 1}. {questions[step].question}
            </h3>

            {/* Options */}
            <div style={optionsRowStyle}>
              {questions[step].options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(opt.value)}
                  style={optionButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0e2245";
                    e.currentTarget.style.borderColor = "#4ea9ff";
                    e.currentTarget.style.boxShadow =
                      "0 0 18px rgba(78,169,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#07152e";
                    e.currentTarget.style.borderColor = "#2d3f60";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {/* Bottom text */}
            <p style={bottomTextStyle}>
              Question {step + 1} of {questions.length}
            </p>
          </div>
        </div>
      ) : (
        // ✅ RESULT CARD
        <div style={resultCardStyle}>
          <h1
            style={{
              fontSize: "1.7rem",
              fontWeight: 600,
              color: "#60a5fa",
              marginBottom: "10px",
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Your AI-Generated Risk Profile 🚀
            {isSpeaking && (
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "999px",
                  backgroundColor: "#22d3ee",
                  boxShadow: "0 0 10px #22d3ee",
                }}
              />
            )}
          </h1>

          {isSpeaking && (
            <p
              style={{
                color: "#67e8f9",
                fontSize: "1rem",
                marginBottom: "8px",
                position: "relative",
                zIndex: 2,
              }}
            >
              🎙️ Speaking...
            </p>
          )}

          <div
            style={{
              margin: "22px auto",
              width: "190px",
              height: "190px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <CircularProgressbar
              value={
                result === "Low Risk"
                  ? 30
                  : result === "Moderate Risk"
                  ? 60
                  : 90
              }
              text={result}
              styles={buildStyles({
                textColor: "#00BFFF",
                textSize: "12px",
                pathColor:
                  result === "Low Risk"
                    ? "#22c55e"
                    : result === "Moderate Risk"
                    ? "#eab308"
                    : "#ef4444",
                trailColor: "#0b1220",
                strokeLinecap: "round",
              })}
            />
          </div>

          <p
            style={{
              color: "#e5e7eb",
              fontSize: "0.95rem",
              marginBottom: "18px",
              position: "relative",
              zIndex: 2,
            }}
          >
            Based on your answers, FinsightAI has analyzed your investor
            behavior and risk tolerance using advanced AI metrics.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {result === "Low Risk" && (
              <>
                <div style={pillStyle("rgba(22,163,74,0.7)", "#4ade80")}>
                  60% Bonds
                </div>
                <div style={pillStyle("rgba(22,163,74,0.6)", "#22c55e")}>
                  30% Stocks
                </div>
                <div style={pillStyle("rgba(22,163,74,0.5)", "#16a34a")}>
                  10% Cash
                </div>
              </>
            )}
            {result === "Moderate Risk" && (
              <>
                <div style={pillStyle("rgba(202,138,4,0.7)", "#facc15")}>
                  40% Bonds
                </div>
                <div style={pillStyle("rgba(202,138,4,0.6)", "#eab308")}>
                  50% Stocks
                </div>
                <div style={pillStyle("rgba(202,138,4,0.5)", "#ca8a04")}>
                  10% Cash
                </div>
              </>
            )}
            {result === "High Risk" && (
              <>
                <div style={pillStyle("rgba(220,38,38,0.7)", "#f97373")}>
                  70% Stocks
                </div>
                <div style={pillStyle("rgba(220,38,38,0.6)", "#ef4444")}>
                  20% Crypto
                </div>
                <div style={pillStyle("rgba(220,38,38,0.5)", "#b91c1c")}>
                  10% Cash
                </div>
              </>
            )}
          </div>

          <button
            onClick={restartQuiz}
            style={{
              marginTop: "8px",
              padding: "10px 22px",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(to right, #3b82f6, #22d3ee)",
              color: "#020617",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(59,130,246,0.6)",
              position: "relative",
              zIndex: 2,
            }}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default RiskProfiler;
