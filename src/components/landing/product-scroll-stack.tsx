"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Landmark,
  Receipt,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { ScrollStack, ScrollStackItem, ScrollStackRef } from "./scroll-stack";
import { PRODUCT_SECTION_COPY, ProductModuleCopy } from "@/lib/product-features-copy";
import { cn } from "@/lib/utils";

// Module icon mapping
const MODULE_ICONS: Record<string, React.ElementType> = {
  invoicing: Receipt,
  inventory: ShoppingCart,
  purchases: Truck,
  banking: Landmark,
  reports: BarChart3,
  team: Users,
};

// 4 Illustrations per module corresponding to the 4 points
const MODULE_ILLUSTRATIONS: Record<string, string[]> = {
  invoicing: [
    "/Illustrations/Invoices/first.png",
    "/Illustrations/Invoices/second.png",
    "/Illustrations/Invoices/third.png",
    "/Illustrations/Invoices/fourth.png",
  ],
  inventory: [
    "/Illustrations/Inventory&POS/first.png",
    "/Illustrations/Inventory&POS/second.png",
    "/Illustrations/Inventory&POS/third.png",
    "/Illustrations/Inventory&POS/fourth.png",
  ],
  purchases: [
    "/Illustrations/Purchases/first.png",
    "/Illustrations/Purchases/second.png",
    "/Illustrations/Purchases/third.png",
    "/Illustrations/Purchases/fourth.png",
  ],
  banking: [
    "/Illustrations/Banking/first.png",
    "/Illustrations/Banking/second.png",
    "/Illustrations/Banking/third.png",
    "/Illustrations/Banking/fourth.png",
  ],
  reports: [
    "/Illustrations/Reports&AI/first.png",
    "/Illustrations/Reports&AI/second.png",
    "/Illustrations/Reports&AI/third.png",
    "/Illustrations/Reports&AI/fourth.png",
  ],
  team: [
    "/Illustrations/Team/first.png",
    "/Illustrations/Team/second.png",
    "/Illustrations/Team/third.png",
    "/Illustrations/Team/fourth.png",
  ],
};

// Punchy, reduced copy (1 concise sentence per module)
const MODULE_SHORT_COPY: Record<string, { title: string; body: string }> = {
  invoicing: {
    title: "Invoices that pay themselves, almost.",
    body: "Create GST-compliant invoices in under a minute with automated payment tracking and client reminders.",
  },
  inventory: {
    title: "Know what you have, sell it in seconds.",
    body: "One unified catalog across every store and warehouse, plus a barcode checkout fast enough for a queue.",
  },
  purchases: {
    title: "Never lose track of what you ordered or owe.",
    body: "Convert purchase orders to vendor bills with zero re-entry and live warehouse stock intake.",
  },
  banking: {
    title: "Match your books to your bank, instantly.",
    body: "Auto-reconcile bank statements against invoices and bills with daily verified ledger balances.",
  },
  reports: {
    title: "Ten reports accountants charge for, built-in.",
    body: "Profit & loss, GST tax registers, customer aging, and plain-English AI financial queries in one click.",
  },
  team: {
    title: "Bring your whole team in, safely.",
    body: "Granular role-based permissions with store godown scoping and locked cashier POS billing terminals.",
  },
};

