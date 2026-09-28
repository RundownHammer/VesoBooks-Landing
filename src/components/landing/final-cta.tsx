import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="eyebrow centered">READY WHEN YOU ARE</div>
        <h2>Stop running your business in five different tabs.</h2>
        <p>
          Start on Free, no credit card needed. Ready for everything? Try Pro free for 1 month.
        </p>
        <Link href="/sign-up" className="button button-purple">
          Start free <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export default FinalCta;
