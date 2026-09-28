import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Store, Users } from "lucide-react";

export function SecuritySection() {
  return (
    <section className="security section-pad">
      <div className="container">
        <div className="security-head">
          <div>
            <div className="eyebrow">TRUST BUILT IN</div>
            <h2>Your data, your control.</h2>
          </div>
          <p>
            Serious about your books? So are we. Veso Books keeps access clear, activity visible and
            your data backed up.
          </p>
        </div>

        <div className="security-grid">
          <div>
            <span className="security-icon">
              <Users size={22} />
            </span>
            <h3>Role-based access</h3>
            <p>Give your cashier POS access, not your P&amp;L.</p>
            <Link href="/#pricing">
              Learn more <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <span className="security-icon">
              <Store size={22} />
            </span>
            <h3>Location scoping</h3>
            <p>Staff only see the warehouse or store they work in.</p>
            <Link href="/#pricing">
              Learn more <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <span className="security-icon">
              <ShieldCheck size={22} />
            </span>
            <h3>Full audit trail</h3>
            <p>Every invoice, payment and stock change is logged, forever.</p>
            <Link href="/#pricing">
              Learn more <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySection;
