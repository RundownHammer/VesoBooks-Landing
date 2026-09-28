/**
 * Single source of truth for VesoBooks pricing tiers, limits,
 * detailed feature comparison matrix, and billing FAQs.
 *
 * Used across:
 *   - Landing page (/ & #pricing)
 *   - Marketing Pricing page (/pricing)
 *   - Onboarding Wizard (/onboarding)
 *   - In-app Settings > Billing (/app/settings/billing)
 */

export type PlanTierId = "free" | "pro" | "business" | "enterprise";
export type BillingCycle = "MONTHLY" | "YEARLY";

export interface PricingTier {
  id: PlanTierId;
  name: string;
  audience: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  badge?: string;
  seats: string;
  maxSeats: number;
  desc: string;
  features: readonly string[];
  cta: {
    label: string;
    href: string;
  };
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "free",
    name: "Free",
    audience: "Solo shopkeepers and single-counter stores",
    monthlyPrice: 0,
    annualPrice: 0,
    badge: "Free forever",
    seats: "1 seat, 1 warehouse",
    maxSeats: 1,
    desc: "Single-user workspace. POS register & thermal printing.",
    cta: {
      label: "Start free",
      href: "/sign-up",
    },
    features: [
      "1 staff seat",
      "50 invoices per month",
      "POS counter register",
      "Thermal slip printing (58mm/80mm)",
      "GST-compliant tax invoicing",
      "Basic product & vendor catalog",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    audience: "Growing retail shops and distributors",
    monthlyPrice: 999,
    annualPrice: 9990,
    popular: true,
    badge: "Most popular",
    seats: "5 seats, 3 warehouses",
    maxSeats: 5,
    desc: "AI billing assistant, custom PDF templates, and full reports.",
    cta: {
      label: "Choose Pro",
      href: "/sign-up",
    },
    features: [
      "5 staff seats (multi-counter)",
      "3 warehouses & godowns",
      "Unlimited monthly invoices",
      "AI assistant chat (Gemma 4)",
      "Credit notes & sales returns",
      "GST-compliant PDF exports",
      "P&L, stock & sales analytics",
      "Custom invoice branding & logo",
    ],
  },
  {
    id: "business",
    name: "Business",
    audience: "Multi-branch distribution networks",
    monthlyPrice: 2499,
    annualPrice: 24990,
    seats: "20 seats, 10 warehouses",
    maxSeats: 20,
    desc: "Custom roles, 21 permissions, bookkeeping exports & priority sync.",
    cta: {
      label: "Choose Business",
      href: "/sign-up",
    },
    features: [
      "20 staff seats",
      "10 warehouses & godowns",
      "Custom roles & 21 permissions",
      "Tally / Excel bookkeeping exports",
      "Inter-warehouse gate passes",
      "Stock reconciliation & adjustments",
      "Priority WhatsApp & phone support",
      "Priority cloud sync",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Large wholesalers and multi-city operations",
    monthlyPrice: 4999,
    annualPrice: 49990,
    seats: "Unlimited seats & warehouses",
    maxSeats: 50,
    desc: "Dedicated account manager, custom API access and priority support.",
    cta: {
      label: "Contact sales",
      href: "mailto:hello@vesobooks.in?subject=Enterprise%20enquiry",
    },
    features: [
      "Unlimited staff seats",
      "Unlimited warehouses & godowns",
      "Developer REST API access",
      "Dedicated account manager",
      "Custom SLA & onboarding",
      "Audit logging & role hierarchy",
      "24/7 priority phone support",
      "Custom integrations & data migration",
    ],
  },
] as const;

export interface ComparisonFeatureItem {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export interface ComparisonCategory {
  category: string;
  features: ComparisonFeatureItem[];
}

export const COMPARISON_MATRIX: ComparisonCategory[] = [
  {
    category: "Team & Infrastructure",
    features: [
      { name: "Staff user accounts", free: "1", pro: "5", business: "20", enterprise: "Unlimited" },
      { name: "POS counter registers", free: "1", pro: "3", business: "10", enterprise: "Unlimited" },
      { name: "Warehouses & godowns", free: "1", pro: "3", business: "10", enterprise: "Unlimited" },
      { name: "Custom roles & permissions", free: false, pro: false, business: "21 permissions", enterprise: "Custom RBAC" },
      { name: "Activity & audit logs", free: "Basic", pro: "Standard", business: "Full audit trail", enterprise: "Dedicated audit" },
    ],
  },
  {
    category: "Billing & Invoicing",
    features: [
      { name: "Monthly invoices", free: "50", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "GST-compliant tax invoicing", free: true, pro: true, business: true, enterprise: true },
      { name: "POS counter register & quick sale", free: true, pro: true, business: true, enterprise: true },
      { name: "Thermal slip printing (58mm/80mm)", free: true, pro: true, business: true, enterprise: true },
      { name: "Estimates & quotations", free: true, pro: true, business: true, enterprise: true },
      { name: "Credit notes & sales returns", free: false, pro: true, business: true, enterprise: true },
      { name: "Recurring invoices & auto-billing", free: false, pro: true, business: true, enterprise: true },
      { name: "Custom invoice logo & branding", free: false, pro: true, business: true, enterprise: true },
    ],
  },
  {
    category: "Inventory & Multi-Warehouse",
    features: [
      { name: "Product catalog size", free: "100", pro: "5,000", business: "20,000", enterprise: "Unlimited" },
      { name: "Real-time stock alerts", free: true, pro: true, business: true, enterprise: true },
      { name: "Inter-warehouse stock transfers", free: false, pro: true, business: true, enterprise: true },
      { name: "Gate passes & stock reconciliation", free: false, pro: false, business: true, enterprise: true },
      { name: "Batch & barcode tracking", free: false, pro: true, business: true, enterprise: true },
    ],
  },
  {
    category: "AI & Business Analytics",
    features: [
      { name: "AI billing assistant (Gemma 4)", free: false, pro: true, business: true, enterprise: true },
      { name: "Natural language query over store data", free: false, pro: true, business: true, enterprise: true },
      { name: "Profit & Loss (P&L) statements", free: false, pro: true, business: true, enterprise: true },
      { name: "Cash flow forecasting", free: false, pro: true, business: true, enterprise: true },
      { name: "Tally / Excel bookkeeping exports", free: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    category: "Support & Service",
    features: [
      { name: "Community & email support", free: true, pro: true, business: true, enterprise: true },
      { name: "Priority WhatsApp & phone support", free: false, pro: true, business: true, enterprise: true },
      { name: "Dedicated account manager", free: false, pro: false, business: false, enterprise: true },
      { name: "Custom SLA & assisted onboarding", free: false, pro: false, business: false, enterprise: true },
    ],
  },
];

export const PRICING_FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade, downgrade, or switch billing frequency at any time from Settings > Billing. Upgrades apply immediately with pro-rated billing, and downgrades take effect at the end of the current billing period so you never lose what you paid for.",
  },
  {
    q: "Is there a free trial for Pro and Business?",
    a: "The Free plan is completely free forever with no credit card required. You can experience the full counter POS register, inventory, and GST invoicing before deciding to upgrade when your team grows.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (Google Pay, PhonePe, Paytm, BHIM), net banking across 50+ Indian banks, and all major RuPay, Visa, and Mastercard credit/debit cards processed securely via Razorpay.",
  },
  {
    q: "Do your prices include GST?",
    a: "Prices shown are in Indian Rupees (INR) exclusive of 18% GST. You can provide your GSTIN at checkout or in Settings to claim full Input Tax Credit (ITC) with automatic GST invoicing.",
  },
  {
    q: "Can I use VesoBooks on multiple counter computers?",
    a: "Yes. VesoBooks runs in any modern browser on PC, Mac, tablets, and POS touchscreens. Pro and Business plans include multi-seat permissions so your cashiers, store manager, and accountant can work concurrently without conflicts.",
  },
  {
    q: "What happens to my historical data if I downgrade?",
    a: "Your data is permanently safe and never deleted. If you downgrade to Free, historical invoices, ledgers, and inventory reports remain fully accessible for your accounting records.",
  },
];

export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
