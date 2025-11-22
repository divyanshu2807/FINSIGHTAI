// src/landing_page/LandingPage.js
import React, { useRef } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import "../landing_page/landing.css";
import FeaturesSection from "./FeaturesSection";
import OurFeaturesSection from "./OurFeaturesSection";
import FooterSection from "./FooterSection";



// yahan prop add kiya: onOpenAccount
const LandingPage = ({ onOpenAccount }) => {
  const ourFeaturesRef = useRef(null);

  const scrollToFeatures = () => {
    if (ourFeaturesRef.current) {
      ourFeaturesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-root">
      {/* Navbar ko prop pass kiya */}
      <Navbar onOpenAccount={onOpenAccount} />

      {/* HeroSection ko scroll function waise hi de rahe hain */}
      <HeroSection scrollToFeatures={scrollToFeatures} />

      {/* Learn. Practice. Master AI Trading. section */}

      <FeaturesSection />

      


      {/* OUR FEATURES section – scroll ka target */}
      <OurFeaturesSection ref={ourFeaturesRef} />

      <FooterSection />
    </div>
  );
};

export default LandingPage;
