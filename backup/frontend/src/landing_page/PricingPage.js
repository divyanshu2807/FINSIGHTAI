// src/landing_page/PricingPage.js
import React from "react";
import Navbar from "./Navbar";
import PricingSection from "./PricingSection";

const PricingPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#ffffff",
      }}
    >
      {/* upar same navbar */}
      <Navbar />

      {/* navbar fixed hai, isliye thoda top padding */}
      <main style={{ paddingTop: "72px" }}>
        <PricingSection />
      </main>
    </div>
  );
};

export default PricingPage;
