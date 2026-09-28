import React from "react";
import { ArrowRight, BarChart3, Gauge, Package, Receipt, ShieldCheck, Users, Zap } from "lucide-react";
import { VesoLogo } from "@/components/brand/veso-logo";

export function ProductMockup() {
  return (
    <div className="product-stage" aria-label="Veso Books invoice dashboard preview">
      <div className="stage-glow" />
      <div className="float-chip chip-one">
        <span className="status-dot mint" /> Payment received <strong>$1,280.00</strong>
      </div>
      <div className="float-chip chip-two">
        <Zap size={14} /> Tax calculated automatically
      </div>

      <div className="invoice-window">
        <div className="window-top">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>veso / invoices / INV-0248</span>
          <span className="window-secure">
            <ShieldCheck size={13} /> Secure
          </span>
        </div>

        <div className="window-body">
          <div className="mock-sidebar">
            <div className="mini-logo">
              <VesoLogo size={18} />
            </div>
            <div className="side-line active">
              <Gauge size={15} />
            </div>
            <div className="side-line">
              <Receipt size={15} />
            </div>
            <div className="side-line">
              <Package size={15} />
            </div>
            <div className="side-line">
              <BarChart3 size={15} />
            </div>
            <div className="side-line bottom">
              <Users size={15} />
            </div>
          </div>

          <div className="mock-content">
            <div className="mock-header">
              <div>
                <small>INVOICE</small>
                <h4>INV-0248</h4>
              </div>
              <span className="paid-pill">Paid</span>
            </div>

            <div className="mock-meta">
              <div>
                <small>FROM</small>
                <b>Veso Books</b>
                <span>hello@vesobooks.app</span>
              </div>
              <div>
                <small>BILL TO</small>
                <b>Northstar Studio</b>
                <span>accounts@northstar.co</span>
              </div>
              <div>
                <small>ISSUED</small>
                <b>Sep 24, 2026</b>
                <span>Due on receipt</span>
              </div>
            </div>

            <div className="line-items">
              <div className="table-head">
                <span>ITEM</span>
                <span>QTY</span>
                <span>RATE</span>
                <span>AMOUNT</span>
              </div>
              <div className="table-row">
                <span>
                  <b>Brand strategy sprint</b>
                  <small>Professional services</small>
                </span>
                <span>1</span>
                <span>$1,000</span>
                <strong>$1,000</strong>
              </div>
              <div className="table-row">
                <span>
                  <b>Tax &amp; compliance setup</b>
                  <small>Product &amp; service</small>
                </span>
                <span>1</span>
                <span>$200</span>
                <strong>$200</strong>
              </div>
            </div>

            <div className="mock-total">
              <div>
                <span>Subtotal</span>
                <b>$1,200.00</b>
              </div>
              <div>
                <span>
                  Tax <em>10%</em>
                </span>
                <b>$120.00</b>
              </div>
              <div className="total-line">
                <span>Total due</span>
                <strong>$1,320.00</strong>
              </div>
            </div>

            <div className="mock-footer">
              <span>
                <ShieldCheck size={13} /> Tax-compliant invoice
              </span>
              <button type="button">
                Send invoice <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductMockup;
