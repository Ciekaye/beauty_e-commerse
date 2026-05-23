"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  secondaryImage: string;
  category: "Skincare" | "Makeup" | "Creams";
  rating: number;
  reviewsCount: number;
  badge?: string;
  benefits: string[];
}

const catalogProducts: Product[] = [
  {
    id: "h1",
    name: "Hyaluronic Acid Cleanser",
    price: 10.20,
    image: "/cleanser.png",
    secondaryImage: "/cleanser.png",
    category: "Skincare",
    rating: 4.8,
    reviewsCount: 142,
    badge: "Bestseller",
    benefits: ["Calming active mist", "Deep cell water retention"]
  },
  {
    id: "h2",
    name: "Glitter Pearlescent Eyeshadow",
    price: 3.40,
    image: "/eyeshadow.png",
    secondaryImage: "/eyeshadow.png",
    category: "Makeup",
    rating: 4.9,
    reviewsCount: 88,
    badge: "Trending",
    benefits: ["12h smudge-proof", "Bio-mineral glitter powder"]
  },
  {
    id: "c1",
    name: "Royal Rose Hydration Cream",
    price: 24.50,
    image: "/cleanser.png", // reusing cleanser for visual consistency
    secondaryImage: "/cleanser.png",
    category: "Creams",
    rating: 4.7,
    reviewsCount: 96,
    benefits: ["Soothes red skin capillaries", "Locks skin barrier lipids"]
  },
  {
    id: "s3",
    name: "Chamomile Sleeping Mask",
    price: 18.00,
    image: "/cleanser.png",
    secondaryImage: "/cleanser.png",
    category: "Skincare",
    rating: 4.6,
    reviewsCount: 64,
    badge: "New",
    benefits: ["Calms stress lines", "Wake up with instant glow"]
  },
  {
    id: "m4",
    name: "Radiant Dual highlighter",
    price: 14.90,
    image: "/eyeshadow.png", // reusing eyeshadow for visual consistency
    secondaryImage: "/eyeshadow.png",
    category: "Makeup",
    rating: 4.9,
    reviewsCount: 110,
    benefits: ["Ultra-fine light refractors", "Adapts to all melanin tones"]
  },
  {
    id: "c5",
    name: "Mineral SPF50 Glow Fluid",
    price: 19.20,
    image: "/cleanser.png",
    secondaryImage: "/cleanser.png",
    category: "Creams",
    rating: 4.8,
    reviewsCount: 180,
    benefits: ["Zinc-based safe block", "Silky non-greasy dewy skin"]
  }
];

export default function Catalog() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"All" | "Skincare" | "Makeup" | "Creams">("All");
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = catalogProducts.filter((product) => {
    if (activeTab === "All") return true;
    return product.category === activeTab;
  });

  return (
    <section id="catalog" className="py-24 bg-cream-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section with Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-lg">
            <span className="text-[10px] text-coral-peach font-extrabold uppercase tracking-widest bg-coral-light/60 px-3 py-1 border border-coral-peach/25 rounded-full">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-charcoal-base">
              Shop Glamoura Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-dim leading-relaxed">
              Explore our laboratory-certified bio-skincare and highly-pigmented mineral cosmetic collections designed to elevate your daily routine.
            </p>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-cream-dark/40 p-1.5 rounded-full self-start md:self-end border border-cream-dark/40">
            {(["All", "Skincare", "Makeup", "Creams"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white text-charcoal-base shadow-card"
                    : "text-charcoal-dim hover:text-charcoal-base"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isHovered = hoveredProductId === product.id;
              const isLiked = !!likedProducts[product.id];
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className="group relative bg-white rounded-3xl p-5 border border-cream-dark/20 shadow-card hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  
                  {/* Image and Badges */}
                  <div className="relative aspect-square w-full rounded-2xl bg-cream-light border border-cream-dark/20 flex items-center justify-center p-6 overflow-hidden">
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10 pointer-events-none">
                      {product.badge ? (
                        <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          product.badge === "Bestseller" 
                            ? "bg-coral-peach text-white" 
                            : product.badge === "Trending" 
                            ? "bg-sage-olive text-white" 
                            : "bg-charcoal-base text-white"
                        }`}>
                          {product.badge}
                        </span>
                      ) : <span />}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleLike(product.id, e)}
                        className="pointer-events-auto h-8.5 w-8.5 rounded-full bg-white shadow-card flex items-center justify-center text-charcoal-dim hover:text-coral-peach transition-all active:scale-90 duration-200"
                        aria-label="Add to favorites"
                      >
                        <Heart className={`h-4.5 w-4.5 ${isLiked ? "fill-coral-peach text-coral-peach" : ""}`} />
                      </button>
                    </div>

                    {/* Secondary graphic backdrop on card hover */}
                    <div className="absolute inset-4 rounded-xl bg-sage-olive/15 scale-95 group-hover:scale-100 transition-all duration-300 opacity-50 -z-10" />

                    {/* Main Image */}
                    <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                      <Image
                        src={isHovered ? product.secondaryImage : product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-md group-hover:scale-106 transition-transform duration-500 ease-out"
                        sizes="(max-w-768px) 100vw, 300px"
                      />
                    </div>

                    {/* Direct quick action overlays */}
                    <div className="absolute bottom-4 inset-x-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => alert(`Product Details: ${product.name}\nBenefits: ${product.benefits.join(', ')}`)}
                        className="h-9 w-9 rounded-full bg-white shadow-card border border-cream-dark/50 flex items-center justify-center text-charcoal-base hover:bg-cream-light transition-all active:scale-90 duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4.5 w-4.5" />
                      </button>
                    </div>

                  </div>

                  {/* Core product information */}
                  <div className="mt-5 space-y-3 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline gap-1 text-[10px] text-sage-dark font-extrabold uppercase tracking-widest">
                        <span>{product.category}</span>
                        
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 text-coral-peach font-bold font-sans">
                          <Star className="h-3 w-3 fill-coral-peach" />
                          <span>{product.rating}</span>
                          <span className="text-charcoal-dim/50 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-charcoal-base group-hover:text-coral-peach transition-colors duration-300 leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* Highlighted key ingredients benefits */}
                    <div className="space-y-1 py-1.5 border-t border-cream-dark/30">
                      {product.benefits.map((benefit, i) => (
                        <p key={i} className="text-[10px] text-charcoal-dim leading-none flex items-center gap-1.5">
                          <span className="h-1.2 w-1.2 rounded-full bg-sage-olive flex-shrink-0" />
                          {benefit}
                        </p>
                      ))}
                    </div>

                    {/* Pricing & Add to Cart Trigger */}
                    <div className="flex justify-between items-center pt-3 border-t border-cream-dark/30 mt-auto">
                      <span className="text-base sm:text-lg font-black text-charcoal-base">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category
                        })}
                        className="rounded-full bg-coral-peach/10 hover:bg-coral-peach border border-coral-peach/30 hover:border-coral-peach text-coral-peach hover:text-white px-4 py-2 text-xs font-bold shadow-xs hover:shadow-premium transition-all duration-300 flex items-center gap-1.5 group/btn transform active:scale-95"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-rotate-6" />
                        Add to Bag
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
