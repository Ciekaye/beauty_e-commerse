"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, X, Plus, Minus, Trash2, ChevronDown, User, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const { 
    cart, 
    isOpen, 
    setIsOpen, 
    cartCount, 
    cartSubtotal, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <header className="sticky top-0 z-40 w-full glass-panel shadow-premium transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex flex-col items-start select-none group">
                <div className="flex items-baseline text-2xl md:text-3xl font-bold tracking-tight">
                  <span className="text-coral-peach transition-colors duration-300 group-hover:text-coral-dark">Glam</span>
                  <span className="text-sage-dark font-medium transition-colors duration-300 group-hover:text-sage-olive">oura</span>
                </div>
                <span className="text-[10px] text-charcoal-dim tracking-widest uppercase font-semibold -mt-1 scale-95 origin-left">Beauty Collective</span>
              </a>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-charcoal-base">
              <a href="#" className="relative py-2 text-coral-peach transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-coral-peach">
                Home
              </a>
              <a href="#sales" className="relative py-2 hover:text-coral-peach transition-colors group">
                Sales
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-coral-peach transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="#catalog" className="relative py-2 hover:text-coral-peach transition-colors group">
                Categories
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-coral-peach transition-all duration-300 group-hover:w-full" />
              </a>
              <div className="relative py-2 hover:text-coral-peach transition-colors flex items-center gap-1 cursor-pointer group">
                More
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-coral-peach transition-all duration-300 group-hover:w-full" />
              </div>
            </nav>

            {/* Search, Cart & Profile (Right Side) */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Search Bar */}
              <div className="relative hidden sm:block w-48 md:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-cream-dark/40 py-2 pl-4 pr-10 text-xs text-charcoal-base placeholder-charcoal-dim/70 outline-none border border-transparent focus:border-sage-olive/40 focus:bg-cream-light transition-all duration-300"
                />
                <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-charcoal-dim/70" />
              </div>

              {/* Favorites (Subtle engagement) */}
              <button className="p-2 text-charcoal-base hover:text-coral-peach transition-colors duration-200 relative hidden xs:block">
                <Heart className="h-5 w-5" />
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-charcoal-base hover:text-coral-peach transition-all duration-300 relative group"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                
                {/* Cart Quantity Badge with scale animation */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral-peach text-[10px] font-bold text-white shadow-premium"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Profile Avatar */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-dark/70 text-charcoal-dim hover:text-coral-peach hover:bg-cream-dark transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel shadow-premium py-2 text-sm text-charcoal-base overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-cream-dark/40">
                        <p className="font-semibold text-xs text-charcoal-dim">Welcome to Glamoura</p>
                        <p className="text-[10px] text-charcoal-dim/70 truncate">guest@glamoura.com</p>
                      </div>
                      <a href="#" className="block px-4 py-2.5 hover:bg-cream-light hover:text-coral-peach transition-colors">My Profile</a>
                      <a href="#" className="block px-4 py-2.5 hover:bg-cream-light hover:text-coral-peach transition-colors">Orders History</a>
                      <a href="#" className="block px-4 py-2.5 hover:bg-cream-light hover:text-coral-peach transition-colors">Settings</a>
                      <div className="border-t border-cream-dark/40 my-1"></div>
                      <button className="w-full text-left px-4 py-2.5 text-xs text-coral-dark hover:bg-coral-light/20 transition-colors font-medium">
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Cart Slider Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-light shadow-premium flex flex-col border-l border-cream-dark/30"
            >
              {/* Cart Header */}
              <div className="p-6 flex items-center justify-between border-b border-cream-dark/40">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-xl font-bold font-serif text-charcoal-base">Shopping Bag</h2>
                  <span className="text-xs text-charcoal-dim">({cartCount} items)</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-charcoal-dim hover:text-coral-peach hover:bg-cream-dark/40 rounded-full transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="h-20 w-20 rounded-full bg-cream-dark/30 flex items-center justify-center text-coral-peach animate-pulse">
                      <ShoppingBag className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-charcoal-base">Your bag is empty</h3>
                      <p className="text-xs text-charcoal-dim mt-1 max-w-xs">
                        Looks like you haven't added anything to your cart yet. Let's find something beautiful for you!
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="rounded-full bg-coral-peach px-6 py-2.5 text-xs font-semibold text-white shadow-premium hover:bg-coral-dark transition-all duration-300"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      key={item.id}
                      className="flex gap-4 p-3 rounded-2xl bg-white border border-cream-dark/20 shadow-card group"
                    >
                      {/* Product Image */}
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream-dark/20 border border-cream-dark/30">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-semibold text-xs text-charcoal-base truncate pr-2 group-hover:text-coral-peach transition-colors duration-200">
                              {item.name}
                            </h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-charcoal-dim hover:text-coral-dark p-1 rounded transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-sage-dark font-semibold mt-0.5 uppercase tracking-wider">{item.category || "Glamoura Skincare"}</p>
                        </div>

                        {/* Price & Quantity Adjuster */}
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-bold text-charcoal-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center border border-cream-dark/60 rounded-full bg-cream-light px-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-coral-peach transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-semibold px-2 w-6 text-center select-none text-charcoal-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-coral-peach transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-cream-dark/40 space-y-4 shadow-premium">
                  <div className="space-y-1.5 text-xs text-charcoal-base">
                    <div className="flex justify-between">
                      <span className="text-charcoal-dim">Subtotal</span>
                      <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-dim">Shipping</span>
                      <span className="text-sage-dark font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-dim">Estimated Tax</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <div className="border-t border-cream-dark/30 pt-2.5 flex justify-between text-sm font-bold">
                      <span>Total Amount</span>
                      <span className="text-coral-peach">${cartSubtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("Checkout Flow Simulated! Thank you for buying from Glamoura.")}
                    className="w-full py-3.5 rounded-full bg-coral-peach hover:bg-coral-dark text-white font-bold text-sm tracking-wide shadow-premium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Proceed to Checkout
                    <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="text-[10px] text-charcoal-dim/70 text-center">
                    Secure checkout. 30-day money-back guarantee.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
