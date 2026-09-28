import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { ProductScrollStack } from "@/components/landing/product-scroll-stack";
import { ProblemSection } from "@/components/landing/problem-section";
import { IncludedSection } from "@/components/landing/included-section";
import { AiSection } from "@/components/landing/ai-section";
import { ComplianceSection } from "@/components/landing/compliance-section";
import { SecuritySection } from "@/components/landing/security-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "VesoBooks · GST Invoicing, POS & Inventory for Indian Businesses",
  description:
    "GST-compliant invoicing, keyboard-first counter POS, and store-vs-godown inventory in one calm, fast workspace. Built for Indian retail and distribution.",
  keywords: [
    "GST invoicing",
    "POS billing India",
    "inventory management",
    "e-invoicing IRN",
    "e-way bill",
    "godown management",
    "VesoBooks",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "VesoBooks · GST Invoicing, POS & Inventory",
    description:
      "GST-compliant invoicing, keyboard-first counter POS, and store-vs-godown inventory in one calm, fast workspace.",
    siteName: "VesoBooks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VesoBooks · GST Invoicing, POS & Inventory",
    description:
      "GST-compliant invoicing, keyboard-first counter POS, and store-vs-godown inventory in one calm, fast workspace.",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductScrollStack />
      <ProblemSection />
      <AiSection />
      <ComplianceSection />
      <SecuritySection />
      <ComparisonSection />
      <IncludedSection />
      <PricingSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
