"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  field: "skinType" | "concern" | "texture";
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    title: "What is your primary skin type?",
    subtitle: "Understanding your base sebum levels helps us target the correct formulation thickness.",
    field: "skinType",
    options: [
      { value: "oily", label: "Oily / Acne-Prone", description: "Prone to shine, enlarged pores, and occasional breakouts." },
      { value: "dry", label: "Dry / Flaky", description: "Feels tight, lacks moisture, and might have dry patches." },
      { value: "combination", label: "Combination", description: "Oily in the T-zone (forehead, nose, chin) but dry on cheeks." },
      { value: "sensitive", label: "Sensitive / Reactive", description: "Easily irritated, turns red quickly, responds to weather changes." }
    ]
  },
  {
    id: 2,
    title: "What is your primary skin concern?",
    subtitle: "We prioritize ingredients that clinically address your active skin goal.",
    field: "concern",
    options: [
      { value: "dehydration", label: "Dehydration & Dullness", description: "Skin looks tired, lacks plumpness, and feels parched." },
      { value: "redness", label: "Redness & Irritation", description: "Inflammation, uneven red spots, or active sensitivity." },
      { value: "pigmentation", label: "Pigmentation / Spots", description: "Sun spots, post-acne dark marks, or overall uneven complexion." },
      { value: "aging", label: "Fine Lines & Wrinkles", description: "Loss of elasticity, fine creases around eyes, or sagging." }
    ]
  },
  {
    id: 3,
    title: "What texture do you prefer?",
    subtitle: "The tactile sensation of skincare changes how it absorbs and feels on your skin.",
    field: "texture",
    options: [
      { value: "mist", label: "Lightweight Cooling Mist", description: "Instant refreshing moisture that absorbs in seconds." },
      { value: "cream", label: "Rich, Velvety Cream", description: "Deeply nourishing emollient layer that seals in moisture." },
      { value: "serum", label: "Silky Serum / Oil", description: "Active-concentrated slip that layer-absorbs deeply." }
    ]
  }
];

// Mock database for matching products
const quizRecommendations = [
  {
    key: "oily-dehydration-mist",
    id: "h1",
    name: "Hyaluronic Acid Cleanser",
    price: 10.20,
    image: "/cleanser.png",
    category: "Skincare",
    matchScore: 98,
    benefits: ["Ultra-deep cellular hydration", "Controls shine without stripping", "Calms inflamed active skin"],
    reasoning: "Based on your oily skin prone to dehydration, our AURA Hydra-Mist Cleanser delivers pure hyaluronic hydration in a zero-weight mist, stabilizing moisture levels without clogging pores."
  },
  {
    key: "dry-dehydration-cream",
    id: "c1",
    name: "Royal Rose Hydration Cream",
    price: 24.50,
    image: "/cleanser.png", // reusing image
    category: "Creams",
    matchScore: 96,
    benefits: ["Locks moisture for 48 hours", "Restores damaged barrier lipids", "Soft floral calming aroma"],
    reasoning: "Your dry skin requires a rich lipid seal. The Royal Rose Cream restores skin moisture barrier lipids, providing long-lasting hydration."
  },
  {
    key: "sensitive-redness-mist",
    id: "h1",
    name: "Hyaluronic Acid Cleanser",
    price: 10.20,
    image: "/cleanser.png",
    category: "Skincare",
    matchScore: 99,
    benefits: ["Instant cooling mist relief", "Clinically calms redness", "Alcohol-free & hypoallergenic"],
    reasoning: "Sensitive skin facing redness needs immediate, non-touch hydration. Our Hydra-Mist Cleanser calms skin receptors instantly upon contact."
  },
  {
    key: "makeup-glam-eyeshadow",
    id: "h2",
    name: "Glitter Pearlescent Eyeshadow",
    price: 3.40,
    image: "/eyeshadow.png",
    category: "Eyes / Makeup",
    matchScore: 92,
    benefits: ["Zero pigment fallout", "Waterproof 12-hour wear", "Iridescent dual-chromes"],
    reasoning: "For your texture profile, we recommend pairing our skincare with our flagship waterproof Eyeshadow. Its organic mineral powders are highly tolerated by all skin types."
  }
];

