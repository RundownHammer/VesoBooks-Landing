/**
 * Preserved copywriting from "THE WHOLE BUSINESS, IN ONE PLACE" section.
 * Retained in full fidelity for marketing assets, documentation, and feature guides.
 */
export const PRODUCT_SECTION_COPY = {
  sectionId: "product",
  eyebrow: "THE WHOLE BUSINESS, IN ONE PLACE",
  headline: "Less admin. More business.",
  subheadline:
    "Every module talks to every other one, so the numbers stay accurate from the counter to the bank.",
  modules: [
    {
      id: "invoicing",
      label: "Invoicing",
      eyebrow: "INVOICING & BILLING",
      title: "Invoices that pay themselves, almost.",
      body: "Create a professional, tax-compliant invoice in under a minute, send it, and watch payments land — with reminders, part-payments and recurring billing handled automatically.",
      bullets: [
        "Auto-fills customer details, product prices and tax rates",
        "Automatic tax split calculated per line item",
        "Recurring invoices for retainers and subscriptions",
        "Cash, UPI, card, bank transfer or cheque, logged correctly",
      ],
    },
    {
      id: "inventory",
      label: "Inventory & POS",
      eyebrow: "INVENTORY & POS",
      title: "Know what you have, sell it in seconds.",
      body: "One catalog across every store and warehouse you run, plus a checkout counter fast enough for a queue.",
      bullets: [
        "Multi-location stock, down to every store and back warehouse",
        "Barcode scan checkout, held carts and split payments",
        "Offline counter mode that syncs when you're back online",
        "Low-stock alerts before you run out",
      ],
    },
    {
      id: "purchases",
      label: "Purchases",
      eyebrow: "PURCHASES & VENDORS",
      title: "Never lose track of what you ordered — or owe.",
      body: "From purchase order to vendor bill to payment, with stock updating itself the moment goods arrive.",
      bullets: [
        "Issue purchase orders and convert them to bills in one click",
        "Vendor profiles with running payable balances",
        "Stock increases in the right warehouse when a bill is recorded",
        "Recurring bills for rent and routine expenses",
      ],
    },
    {
      id: "banking",
      label: "Banking",
      eyebrow: "BANKING & RECONCILIATION",
      title: "Match your books to your bank, without the spreadsheet.",
      body: "Import your bank statement and let Veso Books find the invoices and bills that match.",
      bullets: [
        "Auto-match incoming payments to open invoices by amount",
        "Turn unmatched debits into expense records in one click",
        "Bulk payment collection for multi-invoice settlements",
        "Always-current balances you can trust",
      ],
    },
    {
      id: "reports",
      label: "Reports & AI",
      eyebrow: "REPORTS & AI INSIGHTS",
      title: "Ten reports you'd normally pay an accountant to build.",
      body: "Profit & loss, tax registers, customer aging, vendor exposure, inventory valuation and more — always current, always exportable.",
      bullets: [
        "Profit & Loss, Sales, Tax, Aging and Inventory Valuation",
        "One-click audit-ready CSV and Excel exports",
        "Ask the AI assistant plain-English questions about your data",
        "Answers come from live numbers — never guesses",
      ],
    },
    {
      id: "team",
      label: "Team",
      eyebrow: "TEAM & PERMISSIONS",
      title: "Bring your whole team in, safely.",
      body: "Every teammate gets exactly the access their job needs — nothing more.",
      bullets: [
        "Four role levels: Owner, Admin, Manager and Employee",
        "Scope any user to a specific store or warehouse",
        "Full activity log — see exactly who did what, when",
        "Give your cashier POS access, not your P&L",
      ],
    },
  ],
} as const;

export type ProductModuleCopy = (typeof PRODUCT_SECTION_COPY.modules)[number];
