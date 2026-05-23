"use client";

import React, { useState } from "react";
import { Sparkles, Check, HelpCircle, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Ingredient {
  id: string;
  name: string;
  chemicalName: string;
  concentration: string;
  description: string;
  benefits: string[];
  hydrationRate: number; // out of 100
  toleranceRate: number; // out of 100
  absorptionRate: number; // out of 100
  source: string;
}

const activeIngredients: Ingredient[] = [
  {
    id: "ia1",
    name: "Hyaluronic Acid",
    chemicalName: "Sodium Hyaluronate (Tri-Molecular Weight)",
    concentration: "2.4% Active Complex",
    description: "Our engineered tri-molecular hyaluronic acid operates across three skin layers. Micro-molecules penetrate deep to lock cell moisture, while macro-molecules form a breathable glass barrier on the surface to prevent transepidermal water loss.",
    benefits: ["Plumps fine skin creases instantly", "Accelerates barrier micro-repair", "Increases cellular water volume by 1000x"],
    hydrationRate: 98,
    toleranceRate: 95,
    absorptionRate: 92,
    source: "Naturally fermented from organic glucose."
  },
  {
    id: "ia2",
    name: "Organic Damask Rose",
    chemicalName: "Rosa Damascena Distillate",
    concentration: "15% Bio-Hydrosol",
    description: "Steam-distilled from handpicked Bulgarian Damask Rose petals, this premium hydrosol is loaded with anti-inflammatory flavonoids and natural astringent properties. It calms dilated capillaries and balances natural sebum pH without drying.",
    benefits: ["Soothes redness and spider veins", "Rich in vitamin C antioxidants", "Tightens pores and refines texture"],
    hydrationRate: 85,
    toleranceRate: 90,
    absorptionRate: 88,
    source: "Sustainably harvested from high-valley farms."
  },
  {
    id: "ia3",
    name: "French Chamomile Extract",
    chemicalName: "Chamomilla Recutita (Matricaria) Extract",
    concentration: "4.5% Soothing Extract",
    description: "Rich in active apigenin and bisabolol, our French Chamomile extract acts directly on skin thermal receptors to decrease hyper-sensitivity signals. Excellent for locking moisture in eczema-prone or easily irritated skin structures.",
    benefits: ["Reduces active inflammation signals", "Evens out hyperpigmentation marks", "Stabilizes reactive skin barrier function"],
    hydrationRate: 80,
    toleranceRate: 100,
    absorptionRate: 84,
    source: "Organically grown and cold-pressed in France."
  }
];

export default function IngredientExplorer() {
  const [selectedId, setSelectedId] = useState("ia1");
  const selectedIng = activeIngredients.find((ing) => ing.id === selectedId) || activeIngredients[0];

  return (
    <section className="py-24 bg-cream-light relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-coral-peach/5 blur-3xl -z-10" />
      <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-sage-olive/5 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <span className="text-[10px] text-sage-dark font-extrabold uppercase tracking-widest bg-sage-light px-3 py-1 border border-sage-olive/25 rounded-full">
            Clinical Aesthetics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-charcoal-base">
            Bioactive Ingredient Explorer
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-dim leading-relaxed">
            At Glamoura, science meets beauty. Click through our primary clinical components below to inspect their molecular properties, concentrations, and dermatological specifications.
          </p>
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Vertical Tabs selection */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
            {activeIngredients.map((ing) => {
              const isSelected = ing.id === selectedId;
              return (
                <button
                  key={ing.id}
                  onClick={() => setSelectedId(ing.id)}
                  className={`text-left p-6 rounded-3xl border transition-all duration-300 transform active:scale-99 flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-coral-peach shadow-premium translate-x-2"
                      : "bg-cream-base/40 border-cream-dark/50 hover:bg-white/50"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${isSelected ? 'text-coral-peach' : 'text-charcoal-dim'}`}>
                      {ing.concentration}
                    </span>
                    <h3 className="font-extrabold text-base text-charcoal-base">{ing.name}</h3>
                  </div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-coral-peach text-white scale-110' : 'bg-cream-dark/55 text-charcoal-dim'
                  }`}>
                    <Sparkles className="h-4.5 w-4.5" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Scientific Spec panel with AnimatePresence */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIng.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-[36px] p-6 sm:p-10 border border-cream-dark/20 shadow-premium flex flex-col justify-between"
              >
                {/* Panel Header */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-cream-dark/45 pb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold font-serif text-charcoal-base">{selectedIng.name}</h3>
                      <p className="text-xs text-sage-dark font-medium italic mt-0.5">{selectedIng.chemicalName}</p>
                    </div>
                    <span className="text-xs font-black text-coral-peach uppercase tracking-widest bg-coral-light/60 px-3 py-1 border border-coral-peach/25 rounded-full self-start sm:self-auto">
                      {selectedIng.concentration}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-dim leading-relaxed">
                    {selectedIng.description}
                  </p>
                </div>

                {/* Radar Specs Index (Interactive progress sliders) */}
                <div className="my-8 space-y-4.5 bg-cream-light/35 p-5 rounded-3xl border border-cream-dark/30">
                  <h4 className="text-xs font-extrabold text-charcoal-base uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-coral-peach" />
                    Molecular Specification Index
                  </h4>

                  {/* Spec 1: Hydration */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-charcoal-base">
                      <span>Cellular Hydration Depth</span>
                      <span className="text-coral-peach">{selectedIng.hydrationRate}%</span>
                    </div>
                    <div className="h-2 w-full bg-cream-dark/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedIng.hydrationRate}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-coral-peach rounded-full"
                      />
                    </div>
                  </div>

                  {/* Spec 2: Skin Tolerance */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-charcoal-base">
                      <span>Dermal Sensitivity Tolerance</span>
                      <span className="text-sage-dark">{selectedIng.toleranceRate}%</span>
                    </div>
                    <div className="h-2 w-full bg-cream-dark/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedIng.toleranceRate}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-sage-olive rounded-full"
                      />
                    </div>
                  </div>

                  {/* Spec 3: Absorption Rate */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-charcoal-base">
                      <span>Sub-Dermal Absorption Speed</span>
                      <span className="text-charcoal-base">{selectedIng.absorptionRate}%</span>
                    </div>
                    <div className="h-2 w-full bg-cream-dark/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedIng.absorptionRate}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-charcoal-base rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Benefits Checklist & Source info */}
                <div className="space-y-5 border-t border-cream-dark/40 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-base">
                    {selectedIng.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 font-bold">
                        <span className="h-4.5 w-4.5 rounded-full bg-sage-light text-sage-dark flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-charcoal-dim border-t border-cream-dark/30 pt-4 gap-2">
                    <span>
                      <strong>Clinical Source:</strong> {selectedIng.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5 text-sage-olive" />
                      In-vivo lab tested over 12 weeks
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
