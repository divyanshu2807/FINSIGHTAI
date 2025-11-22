// src/landing_page/SupportPage.js
import React from "react";
import Navbar from "./Navbar";
import SupportSection from "./SupportSection";

const SupportPage = ({ onOpenAccount }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#ffffff",
      }}
    >
      <Navbar onOpenAccount={onOpenAccount} />

      <main style={{ paddingTop: "72px" }}>
        <SupportSection />
      </main>
    </div>
  );
};

export default SupportPage;
