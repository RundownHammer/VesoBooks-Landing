import React from "react";
import { Check } from "lucide-react";

export function ComplianceSection() {
  return (
    <section className="compliance section-pad">
      <div className="container compliance-grid">
        <div className="compliance-visual">
          <div className="tax-card">
            <div className="tax-head">
              <span>INVOICE TOTAL</span>
              <small>INV-0248</small>
            </div>
            <strong>$1,320.00</strong>
            <div className="tax-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="tax-legend">
              <span>
                <i className="purple" /> Subtotal <b>$1,200</b>
              </span>
              <span>
                <i className="navy" /> CGST 5% <b>$60</b>
              </span>
              <span>
                <i className="mint" /> SGST 5% <b>$60</b>
              </span>
            </div>
            <div className="tax-note">
              <Check size={15} /> Tax split calculated per line item
            </div>
          </div>
        </div>

        <div className="compliance-copy">
          <div className="eyebrow">FLEXIBLE BY DESIGN</div>
          <h2>Tax rules, handled — wherever you do business.</h2>
          <p>
            Set any tax rate per product or service, and Veso Books calculates it automatically on
            every invoice. In India, that includes full GST compliance — CGST/SGST/IGST splits,
            e-invoicing and e-way bills, done for you.
          </p>
          <div className="stat-row">
            <div>
              <strong>0–28%+</strong>
              <span>tax rates per line</span>
            </div>
            <div>
              <strong>1 click</strong>
              <span>to export a compliant invoice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComplianceSection;
