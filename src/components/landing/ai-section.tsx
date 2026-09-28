import React from "react";
import { ShieldCheck } from "lucide-react";

export function AiSection() {
  return (
    <section className="ai-section section-pad">
      <div className="container ai-grid">
        <div className="ai-copy">
          <div className="eyebrow mint-eyebrow">YOUR BUSINESS, ANSWERED</div>
          <h2>Ask your business a question. Get a real answer.</h2>
          <p>
            Which customers owe me the most right now? What sold best last month? Ask in plain
            English — Veso Books reads your real data and answers in seconds.
          </p>
          <div className="prompt-chips">
            <span>Top 5 overdue customers</span>
            <span>Best-selling product this month</span>
            <span>Net profit last quarter</span>
          </div>
          <small>
            <ShieldCheck size={14} /> Read-only — the AI can never edit your data or see another
            business’s data.
          </small>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/Illustrations/AI%20chat/chat.png"
            alt="Ask Veso AI a question and get answers from your real business data"
            className="w-full max-w-[580px] h-auto object-contain rounded-2xl drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default AiSection;
