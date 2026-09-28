"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Minus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSubscriptionCurrent } from "@/hooks/use-subscription-current";
import { PricingTiers } from "./pricing-tiers";
import {
  PRICING_TIERS,
  COMPARISON_MATRIX,
  PRICING_FAQS,
  formatINR,
} from "@/lib/pricing-data";
import { Button } from "@/components/ui/button";

export function PricingContent() {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");

  const { data: current } = useSubscriptionCurrent();

  return (
    <div className="bg-white text-zinc-950 font-sans">
      {/* 1. Header & Switcher */}
      <section className="border-b border-zinc-200 bg-canvas/60 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Plans &amp; Pricing
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
            Simple, honest pricing for Indian business
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Every plan includes full GST compliance and our keyboard-first POS counter.
            No credit card needed to get started.
          </p>

          {/* Billing Switcher Pill */}
          <div className="mt-8 flex justify-center">
            <div
              role="radiogroup"
              aria-label="Billing cycle"
              className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1.5 shadow-xs"
            >
              <button
                type="button"
                role="radio"
                aria-checked={cycle === "monthly"}
                onClick={() => setCycle("monthly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all cursor-pointer",
                  cycle === "monthly"
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950"
                )}
              >
                Monthly billing
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={cycle === "annual"}
                onClick={() => setCycle("annual")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all cursor-pointer",
                  cycle === "annual"
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950"
                )}
              >
                <span>Yearly billing</span>
                <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-bold text-navy">
                  2 months free
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tier Cards */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <PricingTiers
            mode="marketing"
            cycle={cycle}
            activePlanId={current?.plan}
            showCompareLink={true}
            compareHref="#compare"
          />
        </div>
      </section>

      {/* 3. Detailed Comparison Matrix (#compare) */}
      <section id="compare" className="border-t border-zinc-200 bg-zinc-50/60 py-20 md:py-24 scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand">
              Compare
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Compare all features
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              The full breakdown of what is included in every VesoBooks plan.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse min-w-[760px]">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-zinc-500 w-2/5">
                    Feature &amp; Capability
                  </th>
                  {PRICING_TIERS.map((t) => (
                    <th
                      key={t.id}
                      className={cn(
                        "p-4 sm:p-5 text-center text-xs font-bold uppercase tracking-wider w-[15%]",
                        t.id === "pro" ? "text-brand bg-brand-soft/30" : "text-zinc-700"
                      )}
                    >
                      <div className="font-bold text-sm text-zinc-950">{t.name}</div>
                      <div className="font-normal text-xs text-zinc-500 lowercase">
                        {t.monthlyPrice === 0 ? "free" : `${formatINR(t.monthlyPrice)}/mo`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Categories */}
              <tbody className="divide-y divide-zinc-100">
                {COMPARISON_MATRIX.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <tr className="bg-zinc-100/70">
                      <td
                        colSpan={5}
                        className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-900"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((feat, featIdx) => (
                      <tr key={featIdx} className="hover:bg-zinc-50/70 transition-colors">
                        <td className="p-4 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-medium text-zinc-900">
                          {feat.name}
                        </td>
                        {(["free", "pro", "business", "enterprise"] as const).map((tierKey) => {
                          const val = feat[tierKey];
                          const isProCol = tierKey === "pro";

                          return (
                            <td
                              key={tierKey}
                              className={cn(
                                "p-4 sm:px-5 sm:py-3.5 text-center text-xs sm:text-sm",
                                isProCol && "bg-brand-soft/10 font-semibold"
                              )}
                            >
                              {val === true ? (
                                <Check
                                  size={18}
                                  weight="bold"
                                  className="text-status-success inline-block"
                                />
                              ) : val === false ? (
                                <Minus
                                  size={16}
                                  weight="bold"
                                  className="text-zinc-300 inline-block"
                                />
                              ) : (
                                <span className={cn("text-zinc-800", isProCol && "text-brand")}>
                                  {val}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Billing FAQs Accordion */}
      <section className="border-t border-zinc-200 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Billing and subscription details
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Everything you need to know about purchasing, upgrading, and canceling VesoBooks.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {PRICING_FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-zinc-200/90 bg-white px-5 sm:px-6 py-1 shadow-xs transition-all data-[state=open]:border-brand/40 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-zinc-950 hover:text-brand hover:no-underline py-4 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-600 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-600">
              Have a specific requirement or question about our enterprise plan?{" "}
              <a
                href="mailto:hello@vesobooks.in?subject=Enterprise%20custom%20plan"
                className="font-semibold text-brand hover:underline"
              >
                Talk with our founders &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 5. Pre-Footer CTA Banner */}
      <section className="border-t border-zinc-200 bg-zinc-50/50 py-16 md:py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Start billing in minutes with zero setup friction
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Join thousands of Indian retail stores, distributors, and wholesalers running calm, compliant businesses.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="rounded-full bg-brand hover:bg-brand-strong text-white font-semibold text-sm h-12 px-7 shadow-xs cursor-pointer"
              >
                Start free trial &rarr;
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-semibold text-sm h-12 px-6 cursor-pointer"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
