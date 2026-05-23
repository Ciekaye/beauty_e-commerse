import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import SkinQuiz from "@/components/SkinQuiz";
import IngredientExplorer from "@/components/IngredientExplorer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-cream-base">
      {/* Premium Sticky Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Mockup matching High-Fidelity Hero Header */}
        <Hero />

        {/* Curated Product Store Catalog */}
        <Catalog />

        {/* Interactive Skincare Consultation / Quiz Widget */}
        <SkinQuiz />

        {/* Interactive Molecular Chemical Specification Index */}
        <IngredientExplorer />
      </main>

      {/* Elegant E-Commerce Footer */}
      <Footer />
    </div>
  );
}
