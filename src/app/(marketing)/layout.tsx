import React from "react";
import "@/styles/landing.css";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

/**
 * Marketing site layout — carries the unified VesoBooks header, theme, and footer.
 * Used by public pages: /pricing, /blog, etc.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell flex min-h-svh flex-col bg-white text-zinc-950">
      <SiteHeader />
      <div className="flex-1 pt-[76px]">{children}</div>
      <SiteFooter />
    </div>
  );
}