export default function SkinQuiz() {
  const cartContext = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    skinType: "",
    concern: "",
    texture: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<typeof quizRecommendations[0] | null>(null);

  const handleSelectOption = (field: "skinType" | "concern" | "texture", value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    
    // Auto-advance with subtle delay for better feel
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Run analysis
        handleCalculateResult();
      }
    }, 250);
  };

  const handleCalculateResult = () => {
    setIsAnalyzing(true);
    
    // Simulate premium cosmetic skin analysis calculation
    setTimeout(() => {
      // Find recommendation based on answers
      // Default fallback is Cleanser (our hero product h1)
      const lookupKey = `${answers.skinType}-${answers.concern}-${answers.texture}`;
      let matched = quizRecommendations.find(
        (rec) => rec.key === lookupKey || rec.key.includes(answers.skinType) || rec.key.includes(answers.concern)
      );
      
      if (!matched) {
        // default fallback
        matched = quizRecommendations[0];
      }
      
      setRecommendation(matched);
      setIsAnalyzing(false);
      setCurrentStep(quizQuestions.length); // go to result step
    }, 1800);
  };

  const handleReset = () => {
    setAnswers({ skinType: "", concern: "", texture: "" });
    setCurrentStep(0);
    setRecommendation(null);
  };

  return (
    <section id="quiz" className="py-20 bg-cream-light border-y border-cream-dark/30 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-sage-olive/5 blur-3xl -z-10" />
      <div className="absolute left-[-50px] bottom-0 h-64 w-64 rounded-full bg-coral-peach/5 blur-2xl -z-10" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-sage-dark uppercase flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-coral-peach animate-pulse" />
            Lumière AI Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-charcoal-base">
            Find Your Match in 60 Seconds
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-dim leading-relaxed">
            Answer 3 quick dermatological questions. Our custom formula engine analyzes your skin lipid barrier and recommends the exact beauty match for your daily routine.
          </p>
        </div>

        {/* Quiz Interface Box */}
        <div className="w-full bg-white rounded-[32px] border border-cream-dark/20 shadow-premium p-6 sm:p-10 min-h-[420px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Progress Indicator */}
          {currentStep < quizQuestions.length && (
            <div className="w-full mb-8">
              <div className="flex justify-between items-center text-xs font-bold text-charcoal-dim mb-2 uppercase tracking-wider">
                <span>Diagnostic Progress</span>
                <span className="text-coral-peach">Step {currentStep + 1} of {quizQuestions.length}</span>
              </div>
              <div className="h-1.5 w-full bg-cream-base rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-coral-peach rounded-full"
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1 to 3 Questions */}
            {currentStep < quizQuestions.length && !isAnalyzing && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-center"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-charcoal-base">
                    {quizQuestions[currentStep].title}
                  </h3>
                  <p className="text-xs text-charcoal-dim mt-1.5 max-w-xl">
                    {quizQuestions[currentStep].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizQuestions[currentStep].options.map((option) => {
                    const isSelected = answers[quizQuestions[currentStep].field] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelectOption(quizQuestions[currentStep].field, option.value)}
                        className={`text-left p-4 rounded-2xl transition-all duration-300 transform active:scale-99 hover:-translate-y-0.5 ${
                          isSelected 
                            ? "bg-coral-peach text-white shadow-premium" 
                            : "bg-cream-light/60 text-charcoal-base hover:bg-cream-light/95 hover:shadow-card shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-bold text-xs sm:text-sm ${isSelected ? "text-white" : "text-charcoal-base"}`}>{option.label}</span>
                          {isSelected && (
                            <span className="h-5 w-5 rounded-full bg-white text-coral-peach flex items-center justify-center">
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] sm:text-xs mt-1 transition-colors duration-300 ${isSelected ? "text-white/90" : "text-charcoal-dim/85"}`}>{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* AI Calculation Analysis Loader */}
            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-6"
              >
                <div className="relative h-20 w-20 flex items-center justify-center">
                  {/* Spinning glowing rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-coral-peach"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dotted border-sage-olive"
                  />
                  <Sparkles className="h-8 w-8 text-coral-peach animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-lg text-charcoal-base">AI Formula Matching...</h4>
                  <p className="text-xs text-charcoal-dim max-w-xs mx-auto">
                    Analyzing lipid barrier thickness, ingredient concentration tolerance, and hydration retention coefficients.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Recommendation Result Screen */}
            {currentStep === quizQuestions.length && recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                
                {/* Result Product Shot */}
                <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                  <span className="text-[10px] text-sage-dark font-extrabold uppercase tracking-widest">
                    {recommendation.matchScore}% Match Found
                  </span>
                  
                  {/* Visual Frame */}
                  <div className="relative h-44 w-44 rounded-3xl bg-cream-light flex items-center justify-center overflow-hidden border border-cream-dark/30 group">
                    <div className="absolute inset-4 rounded-2xl bg-sage-olive/25 -z-10 group-hover:scale-105 transition-transform duration-300" />
                    <Image
                      src={recommendation.image}
                      alt={recommendation.name}
                      width={120}
                      height={120}
                      className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-charcoal-base leading-tight">
                      {recommendation.name}
                    </h4>
                    <span className="text-xs font-bold text-coral-peach mt-0.5 block">
                      ${recommendation.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Recommendation Copy Details */}
                <div className="md:col-span-8 space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold font-serif text-charcoal-base">
                      Your Beauty Match: AURA Formulation
                    </h3>
                    <p className="text-xs text-charcoal-dim leading-relaxed">
                      {recommendation.reasoning}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-base">
                    {recommendation.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 font-semibold">
                        <span className="h-4.5 w-4.5 rounded-full bg-coral-light/60 text-coral-dark flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Security Certifications */}
                  <div className="flex gap-4 border-y border-cream-dark/40 py-2.5 text-[10px] text-charcoal-dim">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-sage-olive" />
                      <span>Dermatologist Approved</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-coral-peach" />
                      <span>100% Vegan & Bio-Clean</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col xs:flex-row gap-4 items-stretch xs:items-center">
                    <button
                      onClick={() => cartContext.addToCart({
                        id: recommendation.id,
                        name: recommendation.name,
                        price: recommendation.price,
                        image: recommendation.image,
                        category: recommendation.category
                      })}
                      className="rounded-full bg-coral-peach text-white py-3.5 px-8 font-bold text-xs sm:text-sm tracking-wide shadow-premium hover:bg-coral-dark hover:shadow-lg transition-all duration-300 flex-1 flex items-center justify-center gap-2"
                    >
                      Add Diagnostic Match to Bag
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={handleReset}
                      className="rounded-full bg-cream-dark hover:bg-cream-dark/85 text-charcoal-base font-bold text-xs py-3.5 px-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Retake Quiz
                    </button>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Consultation Disclaimer footer inside the box */}
          {currentStep < quizQuestions.length && (
            <div className="mt-6 border-t border-cream-dark/30 pt-4 flex flex-col xs:flex-row justify-between items-center text-[10px] text-charcoal-dim/70 gap-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-sage-olive" />
                Data-secured & privacy-compliant diagnostic
              </span>
              <span>Need help? Contact beauty concierge</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
