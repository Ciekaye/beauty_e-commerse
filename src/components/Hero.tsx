"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Plus, ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const { addToCart } = useCart();

  // Reusable Product Cards data for the hero floaters
  const heroProducts = [
    {
      id: "h1",
      name: "Hyaluronic Acid Cleanser",
      price: 10.20,
      image: "/cleanser.png",
      category: "Skincare",
      bgClass: "bg-[#D2D29E]/60" // Olive/sage toned background matching the design
    },
    {
      id: "h2",
      name: "Glitter Pearlescent Eyeshadow",
      price: 3.40,
      image: "/eyeshadow.png",
      category: "Eyes / Makeup",
      bgClass: "bg-[#C5C58C]/60" // Sage green toned background matching the design
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-cream-base py-12 lg:py-24">
      {/* Decorative background vectors / blurred organic shapes */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-coral-peach/10 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-sage-olive/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subhead, CTAs and Floating Cards */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Header Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold tracking-widest text-coral-dark uppercase"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-coral-peach animate-pulse" />
                New Collection Available
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal-base leading-[1.12]"
              >
                Don't{" "}
                <span className="text-coral-peach font-serif italic font-semibold relative inline-block mx-1">
                  judge
                  <span className="absolute bottom-2 left-0 h-[6px] w-full bg-coral-peach/10 -z-10 rounded-full" />
                </span>{" "}
                the book by its cover, but the cover still matters
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-charcoal-dim max-w-lg leading-relaxed"
              >
                Give a different touch to every appearance by using the various high-end,
                fully organic and dermatologically certified products we offer.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6"
            >
              <a
                href="#catalog"
                className="rounded-full bg-coral-peach px-8 py-4 text-sm font-bold text-white shadow-premium hover:bg-coral-dark hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Shop Now
              </a>
              <a
                href="#quiz"
                className="group flex items-center gap-2 text-sm font-bold text-coral-peach hover:text-coral-dark transition-colors py-2 relative"
              >
                Skin Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Floating Hero Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {heroProducts.map((product, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                  key={product.id}
                  className="relative rounded-3xl bg-white p-4 shadow-card border border-cream-dark/20 flex gap-4 items-center group hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Decorative Sage Rounded Backdrop */}
                  <div className={`relative h-20 w-20 flex-shrink-0 rounded-2xl ${product.bgClass} flex items-center justify-center p-2 overflow-hidden border border-cream-dark/30`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={70}
                      height={70}
                      className="object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between h-20 min-w-0 pr-4">
                    <div>
                      <h3 className="font-bold text-xs text-charcoal-base leading-tight truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-sage-dark font-bold uppercase tracking-wider mt-0.5">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-charcoal-base">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Dynamic Add to Cart Button */}
                  <button
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category
                    })}
                    className="absolute bottom-4 right-4 h-9 w-9 rounded-full bg-coral-peach hover:bg-coral-dark text-white flex items-center justify-center shadow-premium transition-all duration-300 transform active:scale-95 group-hover:rotate-6"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Column: Model Portrait, Offset Background Box, Grid Accents & Brand Logos */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* The Main Art Container */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[5/6] xs:aspect-[4/5] sm:aspect-square flex items-center justify-center">
              
              {/* Dot grid decoration (Left side of the portrait) */}
              <div className="absolute left-[-20px] top-[40%] -z-10 grid grid-cols-5 gap-2 opacity-50">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-sage-olive/60" />
                ))}
              </div>

              {/* Offset Peach/Coral Solid Graphic Backdrop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute right-0 bottom-6 w-[88%] h-[82%] rounded-[48px] bg-coral-peach/90 shadow-premium -z-10"
              />

              {/* Dot grid decoration (Top right side of the page) */}
              <div className="absolute right-[-15px] top-4 -z-20 grid grid-cols-4 gap-2.5 opacity-40">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-coral-peach/80" />
                ))}
              </div>

              {/* High-Fidelity Model Portrait */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-[92%] h-[92%] rounded-[42px] overflow-hidden shadow-premium border-2 border-white/60 bg-cream-dark/20"
              >
                <Image
                  src="/hero-model.png"
                  alt="Beautiful model representing Lumière organic skin collective holding ranunculus flowers"
                  fill
                  className="object-cover object-center scale-102 hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-w-768px) 100vw, 500px"
                />
              </motion.div>

            </div>

            {/* Premium Partner Brand Logos (Floating underneath model container) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center gap-10 mt-12 w-full text-charcoal-base font-semibold"
            >
              {/* Madalen */}
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300 select-none">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-charcoal-base text-white text-xs font-bold font-serif">M</span>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[11px]">Madalen</span>
              </div>
              
              {/* Horizon */}
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300 select-none">
                {/* 4-corner Star Custom SVG */}
                <svg className="h-5 w-5 fill-charcoal-base" viewBox="0 0 24 24">
                  <path d="M12 0l3.09 9h9.09l-7.36 5.4 2.82 9-7.64-5.6-7.64 5.6 2.82-9-7.36-5.4h9.09z" />
                </svg>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[11px]">Horizon</span>
              </div>

              {/* Xeno */}
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300 select-none">
                {/* Rhombus Custom SVG */}
                <svg className="h-5.5 w-5.5 fill-charcoal-base" viewBox="0 0 24 24">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.5l5.5 5.5-5.5 5.5-5.5-5.5 5.5-5.5z" />
                </svg>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[11px]">Xeno</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
