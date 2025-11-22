// src/landing_page/ProductPage.js
import React from "react";
import Navbar from "./Navbar";
import ProductSection from "./ProductSection";

const ProductPage = ({ onOpenAccount }) => {
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
        <ProductSection />
      </main>
    </div>
  );
};

export default ProductPage;