// Canonical Button styled EXACTLY like the Hero button
function HeroStyleButton({ label }: { label: string }) {
  return (
    <Link
      href="/sign-up"
      className="button button-purple inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-[13px] font-bold text-white bg-[--purple] hover:bg-[#4323d4] transition-all duration-150 shrink-0 shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap"
    >
      <span>Explore {label}</span>
      <ArrowRight size={14} />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* STYLE A: PANORAMIC 4-COLUMN STRIP (The Inventory & POS card style)         */
/* Used for: Card 1 (Invoicing), Card 3 (Purchases), Card 5 (Reports & AI)    */
/* -------------------------------------------------------------------------- */
function PanoramicCardLayout({
  mod,
  tags,
  hasSparkles = false,
}: {
  mod: ProductModuleCopy;
  tags: string[];
  hasSparkles?: boolean;
}) {
  const images = MODULE_ILLUSTRATIONS[mod.id] || [];
  const copy = MODULE_SHORT_COPY[mod.id] || { title: mod.title, body: mod.body };

  return (
    <div className="flex flex-col justify-between h-full py-1">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-black/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#5835ea] font-semibold uppercase mb-1">
            {hasSparkles && <Sparkles size={13} className="text-[#5835ea]" />}
            {mod.eyebrow}
          </div>
          <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#111111] leading-tight">
            {copy.title}
          </h3>
          <p className="text-sm sm:text-[14px] text-[#55514d] leading-relaxed mt-1 max-w-xl">
            {copy.body}
          </p>
        </div>
        <div className="shrink-0 pt-1 sm:pt-0">
          <HeroStyleButton label={mod.label.toLowerCase()} />
        </div>
      </div>

      {/* 4 Panoramic Columns Side-by-Side (NO cards inside cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 pt-4 flex-1 items-center">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center group transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] mb-2 text-center tracking-normal whitespace-nowrap">
              {tags[idx]}
            </span>
            <img
              src={img}
              alt={tags[idx]}
              className="w-full max-h-[220px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BENTO 1: CARD 2 (INVENTORY & POS) — Asymmetric Hero Left (7/5 Split)       */
/* -------------------------------------------------------------------------- */
function InventoryBentoLayout({ mod }: { mod: ProductModuleCopy }) {
  const images = MODULE_ILLUSTRATIONS.inventory;
  const copy = MODULE_SHORT_COPY.inventory;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 h-full py-1 items-center">
      {/* Left Bento Cell: Header + Large Barcode POS Illustration (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between h-full bg-gradient-to-br from-neutral-50/70 to-white p-5 lg:p-6 rounded-2xl border border-black/[0.05]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#5835ea] font-semibold uppercase mb-1">
            {mod.eyebrow}
          </div>
          <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#111111] leading-tight mb-1">
            {copy.title}
          </h3>
          <p className="text-sm sm:text-[14px] text-[#55514d] leading-relaxed max-w-lg mb-2">
            {copy.body}
          </p>
        </div>

        {/* Large Focal Feature Image */}
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto py-1">
          <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] mb-2 tracking-normal">
            01 · High-speed barcode POS checkout
          </span>
          <img
            src={images[1]}
            alt="Barcode POS Checkout"
            className="w-full max-h-[270px] lg:max-h-[295px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.06)] group-hover:scale-102 transition-transform duration-200"
            loading="eager"
          />
        </div>

        <div className="pt-2">
          <HeroStyleButton label={mod.label.toLowerCase()} />
        </div>
      </div>

      {/* Right Bento Cells: 3 Compact Companion Tiles (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-3 justify-between h-full">
        <div className="flex-1 bg-gradient-to-br from-neutral-50/70 to-white px-5 py-3 rounded-2xl border border-black/[0.05] flex items-center justify-between gap-4 group hover:-translate-y-0.5 transition-transform duration-200">
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] block mb-0.5">
              02 · Multi-store catalog
            </span>
            <p className="text-sm font-medium text-[#111111] leading-snug">
              Warehouse &amp; store stock sync
            </p>
          </div>
          <img
            src={images[0]}
            alt="Multi-Store Sync"
            className="w-[145px] sm:w-[160px] lg:w-[175px] h-[120px] sm:h-[130px] lg:h-[138px] object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>

        <div className="flex-1 bg-gradient-to-br from-neutral-50/70 to-white px-5 py-3 rounded-2xl border border-black/[0.05] flex items-center justify-between gap-4 group hover:-translate-y-0.5 transition-transform duration-200">
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] block mb-0.5">
              03 · Offline counter cache
            </span>
            <p className="text-sm font-medium text-[#111111] leading-snug">
              Keep billing even if internet drops
            </p>
          </div>
          <img
            src={images[2]}
            alt="Offline Cache Sync"
            className="w-[145px] sm:w-[160px] lg:w-[175px] h-[120px] sm:h-[130px] lg:h-[138px] object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>

        <div className="flex-1 bg-gradient-to-br from-neutral-50/70 to-white px-5 py-3 rounded-2xl border border-black/[0.05] flex items-center justify-between gap-4 group hover:-translate-y-0.5 transition-transform duration-200">
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] block mb-0.5">
              04 · Low-stock radar
            </span>
            <p className="text-sm font-medium text-[#111111] leading-snug">
              Reorder alerts before shelves run empty
            </p>
          </div>
          <img
            src={images[3]}
            alt="Low Stock Radar"
            className="w-[145px] sm:w-[160px] lg:w-[175px] h-[120px] sm:h-[130px] lg:h-[138px] object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BENTO 2: CARD 4 (BANKING) — 3-Column Asymmetric Canvas (5/4/3 Split)       */
/* -------------------------------------------------------------------------- */
function BankingBentoLayout({ mod }: { mod: ProductModuleCopy }) {
  const images = MODULE_ILLUSTRATIONS.banking;
  const copy = MODULE_SHORT_COPY.banking;

  return (
    <div className="flex flex-col justify-between h-full py-1">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-black/[0.06]">
        <div>
          <div className="text-xs font-mono tracking-wider text-[#5835ea] font-semibold uppercase mb-1">
            {mod.eyebrow}
          </div>
          <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#111111] leading-tight">
            {copy.title}
          </h3>
          <p className="text-sm sm:text-[14px] text-[#55514d] leading-relaxed mt-1.5 max-w-xl">
            {copy.body}
          </p>
        </div>
        <div className="shrink-0 pt-1 sm:pt-0">
          <HeroStyleButton label={mod.label.toLowerCase()} />
        </div>
      </div>

      {/* Asymmetric 3-Column Bento Below */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 pt-4 flex-1 items-stretch">
        {/* Cell 1: Large Auto-Match Hero (5 Cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-neutral-50/80 to-white p-4 lg:p-5 rounded-2xl border border-black/[0.05] flex flex-col justify-between items-center group">
          <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] self-start mb-1 tracking-normal">
            01 · Automated reconciliation
          </span>
          <div className="flex-1 w-full flex items-center justify-center my-auto py-1">
            <img
              src={images[0]}
              alt="Auto-Match Invoices"
              className="w-full max-h-[260px] lg:max-h-[285px] object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.06)] group-hover:scale-102 transition-transform duration-200"
              loading="lazy"
            />
          </div>
          <p className="text-xs sm:text-[13px] text-[#55514d] font-medium text-center mt-1">
            Smart matching of deposits to open sales invoices
          </p>
        </div>

        {/* Cell 2: Stacked Dual Tiles (4 Cols) */}
        <div className="md:col-span-4 flex flex-col gap-3.5 justify-between">
          <div className="flex-1 bg-gradient-to-br from-neutral-50/80 to-white p-3.5 lg:p-4 rounded-2xl border border-black/[0.05] flex flex-col justify-between items-center group">
            <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] self-start tracking-normal">
              02 · 1-click debit records
            </span>
            <div className="flex-1 w-full flex items-center justify-center py-1">
              <img
                src={images[1]}
                alt="1-Click Debit"
                className="w-full max-w-[280px] max-h-[140px] lg:max-h-[150px] object-contain drop-shadow-xs group-hover:scale-102 transition-transform duration-200"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-neutral-50/80 to-white p-3.5 lg:p-4 rounded-2xl border border-black/[0.05] flex flex-col justify-between items-center group">
            <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] self-start tracking-normal">
              03 · Bulk settlements
            </span>
            <div className="flex-1 w-full flex items-center justify-center py-1">
              <img
                src={images[2]}
                alt="Bulk Settle"
                className="w-full max-w-[280px] max-h-[140px] lg:max-h-[150px] object-contain drop-shadow-xs group-hover:scale-102 transition-transform duration-200"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Cell 3: Live Balance Continuous Audit (3 Cols) */}
        <div className="md:col-span-3 bg-gradient-to-br from-neutral-50/80 to-white p-4 lg:p-5 rounded-2xl border border-black/[0.05] flex flex-col justify-between items-center group">
          <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] self-start mb-1 tracking-normal">
            04 · Live bank balances
          </span>
          <div className="flex-1 w-full flex items-center justify-center my-auto py-1">
            <img
              src={images[3]}
              alt="Live Balance Audit"
              className="w-full max-h-[260px] lg:max-h-[285px] object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.06)] group-hover:scale-102 transition-transform duration-200"
              loading="lazy"
            />
          </div>
          <p className="text-xs sm:text-[13px] text-[#55514d] font-medium text-center mt-1">
            Always-current verified books
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BENTO 3: CARD 6 (TEAM) — Executive 2x2 Matrix Bento                        */
/* -------------------------------------------------------------------------- */
function TeamBentoLayout({ mod }: { mod: ProductModuleCopy }) {
  const images = MODULE_ILLUSTRATIONS.team;
  const copy = MODULE_SHORT_COPY.team;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 h-full py-1">
      {/* Cell 1 (Top Left, 6 Cols): Security Overview & Role Privileges */}
      <div className="lg:col-span-6 bg-gradient-to-br from-neutral-50/80 to-white p-5 lg:p-6 rounded-2xl border border-black/[0.05] flex flex-col justify-between">
        <div>
          <div className="text-xs font-mono tracking-wider text-[#5835ea] font-semibold uppercase mb-1">
            {mod.eyebrow}
          </div>
          <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#111111] leading-tight mb-1">
            {copy.title}
          </h3>
          <p className="text-sm sm:text-[14px] text-[#55514d] leading-relaxed mb-3">
            {copy.body}
          </p>

          {/* 4 Role Privilege Badges */}
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.04] shadow-xs">
              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#eef2ff] text-[#002b8a] block w-fit mb-0.5">
                Owner
              </span>
              <span className="text-xs text-[#55514d] leading-tight">Complete ledger &amp; company access</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.04] shadow-xs">
              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#eeebff] text-[#5835ea] block w-fit mb-0.5">
                Admin
              </span>
              <span className="text-xs text-[#55514d] leading-tight">Sales, purchase &amp; inventory operations</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.04] shadow-xs">
              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#def6e7] text-[#00ac77] block w-fit mb-0.5">
                Manager
              </span>
              <span className="text-xs text-[#55514d] leading-tight">Scoped strictly to assigned godown</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-black/[0.04] shadow-xs">
              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#fff5eb] text-[#ff8000] block w-fit mb-0.5">
                Cashier
              </span>
              <span className="text-xs text-[#55514d] leading-tight">Fast POS checkout only; P&amp;L locked</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <HeroStyleButton label={mod.label.toLowerCase()} />
        </div>
      </div>

      {/* Cell 2 (Top Right, 6 Cols): Role Matrix Graphic */}
      <div className="lg:col-span-6 bg-gradient-to-br from-neutral-50/80 to-white p-4 lg:p-5 rounded-2xl border border-black/[0.05] flex flex-col justify-between items-center group">
        <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] self-start mb-1 tracking-normal">
          01 · Hierarchical role access
        </span>
        <div className="flex-1 w-full flex items-center justify-center py-1">
          <img
            src={images[0]}
            alt="Hierarchical Permissions"
            className="w-full max-w-[420px] max-h-[220px] lg:max-h-[240px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:scale-103 transition-transform duration-200"
            loading="lazy"
          />
        </div>
      </div>

      {/* Cell 3 (Bottom Left, 6 Cols): Store Geofencing */}
      <div className="lg:col-span-6 bg-gradient-to-br from-neutral-50/80 to-white px-5 py-3 rounded-2xl border border-black/[0.05] flex items-center justify-between gap-5 group hover:-translate-y-0.5 transition-transform duration-200">
        <div className="flex-1 min-w-0">
          <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] block mb-0.5">
            02 · Branch &amp; godown restrictions
          </span>
          <p className="text-sm font-medium text-[#111111] leading-snug">
            Staff access limited to their specific store
          </p>
        </div>
        <img
          src={images[1]}
          alt="Branch Geofencing"
          className="w-[190px] sm:w-[215px] lg:w-[235px] max-h-[140px] lg:max-h-[150px] object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Cell 4 (Bottom Right, 6 Cols): Audit Log & POS Lock */}
      <div className="lg:col-span-6 bg-gradient-to-br from-neutral-50/80 to-white px-5 py-3 rounded-2xl border border-black/[0.05] flex items-center justify-between gap-5 group hover:-translate-y-0.5 transition-transform duration-200">
        <div className="flex-1 min-w-0">
          <span className="text-xs sm:text-[13px] font-semibold text-[#5835ea] block mb-0.5">
            03 · Activity log &amp; terminal lock
          </span>
          <p className="text-sm font-medium text-[#111111] leading-snug">
            Immutable timestamps and register locks
          </p>
        </div>
        <img
          src={images[2]}
          alt="Activity Log"
          className="w-[190px] sm:w-[215px] lg:w-[235px] max-h-[140px] lg:max-h-[150px] object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DISPATCHER: ALTERNATING BETWEEN STYLE A & BENTO WITH IMAGES                */
/* -------------------------------------------------------------------------- */
function ModuleCardContent({ mod }: { mod: ProductModuleCopy }) {
  switch (mod.id) {
    // Card 1: Style A (Invoicing Panoramic 4-col)
    case "invoicing":
      return (
        <PanoramicCardLayout
          mod={mod}
          tags={[
            "01 · Auto-fill details",
            "02 · Tax breakdown",
            "03 · Recurring billing",
            "04 · Payment tracking",
          ]}
        />
      );

    // Card 2: Bento 1 (Inventory & POS 7/5 Asymmetric Hero Bento)
    case "inventory":
      return <InventoryBentoLayout mod={mod} />;

    // Card 3: Style A (Purchases Panoramic 4-col)
    case "purchases":
      return (
        <PanoramicCardLayout
          mod={mod}
          tags={[
            "01 · PO to bill 1-click",
            "02 · Vendor ledgers",
            "03 · Godown intake",
            "04 · Routine bills",
          ]}
        />
      );

    // Card 4: Bento 2 (Banking 5/4/3 3-Column Asymmetric Canvas)
    case "banking":
      return <BankingBentoLayout mod={mod} />;

    // Card 5: Style A (Reports & AI Panoramic 4-col with Sparkles)
    case "reports":
      return (
        <PanoramicCardLayout
          mod={mod}
          hasSparkles={true}
          tags={[
            "01 · Financial registers",
            "02 · 1-click exports",
            "03 · AI query assistant",
            "04 · Verified ledger",
          ]}
        />
      );

    // Card 6: Bento 3 (Team & Permissions 2x2 Matrix Bento)
    case "team":
      return <TeamBentoLayout mod={mod} />;

    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* MOBILE CARD VIEW: Clean, Zero Padding, Smooth Full-Bleed Swipe Gallery     */
/* -------------------------------------------------------------------------- */
function MobileModuleCard({ mod, index }: { mod: ProductModuleCopy; index: number }) {
  const images = MODULE_ILLUSTRATIONS[mod.id] || [];
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const copy = MODULE_SHORT_COPY[mod.id] || { title: mod.title, body: mod.body };

  const handleSlideScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const slideWidth = el.scrollWidth / images.length;
    const current = Math.round(el.scrollLeft / slideWidth);
    if (current !== activeSlide && current >= 0 && current < images.length) {
      setActiveSlide(current);
    }
  };

  const scrollToSlide = (idx: number) => {
    if (!scrollRef.current) return;
    const slideWidth = scrollRef.current.scrollWidth / images.length;
    scrollRef.current.scrollTo({
      left: idx * slideWidth,
      behavior: "smooth",
    });
    setActiveSlide(idx);
  };

  return (
    <div
      id={`card-mobile-${index}`}
      className="scroll-stack-card relative w-full p-0 rounded-[18px] box-border scroll-mt-36 overflow-hidden bg-white border border-black/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_16px_40px_-8px_rgba(0,18,60,0.08)]"
    >
      {/* Mobile Card Header with Hero-style Button */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-mono tracking-wider text-[#5835ea] font-semibold uppercase">
            {mod.eyebrow}
          </span>
          <span className="text-xs font-mono font-bold text-[#807b76]">
            0{index + 1} / 06
          </span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-1.5 leading-snug">
          {copy.title}
        </h3>
        <p className="text-sm text-[#55514d] leading-relaxed">
          {copy.body}
        </p>
      </div>

      {/* Clean Full-Bleed Horizontal Swipe Gallery */}
      <div
        ref={scrollRef}
        onScroll={handleSlideScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-3 scrollbar-none"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-[82vw] max-w-[320px] shrink-0 snap-center flex items-center justify-center p-2 rounded-xl bg-neutral-50/70 border border-black/[0.04]"
          >
            <img
              src={img}
              alt=""
              className="w-full max-h-[190px] object-contain drop-shadow-xs"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Mobile Card Footer */}
      <div className="px-4 pb-4 pt-2.5 flex items-center justify-between border-t border-black/[0.04] bg-neutral-50/30">
        <div className="flex items-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all cursor-pointer",
                activeSlide === idx ? "w-5 bg-[#5835ea]" : "bg-[#d4d4d8]"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <HeroStyleButton label={mod.label.toLowerCase()} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PRODUCT SCROLL STACK SECTION COMPONENT                                */
/* -------------------------------------------------------------------------- */
export function ProductScrollStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollStackRef = useRef<ScrollStackRef>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // When activeIndex updates, horizontally scroll the active tab button into view inside the tab strip
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    const activeButton = tabsContainerRef.current.querySelector(
      `button[data-index="${activeIndex}"]`
    ) as HTMLElement | null;

    if (activeButton) {
      const ctr = tabsContainerRef.current;
      if (ctr) {
        const targetLeft =
          activeButton.offsetLeft - ctr.offsetWidth / 2 + activeButton.offsetWidth / 2;
        ctr.scrollLeft = Math.max(0, targetLeft);
      }
    }
  }, [activeIndex]);

  // Mobile: observe which card is in view to update active tab
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    const observers: IntersectionObserver[] = [];
    PRODUCT_SECTION_COPY.modules.forEach((_, index) => {
      const el = document.getElementById(`card-mobile-${index}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { rootMargin: "-25% 0px -55% 0px", threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const el = document.getElementById(`card-mobile-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    } else {
      scrollStackRef.current?.scrollToIndex(index);
    }
  };

  return (
    <section id="product" className="product-section relative mb-0 md:-mb-[460px]">
      {/* Sticky Tab Nav for the Scroll Stack */}
      <div className="product-nav-sticky sticky top-[66px] sm:top-[76px] z-30 bg-white/95 backdrop-blur-md border-y border-[#e6e4e2] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-[top] duration-200">
        <div className="container max-w-[1280px]">
          <div
            ref={tabsContainerRef}
            role="tablist"
            aria-label="Product features"
            className="feature-tabs py-2.5 overflow-x-auto scrollbar-none flex items-center gap-1.5 sm:gap-2"
          >
            {PRODUCT_SECTION_COPY.modules.map((mod, index) => {
              const Icon = MODULE_ICONS[mod.id] || FileText;
              const isActive = activeIndex === index;
              return (
                <button
                  key={mod.id}
                  data-index={index}
                  role="tab"
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer",
                    isActive
                      ? "active bg-[--purple] text-white border border-transparent shadow-none"
                      : "text-[#615d59] hover:text-[#111111] hover:bg-[#f3f3f2] border border-transparent"
                  )}
                  aria-selected={isActive}
                >
                  <Icon
                    size={14}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-white" : "text-[#807b76]"
                    )}
                  />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE: Zero-padding Cards laid out sequentially */}
      <div className="container md:hidden pt-4 pb-16 flex flex-col gap-10 sm:gap-12">
        {PRODUCT_SECTION_COPY.modules.map((mod, index) => (
          <MobileModuleCard key={mod.id} mod={mod} index={index} />
        ))}
      </div>

      {/* DESKTOP: Interactive sticky scroll stack with IDENTICAL heights and unified exit */}
      <div className="container relative max-w-[1280px] product-scroll-desktop hidden md:block">
        <ScrollStack
          ref={scrollStackRef}
          useWindowScroll={true}
          stackPosition="128px"
          itemStackDistance={5}
          itemDistance={170}
          entryScale={1.03}
          behindScaleStep={0.03}
          approachDistance={260}
          endPadding="680px"
          onActiveIndexChange={setActiveIndex}
          className="product-scroll-stack"
        >
          {PRODUCT_SECTION_COPY.modules.map((mod) => (
            <ScrollStackItem
              key={mod.id}
              id={`card-${mod.id}`}
              itemClassName="h-[580px] lg:h-[600px] p-6 sm:p-8 md:p-8 lg:p-9"
            >
              <ModuleCardContent mod={mod} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

export default ProductScrollStack;
