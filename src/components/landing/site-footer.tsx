import React from "react";
import Link from "next/link";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      <div className="container footer-top relative z-10">
        <div>
          <Logo inverse />
          <p>The one app a small business needs to run its money — from anywhere.</p>
          <div className="footer-status">
            <i /> All systems operational
          </div>
        </div>

        <div className="footer-links">
          <div>
            <b>Product</b>
            <Link href="/#product">Invoicing</Link>
            <Link href="/#product">Inventory &amp; POS</Link>
            <Link href="/#product">Banking</Link>
            <Link href="/#pricing">Pricing</Link>
          </div>

          <div>
            <b>Company</b>
            <Link href="/#faq">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#faq">Security</Link>
            <a href="mailto:hello@vesobooks.in">Contact</a>
          </div>

          <div>
            <b>Legal</b>
            <Link href="/#faq">Terms</Link>
            <Link href="/#faq">Privacy</Link>
            <Link href="/#faq">Data processing</Link>
          </div>
        </div>
      </div>

      <div className="container footer-bottom relative z-10">
        <span>© 2026 Veso Books. Built for businesses that do more.</span>
        <span>
          Made with clarity <span className="footer-heart">◆</span>
        </span>
      </div>
    </footer>
  );
}

export default SiteFooter;
