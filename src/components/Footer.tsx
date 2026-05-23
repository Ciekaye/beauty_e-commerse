"use client";

import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-charcoal-base text-white pt-24 pb-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Branding, Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tight text-coral-peach">Lumière</span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase font-semibold mt-0.5">Beauty Collective</span>
            </div>
            <p className="text-xs text-white/70 max-w-xs leading-relaxed">
              Dermatologically formulated, vegan, and active bio-organic beauty solutions built to honor your skin's natural radiance and resilience.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 text-white/60">
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-coral-peach hover:text-white transition-all duration-300 transform hover:-translate-y-0.5" aria-label="Instagram">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-coral-peach hover:text-white transition-all duration-300 transform hover:-translate-y-0.5" aria-label="Facebook">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-coral-peach hover:text-white transition-all duration-300 transform hover:-translate-y-0.5" aria-label="Twitter">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1: Shop */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Shop</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#catalog" className="hover:text-coral-peach transition-colors duration-200">Cleansers</a></li>
              <li><a href="#catalog" className="hover:text-coral-peach transition-colors duration-200">Eyeshadows</a></li>
              <li><a href="#catalog" className="hover:text-coral-peach transition-colors duration-200">Hydration Creams</a></li>
              <li><a href="#catalog" className="hover:text-coral-peach transition-colors duration-200">Organic Masks</a></li>
              <li><a href="#catalog" className="hover:text-coral-peach transition-colors duration-200">Glow SPF Fluids</a></li>
            </ul>
          </div>

          {/* Links Column 2: Science */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Science</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#quiz" className="hover:text-coral-peach transition-colors duration-200">Clinical trials</a></li>
              <li><a href="#quiz" className="hover:text-coral-peach transition-colors duration-200">Ingredients Glossary</a></li>
              <li><a href="#quiz" className="hover:text-coral-peach transition-colors duration-200">Dermal Concierge</a></li>
              <li><a href="#" className="hover:text-coral-peach transition-colors duration-200">Vegan Standards</a></li>
              <li><a href="#" className="hover:text-coral-peach transition-colors duration-200">Eco Certification</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Lumière Newsletter</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Join the inner collective. Receive dermatologist advice, custom routines, and 15% off your first order.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isSubmitted) setIsSubmitted(false);
                }}
                className="w-full rounded-full bg-white/5 py-3 pl-4 pr-12 text-xs text-white placeholder-white/40 border border-white/10 focus:border-coral-peach focus:bg-white/10 outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-coral-peach hover:bg-coral-dark text-white flex items-center justify-center transition-all duration-300 transform active:scale-90"
                aria-label="Subscribe"
              >
                {isSubmitted ? (
                  <Check className="h-4.5 w-4.5" />
                ) : (
                  <ArrowRight className="h-4.5 w-4.5" />
                )}
              </button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-sage-olive font-bold flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-4 w-4 stroke-[2]" />
                  Subscription successful! Check your inbox for the 15% off discount.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Section: Copyright & Secure Badges */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-6 text-[10px] text-white/50 text-center md:text-left">
          <div className="space-y-2">
            <div>
              &copy; {new Date().getFullYear()} Lumière Beauty Collective. All rights reserved.
            </div>
            <p className="max-w-md text-[9px] text-white/40 leading-relaxed italic">
              Disclaimer: Lumière is a completely fictional skincare brand. This website is built purely as a premium portfolio demonstration by Cyvera Digitals. All products, formulations, and statements are entirely fictional.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 py-1 px-2.5 rounded-md text-white/60">
              <ShieldCheck className="h-3.5 w-3.5 text-sage-olive" />
              Secure 256-bit SSL Checkout
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
