"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { VesoLogo } from "@/components/brand/veso-logo";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`logo ${inverse ? "logo-inverse" : ""}`} aria-label="Veso Books home">
      <VesoLogo size={30} className="shrink-0" />
      <span>
        veso<span>books</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView();
      }
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <header className={`site-nav ${scrolled ? "scrolled" : ""} ${mobileOpen ? "open" : ""}`.trim()}>
      <div className="container nav-inner">
        <Logo inverse={!scrolled && !mobileOpen} />

        <nav className={mobileOpen ? "open" : ""}>
          <Link
            href="/#product"
            onClick={(e) => handleNavClick("#product", e)}
          >
            Product
          </Link>
          <Link
            href="/#pricing"
            onClick={(e) => handleNavClick("#pricing", e)}
          >
            Pricing
          </Link>
          <Link
            href="/#compare"
            onClick={(e) => handleNavClick("#compare", e)}
          >
            Compare
          </Link>
          <Link
            href="/#faq"
            onClick={(e) => handleNavClick("#faq", e)}
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
        </nav>

        <div className="nav-actions">
          <Link href="/sign-in" className="sign-in">
            Sign in
          </Link>
          <Link href="/sign-up" className="button button-purple small">
            Start free <ArrowRight size={15} />
          </Link>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export default SiteHeader;
