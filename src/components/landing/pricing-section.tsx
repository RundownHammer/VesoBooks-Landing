import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="pricing section-pad">
      <div className="container">
        <div className="center-intro">
          <div className="eyebrow centered">PRICING</div>
          <h2>Start free. Upgrade when you’re ready for everything.</h2>
          <p>
            Free is a real, usable plan — not a demo. Pro removes every limit and adds the full
            feature set, with a 1-month free trial.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="price-card free-card">
            <div className="price-top">
              <span className="plan-kicker">FOR GETTING STARTED</span>
              <h3>Free</h3>
              <p>Everything you need to get started with billing.</p>
              <div className="price">
                <strong>$0</strong>
                <span>forever</span>
              </div>
            </div>

            <ul>
              {[
                "1 seat · 1 warehouse/location",
                "100 products · 50 services",
                "50 invoices per month",
                "25 vendors · 25 customers",
                "Core invoicing, inventory and POS",
              ].map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/sign-up" className="button button-outline">
              Start free <ArrowRight size={16} />
            </Link>
            <small>No credit card required. Upgrade anytime — nothing you’ve entered is lost.</small>
          </div>

          {/* Pro Tier */}
          <div className="price-card pro-card">
            <div className="pro-orb" />
            <div className="price-top">
              <span className="plan-kicker">FOR THE WHOLE BUSINESS</span>
              <h3>Pro</h3>
              <p>For businesses that have outgrown Free and want the whole product.</p>
              <div className="price">
                <strong>$29</strong>
                <span>/ month</span>
              </div>
              <span className="trial-tag">1 month free, then billed monthly</span>
            </div>

            <ul>
              {[
                "Unlimited invoices, customers, vendors & products",
                "Full inventory across locations",
                "POS counter with offline mode",
                "Purchases, banking & reconciliation",
                "All reports + CSV/Excel export",
                "AI business assistant",
                "Projects, tasks & time tracking",
                "Role-based team access",
                "India GST e-invoicing where applicable",
              ].map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/sign-up" className="button button-mint">
              Try Pro free for 1 month <ArrowRight size={16} />
            </Link>
            <small>Card required for trial. Cancel before the month ends and you won’t be charged.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
