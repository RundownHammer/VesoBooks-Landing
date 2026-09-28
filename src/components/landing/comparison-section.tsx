import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const COMPARISON_ROWS = [
  ["Works from any device", "No", "No", "Yes"],
  ["Inventory across locations", "Manual", "Limited", "Built in"],
  ["POS checkout", "No", "Separate add-on", "Built in"],
  ["Bank reconciliation", "Manual", "Add-on", "Automatic"],
  ["AI-powered business Q&A", "No", "No", "Yes"],
];

export function ComparisonSection() {
  return (
    <section id="compare" className="compare section-pad">
      <div className="container">
        <div className="section-intro">
          <div>
            <div className="eyebrow">THE SWITCH</div>
            <h2>What you’re actually replacing.</h2>
          </div>
          <Link className="text-link" href="/#pricing">
            See full comparison <ArrowRight size={15} />
          </Link>
        </div>

        <div className="compare-table">
          <div className="compare-row compare-head">
            <span>Capability</span>
            <span>Spreadsheets</span>
            <span>Legacy desktop</span>
            <span className="veso-col">Veso Books</span>
          </div>

          {COMPARISON_ROWS.map((row) => (
            <div className="compare-row" key={row[0]}>
              {row.map((cell, i) => (
                <span key={`${row[0]}-${cell}-${i}`} className={i === 3 ? "veso-col" : ""}>
                  {i === 3 && <Check size={14} />}
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;
