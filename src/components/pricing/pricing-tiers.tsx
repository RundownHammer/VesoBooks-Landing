"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { PRICING_TIERS, type PlanTierId, formatINR } from "@/lib/pricing-data";
import { Button } from "@/components/ui/button";

export interface PricingTiersProps {
  mode?: "marketing" | "onboarding";
  cycle?: "monthly" | "annual";
  selectedPlan?: PlanTierId;
  onSelectPlan?: (planId: PlanTierId) => void;
  activePlanId?: string | null;
  showCompareLink?: boolean;
  compareHref?: string;
  className?: string;
}

export function PricingTiers({
  mode = "marketing",
  cycle = "monthly",
  selectedPlan,
  onSelectPlan,
  activePlanId,
  showCompareLink = false,
  compareHref = "#compare",
  className,
}: PricingTiersProps) {
  const isAnnual = cycle === "annual";

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {PRICING_TIERS.map((tier) => {
          const isPro = tier.id === "pro";
          const isSelected = selectedPlan === tier.id;
          const isActive = activePlanId?.toLowerCase() === tier.id;

          const displayPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;
          const monthlyEquivalent = isAnnual && tier.annualPrice > 0 ? Math.round(tier.annualPrice / 12) : tier.monthlyPrice;

          return (
            <div
              key={tier.id}
              onClick={() => {
                if (mode === "onboarding" && onSelectPlan) {
                  onSelectPlan(tier.id);
                }
              }}
              className={cn(
                "relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-white p-6 sm:p-7 transition-all duration-200",
                mode === "onboarding" && "cursor-pointer hover:-translate-y-0.5",
                // Active/Selected state
                isSelected
                  ? "border-brand ring-2 ring-brand/30 shadow-lg"
                  : isPro
                  ? "border-brand/70 shadow-md shadow-brand/5 ring-1 ring-brand/20"
                  : "border-zinc-200/90 shadow-xs hover:border-zinc-300"
              )}
            >
              {/* Top Badge */}
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1 text-xs font-semibold text-white shadow-xs tracking-wide">
                    Most popular
                  </span>
                </div>
              )}

              {mode === "onboarding" && isSelected && !isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-0.5 text-xs font-semibold text-white shadow-xs">
                    Selected
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-snug min-h-[32px]">
                      {tier.audience}
                    </p>
                  </div>
                  {isActive && (
                    <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand shrink-0">
                      Active
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-zinc-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
                      {formatINR(isAnnual && tier.monthlyPrice > 0 ? monthlyEquivalent : displayPrice)}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {tier.monthlyPrice === 0 ? "forever" : "/ mo"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    {tier.monthlyPrice === 0
                      ? "Free for solo shopkeepers"
                      : isAnnual
                      ? `Billed ₹${tier.annualPrice.toLocaleString("en-IN")} annually (2 mos free)`
                      : "Billed monthly"}
                  </p>
                </div>

                {/* Seats & Godowns highlight */}
                <div className="py-3.5 border-b border-zinc-100">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 bg-zinc-100/80 px-2.5 py-1 rounded-lg">
                    {tier.seats}
                  </span>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                {/* Features list */}
                <div className="mt-4 space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          size={15}
                          weight="bold"
                          className="text-status-success mt-0.5 shrink-0"
                        />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-zinc-100">
                {mode === "onboarding" ? (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectPlan) onSelectPlan(tier.id);
                    }}
                    className={cn(
                      "w-full rounded-full font-semibold text-sm h-11 transition-all cursor-pointer",
                      isSelected || isPro
                        ? "bg-mint hover:bg-mint-strong text-navy shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                    )}
                  >
                    {isSelected ? "Selected ✓" : `Choose ${tier.name}`}
                  </Button>
                ) : (
                  <Link
                    href={
                      tier.id === "enterprise"
                        ? tier.cta.href
                        : `/sign-up?plan=${tier.id}&cycle=${cycle}`
                    }
                    className="block w-full"
                  >
                    <Button
                      type="button"
                      className={cn(
                        "w-full rounded-full font-semibold text-sm h-11 transition-all cursor-pointer",
                        isPro
                          ? "bg-mint hover:bg-mint-strong text-navy shadow-xs"
                          : "bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs"
                      )}
                    >
                      {isActive ? "Manage in Settings" : tier.cta.label}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Compare Link */}
      {showCompareLink && (
        <div className="mt-10 text-center">
          <Link
            href={compareHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong transition-colors group cursor-pointer"
          >
            <span>Compare all features in detail</span>
            <ArrowDown
              size={16}
              weight="bold"
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
