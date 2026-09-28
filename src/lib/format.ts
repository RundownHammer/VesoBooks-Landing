/**
 * Formatting helpers for currency, numbers, dates, and invoice status styling.
 * Used across the dashboard, invoices, and chat features.
 */

export type InvoiceStatus =
  | "PENDING"
  | "PAID"
  | "OVERDUE"
  | "PARTIAL"
  | "CANCELLED";

export const CHART_COLORS = [
  "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", 
  "#ec4899", "#14b8a6", "#f97316", "#a855f7",
];

// Canonical Semantic Status Colors (standardized from Design System)
export const STATUS_HEX = {
  PAID: "#22c55e",      // Green (Paid / Success / Positive / Healthy)
  PENDING: "#eab308",   // Yellow (Pending / Warning / Low Stock)
  OVERDUE: "#ef4444",   // Red (Overdue / Critical / Out of Stock / Destructive)
  PARTIAL: "#2176ff",   // Blue (Partial / Info)
  CANCELLED: "#b1b1b8", // Gray (Cancelled / Neutral / Muted)
} as const;

export const OVERDUE_COLOR = STATUS_HEX.OVERDUE;

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric", month: "short", day: "numeric",
});

const DATE_LONG_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric", month: "long", day: "numeric",
});

const DATETIME_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric", month: "short", day: "numeric",
  hour: "numeric", minute: "2-digit",
});

/** Maps a currency code to its standard locale for proper comma/decimal formatting */
function getLocaleForCurrency(currency: string): string {
  switch (currency.toUpperCase()) {
    case "INR": return "en-IN"; // Lakhs/Crores formatting (1,00,000.00)
    case "EUR": return "de-DE"; // European formatting (1.000,00)
    case "GBP": return "en-GB";
    case "JPY": return "ja-JP";
    case "AUD": return "en-AU";
    case "CAD": return "en-CA";
    case "CHF": return "de-CH";
    case "CNY": return "zh-CN";
    case "SGD": return "en-SG";
    case "AED": return "ar-AE";
    default: return "en-US"; // Standard US/Global formatting (1,000.00)
  }
}

/** Extracts just the symbol (e.g., "€", "₹") for use in UI labels */
export function getCurrencySymbol(currency: string): string {
  try {
    const parts = new Intl.NumberFormat(getLocaleForCurrency(currency), {
      style: "currency",
      currency,
    }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value || currency;
  } catch {
    return currency;
  }
}

/** Format a number as currency using the correct regional locale */
export function formatCurrency(value: number, currency = "INR"): string {
  const n = Number.isFinite(value) ? value : 0;
  const locale = getLocaleForCurrency(currency);
  
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

/** Format a number in compact notation (e.g. 1.2K or 1,2 M) */
export function formatCompact(value: number, currency = "INR"): string {
  if (!isFinite(value)) return "—";
  const locale = getLocaleForCurrency(currency);
  
  try {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      style: "currency",
      currency,
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return `${value}`;
  }
}

/** Format a plain number with the correct thousands separators */
export function formatNumber(value: number, currency = "INR"): string {
  if (!isFinite(value)) return "—";
  const locale = getLocaleForCurrency(currency);
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(date: string | Date | null | undefined, format: "short" | "long" = "short"): string {
  if (date === null || date === undefined) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return typeof date === "string" ? date : "—";
  return (format === "long" ? DATE_LONG_FMT : DATE_FMT).format(d);
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (date === null || date === undefined) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return typeof date === "string" ? date : "—";
  return DATETIME_FMT.format(d);
}

export function getStatusColor(status: string): string {
  switch (status?.toUpperCase()) {
    case "PAID": return "border-[#bbf7d0] text-[#22c55e] bg-[#def6e7] dark:border-[#22c55e]/30 dark:text-[#22c55e] dark:bg-[#22c55e]/15";
    case "PENDING": return "border-[#fef08a] text-[#eab308] bg-[#fef9c3] dark:border-[#eab308]/30 dark:text-[#eab308] dark:bg-[#eab308]/15";
    case "OVERDUE": return "border-[#fecaca] text-[#ef4444] bg-[#fde3e3] dark:border-[#ef4444]/30 dark:text-[#ef4444] dark:bg-[#ef4444]/15";
    case "PARTIAL": return "border-[#bfdbfe] text-[#2176ff] bg-[#deebff] dark:border-[#2176ff]/30 dark:text-[#2176ff] dark:bg-[#2176ff]/15";
    case "CANCELLED": return "border-[#e4e4e7] text-[#b1b1b8] bg-[#f1f1f2] dark:border-[#b1b1b8]/30 dark:text-[#b1b1b8] dark:bg-[#b1b1b8]/15";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

export function getInvoiceTypeColor(direction?: string): string {
  switch (direction?.toUpperCase()) {
    case "PURCHASE": return "border-[#bfdbfe] text-[#2176ff] bg-[#deebff] dark:border-[#2176ff]/30 dark:text-[#2176ff] dark:bg-[#2176ff]/15";
    case "SALE":
    default: return "border-[#bbf7d0] text-[#22c55e] bg-[#def6e7] dark:border-[#22c55e]/30 dark:text-[#22c55e] dark:bg-[#22c55e]/15";
  }
}

export function isOverdue(dueDate: string | Date | null | undefined, status: string): boolean {
  if (!dueDate) return status === "OVERDUE";
  if (status === "PAID" || status === "CANCELLED") return false;
  if (status === "OVERDUE") return true;
  const d = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function looksLikeCurrency(column: string): boolean {
  const lower = column.toLowerCase();
  return (
    lower.includes("amount") || lower.includes("total") || lower.includes("spend") || 
    lower.includes("spending") || lower.includes("price") || lower.includes("forecast") || 
    lower.includes("outstanding") || lower.includes("balance") || lower.includes("cost")
  );
}

export function looksLikeDate(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /^\d{4}-\d{2}-\d{2}([T\s]\d{2}:\d{2})?/.test(value);
}