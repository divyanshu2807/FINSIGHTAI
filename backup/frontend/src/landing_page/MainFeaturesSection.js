import React, { useRef } from "react";

const MainFeaturesSection = React.forwardRef((props, ref) => {
  const styles = {
    section: {
      width: "100%",
      maxWidth: "1200px",
      margin: "80px auto",
      padding: "20px",
      color: "white",
      textAlign: "center",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#cbd5f5",
      marginBottom: "50px",
      fontSize: "1rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "25px",
    },
    card: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: "16px",
      padding: "25px",
      border: "1px solid rgba(255,255,255,0.09)",
      backdropFilter: "blur(6px)",
      textAlign: "left",
      minHeight: "150px",
    },
    icon: {
      width: "40px",
      height: "40px",
      marginBottom: "14px",
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "8px",
    },
    desc: {
      color: "#cbd5f5",
      fontSize: "0.9rem",
      lineHeight: "1.5",
    },
  };

  return (
    <section style={styles.section} ref={ref}>
      <h2 style={styles.heading}>Our Features</h2>
      <p style={styles.subtitle}>
        Discover the Full Range of FinsightAI's Intelligent Features
      </p>

      <div style={styles.grid}>

        <div style={styles.card}>
          <img src="/media/f1.png" style={styles.icon} alt="AI Predictions" />
          <h3 style={styles.title}>AI Predictions</h3>
          <p style={styles.desc}>Smart buy/sell signals with confidence score.</p>
        </div>

        <div style={styles.card}>
          <img src="/media/f2.png" style={styles.icon} alt="Risk Profiler" />
          <h3 style={styles.title}>Risk Profiler</h3>
          <p style={styles.desc}>Personalized risk analysis for safer decisions.</p>
        </div>

        <div style={styles.card}>
          <img src="/media/f3.png" style={styles.icon} alt="Learning Hub" />
          <h3 style={styles.title}>Learning Hub</h3>
          <p style={styles.desc}>Courses, quizzes, & interactive learning.</p>
        </div>

        <div style={styles.card}>
          <img src="/media/f4.png" style={styles.icon} alt="Goal Planning" />
          <h3 style={styles.title}>Goal Planning</h3>
          <p style={styles.desc}>AI-backed projections for life goals.</p>
        </div>

        <div style={styles.card}>
          <img src="/media/f5.png" style={styles.icon} alt="Virtual Trading" />
          <h3 style={styles.title}>Virtual Trading</h3>
          <p style={styles.desc}>₹1,00,000 demo money for practice.</p>
        </div>

        <div style={styles.card}>
          <img src="/media/f6.png" style={styles.icon} alt="AI Chatbot" />
          <h3 style={styles.title}>AI Chatbot</h3>
          <p style={styles.desc}>24/7 help for all your investing questions.</p>
        </div>

      </div>
    </section>
  );
});

export default MainFeaturesSection;
