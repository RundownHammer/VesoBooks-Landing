"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function IncludedSection() {
  const scrollToPricing = () => {
    document.querySelector("#pricing")?.scrollIntoView();
  };

  return (
    <section className="included">
      <div className="container included-inner">
        <div className="included-symbol">
          <Sparkles size={29} />
        </div>
        <div>
          <div className="eyebrow mint-eyebrow">ONE SIMPLE PROMISE</div>
          <h2>
            Start free. Go Pro when you’re ready — <em>everything’s already unlocked.</em>
          </h2>
          <p>
            Inventory, POS, purchases, banking, projects and AI insights aren’t locked behind a higher
            tier. Try the core workflow free, and when you move to Pro, you get the whole product.
          </p>
        </div>
        <button type="button" className="button button-light" onClick={scrollToPricing}>
          See pricing <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

export default IncludedSection;
