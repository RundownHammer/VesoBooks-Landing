"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const FAQS: [string, string][] = [
  [
    "Is Free actually free?",
    "Yes. Free is a real, usable plan with no credit card required. It is capped by usage — seats, invoices, products and locations — not by features.",
  ],
  [
    "What changes when I move to Pro?",
    "Pro removes the usage limits and includes the whole product: unlimited locations, POS offline mode, banking, all reports, AI insights, projects and team permissions.",
  ],
  [
    "Do I need a card for the Pro trial?",
    "Yes. Pro is a free month of the paid plan, so a payment method is required up front. You will be charged only after the trial ends, and you can cancel before then.",
  ],
  [
    "Can I use Veso Books outside India?",
    "Absolutely. The tax engine supports flexible rates per line item for VAT, sales tax and other percentage-based regimes. India GST compliance is built in where applicable.",
  ],
  [
    "Can my team work from multiple locations?",
    "Yes. Invite teammates, assign roles and scope their access to the store or warehouse where they work.",
  ],
  [
    "Can I export my data?",
    "Yes. Pro includes full data export, daily backups and one-click CSV or Excel exports for your accountant.",
  ],
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="faq section-pad">
      <div className="container faq-grid">
        <div>
          <div className="eyebrow">QUESTIONS, ANSWERED</div>
          <h2>Good to know.</h2>
          <p>
            Still deciding? Here’s the straight answer to the questions small-business owners ask us
            most.
          </p>
          <a className="text-link" href="mailto:hello@vesobooks.in">
            Ask us anything <ArrowRight size={15} />
          </a>
        </div>

        <div className="faq-list">
          {FAQS.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <ChevronDown size={18} />
                </button>
                <div className="faq-answer">
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
