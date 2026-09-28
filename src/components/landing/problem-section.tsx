import React from "react";

export function ProblemSection() {
  return (
    <section id="problem" className="problem section-pad relative z-20 bg-white">
      <div className="container narrow">
        <div className="eyebrow centered">THE FIVE-APP PROBLEM</div>
        <h2>Sound familiar?</h2>
        <div className="pain-grid">
          <div>
            <span className="pain-num">01</span>
            <p>
              Your invoices live in one app, your stock count lives in a notebook, and nobody’s sure
              which number is real.
            </p>
          </div>
          <div>
            <span className="pain-num">02</span>
            <p>You find out you’re out of stock when a customer’s standing at the counter.</p>
          </div>
          <div>
            <span className="pain-num">03</span>
            <p>
              Month-end means three hours reconciling spreadsheets that don’t match your bank
              statement.
            </p>
          </div>
        </div>
        <p className="transition-line">
          Veso Books replaces all of it with one system that already knows the numbers.
        </p>
      </div>
    </section>
  );
}

export default ProblemSection;
