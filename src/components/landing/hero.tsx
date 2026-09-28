"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProductMockup } from "./product-mockup";
import Aurora from "@/components/ui/aurora";

export function Hero() {
  const scrollToProduct = () => {
    document.querySelector("#product")?.scrollIntoView();
  };

  return (
    <section className="hero relative overflow-hidden">
      <div className="hero-aurora" aria-hidden="true">
        <Aurora colorStops={["#8b5cf6", "#d8b4fe", "#a855f7"]} blend={0.6} amplitude={1.0} speed={0.5} lightMode={true} />
      </div>

      <div className="container hero-grid relative z-10">
        <div className="hero-copy">
          <h1>
            Run your business without switching between <span>five apps.</span>
          </h1>
          <p className="hero-sub">
            Invoicing, inventory, POS, purchases, banking and reports — in one place. Start free, and
            get the whole product when you’re ready for Pro.
          </p>
          <div className="hero-actions">
            <Link href="/sign-up" className="button button-purple">
              Start free <ArrowRight size={17} />
            </Link>
            <button type="button" className="button button-ghost" onClick={scrollToProduct}>
              See how it works <span className="play-dot">▶</span>
            </button>
          </div>
          <p className="micro-trust">
            <Check size={14} /> No credit card required <span>·</span> Set up in under 10 minutes
          </p>
        </div>

        <ProductMockup />
      </div>
    </section>
  );
}

export default Hero;
